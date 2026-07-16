import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";

const errors = [];

async function json(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

function equal(label, actual, expected) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    errors.push(`${label} does not match its repository-owned source.`);
  }
}

async function sha256(path) {
  return createHash("sha256").update(await readFile(path)).digest("hex");
}

const packageJson = await json("package.json");
const inspection = await json("docs/figma/v1/inspection.json");
const recovery = await json("docs/figma/v1/recovery-manifest.json");
const checkpoint = await json("docs/releases/v1-portability.json");
const nodeVersion = (await readFile(".node-version", "utf8")).trim();

equal("Figma source file", recovery.figmaFile, inspection.file);
equal("Figma pages", recovery.inventory.pages, inspection.pages);
equal("Figma variables", recovery.inventory.variables, inspection.variables);
equal("Figma styles", recovery.inventory.styles, inspection.styles);
equal(
  "Figma component inventory",
  recovery.inventory.componentSets.map(({ properties: _properties, ...item }) => item),
  inspection.components.items
);
equal("Figma component totals", recovery.inventory.componentSetTotals, {
  sets: inspection.components.sets,
  variants: inspection.components.variants
});
equal("Figma studies", recovery.inventory.studies, inspection.studies);
equal("Checkpoint package version", checkpoint.version, packageJson.version);
equal("Checkpoint Node version", checkpoint.toolchain.node, nodeVersion);
equal(
  "Checkpoint npm version",
  checkpoint.toolchain.npm,
  packageJson.packageManager.split("@").at(-1)
);

if (!packageJson.scripts["validate:spec"].includes(checkpoint.toolchain.checkJsonschema)) {
  errors.push("The DTCG validator command does not match the checkpoint version.");
}

if (!/^[0-9a-f]{40}$/.test(checkpoint.sourceCommit)) {
  errors.push("Checkpoint sourceCommit must be a full Git commit SHA.");
}

if (checkpoint.release.created !== false) {
  errors.push("The portability checkpoint must not claim an unapproved release.");
}

for (const path of [
  ...Object.values(recovery.authority),
  recovery.inspection,
  ...inspection.screenshots.map((name) => `docs/figma/v1/${name}`),
  recovery.sync.contract,
  recovery.sync.manifest,
  "docs/decisions/0001-portability-is-a-repository-invariant.md",
  "docs/decisions/0003-round-trip-parity-is-a-system-invariant.md",
  "docs/decisions/template.md"
]) {
  try {
    await access(path);
  } catch {
    errors.push(`${path} is referenced by the portability contract but missing.`);
  }
}

for (const artifact of checkpoint.artifacts) {
  try {
    const actual = await sha256(artifact.path);
    if (actual !== artifact.sha256) {
      errors.push(`${artifact.path} no longer matches the v1 checkpoint checksum.`);
    }
  } catch {
    errors.push(`${artifact.path} is missing from the v1 checkpoint.`);
  }
}

if (recovery.snapshot.current !== null) {
  const snapshot = recovery.snapshot.current;
  if (!snapshot.path || !/^[0-9a-f]{64}$/.test(snapshot.sha256 ?? "")) {
    errors.push("A current Figma snapshot requires both a path and SHA-256 checksum.");
  }
}

if (errors.length > 0) {
  errors.forEach((error) => console.error(`portability error: ${error}`));
  process.exitCode = 1;
} else {
  console.log("portability contract passed");
}
