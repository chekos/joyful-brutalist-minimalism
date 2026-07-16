import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import {
  createTasteRun,
  loadTasteDefinition,
  renderTasteReport,
  validateCompletedTasteRun,
  validateTasteDefinition,
  validateTasteEvidence
} from "../scripts/taste-eval.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const cli = join(root, "scripts/taste-eval.mjs");
const definition = await loadTasteDefinition(root);

function completeRun(label = "Generator A") {
  const run = createTasteRun(definition, {
    label,
    generator: "fixture/model-v1",
    generatedAt: new Date("2026-07-15T20:00:00.000Z")
  });
  const dimensionIds = definition.rubric.dimensions.map((dimension) => dimension.id);
  const motifIds = definition.rubric.motifs.map((motif) => motif.id);

  run.outputs.forEach((output, index) => {
    output.artifact = `artifacts/${output.briefId}/index.html`;
    output.screenshots.desktop = `artifacts/${output.briefId}/desktop.png`;
    output.screenshots.mobile = `artifacts/${output.briefId}/mobile.png`;
    output.motifs = [motifIds[index % motifIds.length]];
    output.reviews = [
      {
        reviewer: "reviewer-a",
        scores: Object.fromEntries(dimensionIds.map((id) => [id, 4])),
        smells:
          index === 0
            ? [
                {
                  id: "motif-without-job",
                  evidence: "The numbered marks imply an order the brief does not contain."
                }
              ]
            : [],
        evidence: "Every score was checked against the supplied brief and rendered artifact.",
        notes: null
      }
    ];
  });

  return run;
}

async function writeEvidence(runPath, run) {
  for (const output of run.outputs) {
    for (const relativePath of [
      output.artifact,
      output.screenshots.desktop,
      output.screenshots.mobile
    ]) {
      const path = join(dirname(runPath), relativePath);
      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, relativePath.endsWith(".html") ? "<!doctype html>\n" : "png");
    }
  }
}

test("the checked-in taste evaluation definition is complete and coherent", () => {
  assert.deepEqual(validateTasteDefinition(definition), []);
  assert.equal(definition.briefs.briefs.length, 10);
  assert.equal(new Set(definition.briefs.briefs.map((brief) => brief.relationship)).size, 10);
});

test("run initialization covers every brief without pretending the work is complete", () => {
  const run = createTasteRun(definition, {
    label: "Sol baseline",
    generator: "vendor/model/version",
    generatedAt: new Date("2026-07-15T19:30:00.000Z")
  });

  assert.equal(run.run.id, "20260715T193000Z-sol-baseline");
  assert.deepEqual(
    run.outputs.map((output) => output.briefId),
    definition.briefs.briefs.map((brief) => brief.id)
  );
  assert.ok(run.outputs.every((output) => output.artifact === null && output.reviews.length === 0));
  assert.ok(validateCompletedTasteRun(run, definition).length > 0);
});

test("completed runs validate and produce an equal-brief-weight report", () => {
  const run = completeRun();
  assert.deepEqual(validateCompletedTasteRun(run, definition), []);

  const report = renderTasteReport([run], definition);
  assert.match(report, /Content fit \| 4\.00/);
  assert.match(report, /Motif without a job \| 1 \/ 10/);
  assert.match(report, /Dominant display hero \| 1 \/ 10/);
  assert.match(report, /Each brief has equal weight/);
});

test("run validation rejects partial coverage, unknown motifs, and invalid scores", () => {
  const run = completeRun();
  run.outputs.pop();
  run.outputs[0].motifs.push("unknown-motif");
  run.outputs[0].reviews[0].scores["content-fit"] = 6;
  run.outputs[1].artifact = "artifacts/cli-recovery/notindex.html";

  const errors = validateCompletedTasteRun(run, definition);
  assert.ok(errors.some((error) => error.includes("missing output for brief")));
  assert.ok(errors.some((error) => error.includes("unknown motif")));
  assert.ok(errors.some((error) => error.includes("must be an integer from 1 through 5")));
  assert.ok(errors.some((error) => error.includes("ending in index.html")));
});

test("run validation rejects duplicate reviewers and unevidenced smells", () => {
  const run = completeRun();
  const review = structuredClone(run.outputs[0].reviews[0]);
  review.smells[0].evidence = "";
  run.outputs[0].reviews.push(review);

  const errors = validateCompletedTasteRun(run, definition);
  assert.ok(errors.some((error) => error.includes("duplicate reviewer")));
  assert.ok(errors.some((error) => error.includes("must include specific evidence")));
});

test("evidence validation resolves artifact paths relative to the run file", async () => {
  const directory = await mkdtemp(join(tmpdir(), "jbm-taste-eval-"));
  const runPath = join(directory, "run.json");
  const run = completeRun();

  try {
    await writeFile(runPath, `${JSON.stringify(run, null, 2)}\n`);
    assert.ok((await validateTasteEvidence(runPath, run)).length > 0);
    await writeEvidence(runPath, run);
    assert.deepEqual(await validateTasteEvidence(runPath, run), []);
    const saved = JSON.parse(await readFile(runPath, "utf8"));
    assert.equal(saved.outputs.length, 10);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("the CLI initializes a run and reports completed on-disk evidence", async () => {
  const directory = await mkdtemp(join(tmpdir(), "jbm-taste-cli-"));
  const runPath = join(directory, "run.json");

  try {
    const initialized = spawnSync(
      process.execPath,
      [
        cli,
        "init",
        "--label",
        "CLI fixture",
        "--generator",
        "fixture/model-v1",
        "--output",
        runPath
      ],
      { cwd: root, encoding: "utf8" }
    );
    assert.equal(initialized.status, 0, initialized.stderr);

    const initializedRun = JSON.parse(await readFile(runPath, "utf8"));
    assert.equal(initializedRun.outputs.length, 10);

    const completed = completeRun("CLI fixture");
    await writeFile(runPath, `${JSON.stringify(completed, null, 2)}\n`);
    await writeEvidence(runPath, completed);

    const reported = spawnSync(process.execPath, [cli, "report", runPath], {
      cwd: root,
      encoding: "utf8"
    });
    assert.equal(reported.status, 0, reported.stderr);
    assert.match(reported.stdout, /# JBM taste evaluation report/);
    assert.match(reported.stdout, /Motif without a job \| 1 \/ 10/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
