import { access, readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const defaultManifestPath = "docs/sync/manifest.json";

async function json(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function unique(values) {
  return [...new Set(values)];
}

export async function validateSyncContract({
  root = process.cwd(),
  manifestOverride,
  manifestPath = defaultManifestPath
} = {}) {
  const at = (path) => `${root}/${path}`;
  const errors = [];
  const manifest = manifestOverride ?? (await json(at(manifestPath)));
  const mapping = await json(at(manifest.tokenParity.generatedMapping));
  const inspection = await json(at(manifest.tokenParity.figmaInspection));
  const allowedStates = new Set(manifest.completionStates);

  for (const path of [manifest.contract, manifest.decision]) {
    if (!(await exists(at(path)))) {
      errors.push(`${path}: required sync artifact is missing.`);
    }
  }

  if (mapping.generatedFrom !== manifest.tokenParity.canonical) {
    errors.push("The Figma mapping does not name the canonical token source.");
  }

  const variableMappings = mapping.mappings.filter(
    (item) => item.figma.target === "variable"
  );
  const textStyles = unique(
    mapping.mappings
      .filter((item) => item.figma.target === "text-style")
      .map((item) => item.figma.style)
  );
  const effectStyles = unique(
    mapping.mappings
      .filter((item) => item.figma.target === "effect-style")
      .map((item) => item.figma.style)
  );
  const expected = manifest.tokenParity.expected;

  if (variableMappings.length !== expected.variables) {
    errors.push("Generated and expected Figma variable totals differ.");
  }
  if (textStyles.length !== expected.textStyles) {
    errors.push("Generated and expected Figma text-style totals differ.");
  }
  if (effectStyles.length !== expected.effectStyles) {
    errors.push("Generated and expected Figma effect-style totals differ.");
  }

  const liveParity = inspection.sync?.tokenParity;
  if (liveParity?.status !== "passed") {
    errors.push("The Figma inspection does not record passed live token parity.");
  } else {
    for (const key of ["variables", "textStyles", "effectStyles"]) {
      if (liveParity[key] !== expected[key]) {
        errors.push(`Live Figma ${key} do not match the sync manifest.`);
      }
    }
  }

  const featureIds = new Set();
  for (const feature of manifest.features) {
    if (featureIds.has(feature.id)) {
      errors.push(`${feature.id}: duplicate feature id.`);
    }
    featureIds.add(feature.id);

    for (const formName of manifest.requiredCoreForms) {
      const form = feature.forms[formName];
      if (!form) {
        errors.push(`${feature.id}: ${formName} has no explicit sync state.`);
        continue;
      }
      if (!allowedStates.has(form.status)) {
        errors.push(`${feature.id}: ${formName} uses unknown state ${form.status}.`);
      }
      if (
        ["verified-existing", "not-applicable", "intentional-divergence"].includes(
          form.status
        ) &&
        !form.reason
      ) {
        errors.push(`${feature.id}: ${formName} must explain ${form.status}.`);
      }
    }

    const meaning = feature.forms.meaning;
    if (meaning?.status === "represented") {
      if (!(await exists(at(meaning.path)))) {
        errors.push(`${feature.id}: meaning source ${meaning.path} is missing.`);
      } else if (
        !(await readFile(at(meaning.path), "utf8")).includes(meaning.anchorHeading)
      ) {
        errors.push(`${feature.id}: meaning heading is missing from ${meaning.path}.`);
      }
    }

    const figma = feature.forms.figma;
    if (figma?.status === "represented") {
      if (!/^\d+:\d+$/.test(figma.nodeId ?? "")) {
        errors.push(`${feature.id}: Figma node id is invalid.`);
      }
      if (!(await exists(at(figma.screenshot)))) {
        errors.push(`${feature.id}: Figma screenshot ${figma.screenshot} is missing.`);
      }
      for (const nodeId of Object.values(figma.states ?? {})) {
        if (!/^\d+:\d+$/.test(nodeId)) {
          errors.push(`${feature.id}: Figma state node id ${nodeId} is invalid.`);
        }
      }
    }

    const browser = feature.forms.browser;
    if (browser?.status === "represented") {
      if (!(await exists(at(browser.source)))) {
        errors.push(`${feature.id}: browser source ${browser.source} is missing.`);
      } else if (
        !(await readFile(at(browser.source), "utf8")).includes(browser.sourceMarker)
      ) {
        errors.push(`${feature.id}: browser marker is missing from ${browser.source}.`);
      }
    }
  }

  for (const [name, consumer] of Object.entries(manifest.consumers ?? {})) {
    if (consumer.status !== "not-adopted" || !consumer.reason) {
      errors.push(`${name}: consumer boundaries require explicit not-adopted status.`);
    }
  }

  return errors;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const errors = await validateSyncContract();
  if (errors.length) {
    errors.forEach((error) => console.error(`sync error: ${error}`));
    process.exitCode = 1;
  } else {
    console.log("round-trip sync contract passed");
  }
}
