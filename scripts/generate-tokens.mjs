import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import process from "node:process";
import {
  loadTokenDocument,
  renderCss,
  renderFigmaMappings,
  renderTokenReference
} from "./lib/tokens.mjs";

const checkOnly = process.argv.includes("--check");
const document = await loadTokenDocument();
const outputs = new Map([
  ["src/styles/tokens.css", renderCss(document)],
  ["tokens/jbm.figma.json", renderFigmaMappings(document)],
  ["docs/token-reference.md", renderTokenReference(document)]
]);

let drifted = false;

for (const [path, expected] of outputs) {
  if (checkOnly) {
    let actual;
    try {
      actual = await readFile(path, "utf8");
    } catch {
      actual = undefined;
    }

    if (actual !== expected) {
      console.error(`${path} is missing or out of date. Run npm run generate.`);
      drifted = true;
    }
  } else {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, expected);
    console.log(`generated ${path}`);
  }
}

if (drifted) {
  process.exitCode = 1;
} else if (checkOnly) {
  console.log("generated token artifacts are in parity");
}
