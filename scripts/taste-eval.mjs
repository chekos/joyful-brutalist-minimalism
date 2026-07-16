import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const DEFINITION_PATHS = {
  briefs: "evals/taste-v0/briefs.json",
  rubric: "evals/taste-v0/rubric.json",
  template: "evals/taste-v0/run.template.json",
  contract: "evals/taste-v0/generation-contract.md"
};

async function json(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

function duplicateValues(values) {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  return [...duplicates];
}

function nonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateStringList(value, label, errors) {
  if (!Array.isArray(value) || value.length === 0) {
    errors.push(`${label} must be a non-empty array.`);
    return;
  }

  value.forEach((item, index) => {
    if (!nonEmptyString(item)) errors.push(`${label}[${index}] must be a non-empty string.`);
  });
}

function portableEvidencePath(value) {
  if (!nonEmptyString(value) || isAbsolute(value) || value.includes("\\")) return false;
  return value.split("/").every((segment) => segment !== "" && segment !== "." && segment !== "..");
}

function escapeCell(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function exactKeys(object, expected) {
  if (!object || typeof object !== "object" || Array.isArray(object)) return false;
  return JSON.stringify(Object.keys(object).sort()) === JSON.stringify([...expected].sort());
}

export async function loadTasteDefinition(root = process.cwd()) {
  const paths = Object.fromEntries(
    Object.entries(DEFINITION_PATHS).map(([name, path]) => [name, resolve(root, path)])
  );

  return {
    briefs: await json(paths.briefs),
    rubric: await json(paths.rubric),
    template: await json(paths.template),
    contract: await readFile(paths.contract, "utf8")
  };
}

export function validateTasteDefinition(definition) {
  const errors = [];
  const { briefs, rubric, template, contract } = definition;

  if (briefs?.version !== "taste-v0") errors.push("briefs version must be taste-v0.");
  if (!nonEmptyString(briefs?.provenance)) errors.push("briefs provenance must be present.");
  if (!Array.isArray(briefs?.briefs) || briefs.briefs.length !== 10) {
    errors.push("taste-v0 must define exactly 10 briefs.");
  }

  const briefItems = Array.isArray(briefs?.briefs) ? briefs.briefs : [];
  const briefIds = briefItems.map((brief) => brief?.id);
  for (const id of duplicateValues(briefIds)) errors.push(`duplicate brief id: ${id}.`);

  for (const [index, brief] of briefItems.entries()) {
    const label = `briefs[${index}]`;
    for (const field of ["id", "title", "audience", "relationship", "goal"]) {
      if (!nonEmptyString(brief?.[field])) errors.push(`${label}.${field} must be a non-empty string.`);
    }
    if (nonEmptyString(brief?.id) && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(brief.id)) {
      errors.push(`${label}.id must use lowercase kebab-case.`);
    }
    validateStringList(brief?.requiredContent, `${label}.requiredContent`, errors);
    validateStringList(brief?.facts, `${label}.facts`, errors);
    validateStringList(brief?.requiredActions, `${label}.requiredActions`, errors);
    validateStringList(brief?.constraints, `${label}.constraints`, errors);
  }

  if (new Set(briefItems.map((brief) => brief.relationship)).size !== briefItems.length) {
    errors.push("every v0 brief must exercise a distinct content relationship.");
  }

  if (rubric?.version !== "taste-v0") errors.push("rubric version must be taste-v0.");
  const dimensions = Array.isArray(rubric?.dimensions) ? rubric.dimensions : [];
  const smells = Array.isArray(rubric?.smells) ? rubric.smells : [];
  const motifs = Array.isArray(rubric?.motifs) ? rubric.motifs : [];
  if (dimensions.length !== 7) errors.push("taste-v0 must define exactly 7 score dimensions.");
  if (smells.length !== 9) errors.push("taste-v0 must define exactly 9 smells.");
  if (motifs.length !== 11) errors.push("taste-v0 must define exactly 11 neutral motifs.");

  for (const [kind, items, fields] of [
    ["dimension", dimensions, ["id", "name", "question"]],
    ["smell", smells, ["id", "name", "description"]],
    ["motif", motifs, ["id", "name", "description"]]
  ]) {
    for (const id of duplicateValues(items.map((item) => item?.id))) {
      errors.push(`duplicate ${kind} id: ${id}.`);
    }
    items.forEach((item, index) => {
      for (const field of fields) {
        if (!nonEmptyString(item?.[field])) {
          errors.push(`${kind}s[${index}].${field} must be a non-empty string.`);
        }
      }
    });
  }

  if (rubric?.scoreScale?.minimum !== 1 || rubric?.scoreScale?.maximum !== 5) {
    errors.push("score scale must run from 1 through 5.");
  }
  if (!nonEmptyString(rubric?.scoreScale?.anchors?.["1"]) || !nonEmptyString(rubric?.scoreScale?.anchors?.["5"])) {
    errors.push("score scale must explain anchors 1 and 5.");
  }

  if (template?.schemaVersion !== 1 || template?.evalVersion !== "taste-v0") {
    errors.push("run template must use schemaVersion 1 and evalVersion taste-v0.");
  }
  for (const field of ["id", "label", "generator", "generatedAt", "notes"]) {
    if (template?.run?.[field] !== null) errors.push(`run template ${field} must start as null.`);
  }

  const templateOutputs = Array.isArray(template?.outputs) ? template.outputs : [];
  const templateIds = templateOutputs.map((output) => output?.briefId);
  if (JSON.stringify([...templateIds].sort()) !== JSON.stringify([...briefIds].sort())) {
    errors.push("run template outputs must cover every brief exactly once.");
  }
  for (const id of duplicateValues(templateIds)) errors.push(`duplicate template brief id: ${id}.`);
  templateOutputs.forEach((output, index) => {
    if (output?.artifact !== null) errors.push(`template output ${index} artifact must start as null.`);
    if (output?.screenshots?.desktop !== null || output?.screenshots?.mobile !== null) {
      errors.push(`template output ${index} screenshots must start as null.`);
    }
    if (!Array.isArray(output?.motifs) || output.motifs.length !== 0) {
      errors.push(`template output ${index} motifs must start empty.`);
    }
    if (!Array.isArray(output?.reviews) || output.reviews.length !== 0) {
      errors.push(`template output ${index} reviews must start empty.`);
    }
  });

  for (const requiredText of [
    "DESIGN.md",
    "tokens/jbm.tokens.json",
    "self-contained `index.html`",
    "Do not inspect `src/`"
  ]) {
    if (!contract.includes(requiredText)) errors.push(`generation contract must include: ${requiredText}.`);
  }

  return errors;
}

function assertValidDefinition(definition) {
  const errors = validateTasteDefinition(definition);
  if (errors.length > 0) throw new Error(errors.join("\n"));
}

function runId(label, generatedAt) {
  const time = generatedAt
    .toISOString()
    .replaceAll("-", "")
    .replaceAll(":", "")
    .replace(/\.\d{3}Z$/, "Z");
  const slug = label
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "run";
  return `${time}-${slug}`;
}

export function createTasteRun(definition, { label, generator, generatedAt = new Date() }) {
  assertValidDefinition(definition);
  if (!nonEmptyString(label)) throw new Error("run label must be a non-empty string.");
  if (!nonEmptyString(generator)) throw new Error("generator must be a non-empty string.");
  if (!(generatedAt instanceof Date) || Number.isNaN(generatedAt.getTime())) {
    throw new Error("generatedAt must be a valid Date.");
  }

  const run = structuredClone(definition.template);
  run.run.id = runId(label, generatedAt);
  run.run.label = label.trim();
  run.run.generator = generator.trim();
  run.run.generatedAt = generatedAt.toISOString();
  return run;
}

export function validateCompletedTasteRun(run, definition) {
  const errors = [];
  const dimensionIds = definition.rubric.dimensions.map((item) => item.id);
  const smellIds = new Set(definition.rubric.smells.map((item) => item.id));
  const motifIds = new Set(definition.rubric.motifs.map((item) => item.id));
  const briefIds = definition.briefs.briefs.map((item) => item.id);
  const minimum = definition.rubric.scoreScale.minimum;
  const maximum = definition.rubric.scoreScale.maximum;

  if (run?.schemaVersion !== 1 || run?.evalVersion !== "taste-v0") {
    errors.push("run must use schemaVersion 1 and evalVersion taste-v0.");
  }
  for (const field of ["id", "label", "generator", "generatedAt"]) {
    if (!nonEmptyString(run?.run?.[field])) errors.push(`run.${field} must be a non-empty string.`);
  }
  if (nonEmptyString(run?.run?.generatedAt) && Number.isNaN(Date.parse(run.run.generatedAt))) {
    errors.push("run.generatedAt must be an ISO-compatible date.");
  }
  if (run?.run?.notes !== null && run?.run?.notes !== undefined && !nonEmptyString(run.run.notes)) {
    errors.push("run.notes must be null or a non-empty string.");
  }

  const outputs = Array.isArray(run?.outputs) ? run.outputs : [];
  const outputIds = outputs.map((output) => output?.briefId);
  for (const id of duplicateValues(outputIds)) errors.push(`duplicate output brief id: ${id}.`);
  for (const id of outputIds.filter((id) => !briefIds.includes(id))) errors.push(`unknown brief id: ${id}.`);
  for (const id of briefIds.filter((id) => !outputIds.includes(id))) errors.push(`missing output for brief: ${id}.`);
  if (outputs.length !== briefIds.length) errors.push(`run must contain exactly ${briefIds.length} outputs.`);

  for (const output of outputs) {
    const label = `output ${output?.briefId ?? "<unknown>"}`;
    const artifact = output?.artifact;
    if (
      !portableEvidencePath(artifact) ||
      !(artifact === "index.html" || artifact.endsWith("/index.html"))
    ) {
      errors.push(`${label} artifact must be a portable relative path ending in index.html.`);
    }
    for (const viewport of ["desktop", "mobile"]) {
      const screenshot = output?.screenshots?.[viewport];
      if (!portableEvidencePath(screenshot) || !screenshot.endsWith(".png")) {
        errors.push(`${label} ${viewport} screenshot must be a portable relative .png path.`);
      }
    }

    if (!Array.isArray(output?.motifs)) {
      errors.push(`${label} motifs must be an array.`);
    } else {
      for (const id of duplicateValues(output.motifs)) errors.push(`${label} has duplicate motif: ${id}.`);
      for (const id of output.motifs.filter((id) => !motifIds.has(id))) {
        errors.push(`${label} has unknown motif: ${id}.`);
      }
    }

    if (!Array.isArray(output?.reviews) || output.reviews.length === 0) {
      errors.push(`${label} must contain at least one review.`);
      continue;
    }

    const reviewerIds = output.reviews.map((review) => review?.reviewer);
    for (const id of duplicateValues(reviewerIds)) errors.push(`${label} has duplicate reviewer: ${id}.`);

    for (const [index, review] of output.reviews.entries()) {
      const reviewLabel = `${label} review ${index}`;
      if (!nonEmptyString(review?.reviewer)) errors.push(`${reviewLabel} reviewer must be present.`);
      if (!exactKeys(review?.scores, dimensionIds)) {
        errors.push(`${reviewLabel} scores must contain every rubric dimension and no unknown keys.`);
      } else {
        for (const id of dimensionIds) {
          const score = review.scores[id];
          if (!Number.isInteger(score) || score < minimum || score > maximum) {
            errors.push(`${reviewLabel} score ${id} must be an integer from ${minimum} through ${maximum}.`);
          }
        }
      }

      if (!Array.isArray(review?.smells)) {
        errors.push(`${reviewLabel} smells must be an array.`);
      } else {
        for (const id of duplicateValues(review.smells.map((smell) => smell?.id))) {
          errors.push(`${reviewLabel} has duplicate smell: ${id}.`);
        }
        for (const [smellIndex, smell] of review.smells.entries()) {
          if (!smellIds.has(smell?.id)) errors.push(`${reviewLabel} has unknown smell: ${smell?.id}.`);
          if (!nonEmptyString(smell?.evidence)) {
            errors.push(`${reviewLabel} smell ${smellIndex} must include specific evidence.`);
          }
        }
      }

      if (!nonEmptyString(review?.evidence)) errors.push(`${reviewLabel} must include review evidence.`);
      if (review?.notes !== null && review?.notes !== undefined && !nonEmptyString(review.notes)) {
        errors.push(`${reviewLabel} notes must be null or a non-empty string.`);
      }
    }
  }

  return errors;
}

export async function validateTasteEvidence(runPath, run) {
  const errors = [];
  const base = dirname(resolve(runPath));

  for (const output of run.outputs) {
    for (const [kind, relativePath] of [
      ["artifact", output.artifact],
      ["desktop screenshot", output.screenshots.desktop],
      ["mobile screenshot", output.screenshots.mobile]
    ]) {
      try {
        await access(resolve(base, relativePath));
      } catch {
        errors.push(`output ${output.briefId} ${kind} is missing at ${relativePath}.`);
      }
    }
  }

  return errors;
}

function outputScore(output, dimensionId) {
  return average(output.reviews.map((review) => review.scores[dimensionId]));
}

function runScore(run, dimensionId) {
  return average(run.outputs.map((output) => outputScore(output, dimensionId)));
}

function smellCount(run, smellId) {
  return run.outputs.filter((output) =>
    output.reviews.some((review) => review.smells.some((smell) => smell.id === smellId))
  ).length;
}

function motifCount(run, motifId) {
  return run.outputs.filter((output) => output.motifs.includes(motifId)).length;
}

export function renderTasteReport(runs, definition) {
  if (!Array.isArray(runs) || runs.length === 0) throw new Error("at least one completed run is required.");
  const duplicateRunIds = duplicateValues(runs.map((run) => run.run.id));
  if (duplicateRunIds.length > 0) throw new Error(`duplicate run id: ${duplicateRunIds.join(", ")}.`);

  for (const run of runs) {
    const errors = validateCompletedTasteRun(run, definition);
    if (errors.length > 0) throw new Error(errors.join("\n"));
  }

  const labels = runs.map((run) => escapeCell(run.run.label));
  const count = definition.briefs.briefs.length;
  const lines = [
    "# JBM taste evaluation report",
    "",
    `Runs: ${runs.length} · Briefs per run: ${count}`,
    "",
    "## Run ledger",
    "",
    "| Run | Generator | Generated at |",
    "| --- | --- | --- |",
    ...runs.map(
      (run) =>
        `| ${escapeCell(run.run.label)} | ${escapeCell(run.run.generator)} | ${escapeCell(run.run.generatedAt)} |`
    ),
    "",
    "## Mean rubric scores",
    "",
    `| Dimension | ${labels.join(" | ")} |`,
    `| --- | ${labels.map(() => "---:").join(" | ")} |`,
    ...definition.rubric.dimensions.map(
      (dimension) =>
        `| ${escapeCell(dimension.name)} | ${runs.map((run) => runScore(run, dimension.id).toFixed(2)).join(" | ")} |`
    ),
    "",
    "Each brief has equal weight. Multiple reviewers are averaged within an output before outputs are averaged.",
    "",
    "## Outputs with evidenced smells",
    "",
    `| Smell | ${labels.join(" | ")} |`,
    `| --- | ${labels.map(() => "---:").join(" | ")} |`,
    ...definition.rubric.smells.map(
      (smell) =>
        `| ${escapeCell(smell.name)} | ${runs.map((run) => `${smellCount(run, smell.id)} / ${count}`).join(" | ")} |`
    ),
    "",
    "A smell is counted once per output even when multiple reviewers cite it.",
    "",
    "## Neutral motif frequency",
    "",
    `| Motif | ${labels.join(" | ")} |`,
    `| --- | ${labels.map(() => "---:").join(" | ")} |`,
    ...definition.rubric.motifs.map(
      (motif) =>
        `| ${escapeCell(motif.name)} | ${runs.map((run) => `${motifCount(run, motif.id)} / ${count}`).join(" | ")} |`
    ),
    "",
    "Motif frequency is an inspection prompt, not an automatic failure. Read it beside content fit and artifact-specific evidence.",
    ""
  ];

  return lines.join("\n");
}

function option(args, name) {
  const index = args.indexOf(name);
  if (index === -1 || index === args.length - 1 || args[index + 1].startsWith("--")) {
    throw new Error(`${name} is required.`);
  }
  return args[index + 1];
}

function validateInitArgs(args) {
  const allowed = new Set(["--label", "--generator", "--output"]);
  for (let index = 0; index < args.length; index += 2) {
    if (!allowed.has(args[index])) throw new Error(`unknown init option: ${args[index] ?? "<missing>"}.`);
    if (index === args.length - 1) throw new Error(`${args[index]} requires a value.`);
  }
}

async function main() {
  const [command = "validate", ...args] = process.argv.slice(2);
  const definition = await loadTasteDefinition();
  assertValidDefinition(definition);

  if (command === "validate") {
    if (args.length > 0) throw new Error("validate does not accept arguments.");
    console.log(
      `taste evaluation definition passed (${definition.briefs.briefs.length} briefs, ${definition.rubric.dimensions.length} dimensions, ${definition.rubric.smells.length} smells, ${definition.rubric.motifs.length} motifs)`
    );
    return;
  }

  if (command === "init") {
    validateInitArgs(args);
    const output = option(args, "--output");
    const run = createTasteRun(definition, {
      label: option(args, "--label"),
      generator: option(args, "--generator")
    });
    const destination = resolve(output);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, `${JSON.stringify(run, null, 2)}\n`, { flag: "wx" });
    console.log(`initialized taste evaluation run at ${output}`);
    return;
  }

  if (command === "report") {
    if (args.length === 0) throw new Error("report requires at least one run JSON path.");
    const runs = [];
    for (const path of args) {
      const run = await json(path);
      const runErrors = validateCompletedTasteRun(run, definition);
      const evidenceErrors = runErrors.length === 0 ? await validateTasteEvidence(path, run) : [];
      const errors = [...runErrors, ...evidenceErrors];
      if (errors.length > 0) throw new Error(`${path}:\n${errors.join("\n")}`);
      runs.push(run);
    }
    process.stdout.write(renderTasteReport(runs, definition));
    return;
  }

  throw new Error(`unknown command: ${command}. Use validate, init, or report.`);
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : null;
if (invokedPath === import.meta.url) {
  main().catch((error) => {
    console.error(`taste-eval error: ${error.message}`);
    process.exitCode = 1;
  });
}
