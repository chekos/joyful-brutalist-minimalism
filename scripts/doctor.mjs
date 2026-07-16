import { execFileSync } from "node:child_process";
import { access, readFile } from "node:fs/promises";

const packageJson = JSON.parse(await readFile("package.json", "utf8"));
const checkpoint = JSON.parse(
  await readFile("docs/releases/v1-portability.json", "utf8")
);
const expectedNode = (await readFile(".node-version", "utf8")).trim();
const expectedNpm = packageJson.packageManager.split("@").at(-1);
const expectedUv = checkpoint.toolchain.uv;
const errors = [];

function commandVersion(command, args, pattern) {
  try {
    return execFileSync(command, args, { encoding: "utf8" }).match(pattern)?.[1];
  } catch {
    return undefined;
  }
}

function expectVersion(label, actual, expected, repair) {
  if (actual !== expected) {
    errors.push(`${label}: expected ${expected}, found ${actual ?? "missing"}. ${repair}`);
  }
}

expectVersion(
  "Node",
  process.version.slice(1),
  expectedNode,
  "Activate the version in .node-version."
);
expectVersion(
  "npm",
  commandVersion("npm", ["--version"], /^(\S+)/),
  expectedNpm,
  `Run corepack prepare npm@${expectedNpm} --activate.`
);
expectVersion(
  "uvx",
  commandVersion("uvx", ["--version"], /^uvx (\S+)/),
  expectedUv,
  "Install the pinned uv version described in PORTABILITY.md."
);

for (const path of [
  "DESIGN.md",
  "PORTABILITY.md",
  "SYNC.md",
  "tokens/jbm.tokens.json",
  "tokens/jbm.figma.json",
  "docs/sync/manifest.json",
  "docs/figma/v1/recovery-manifest.json",
  "docs/releases/v1-portability.json"
]) {
  try {
    await access(path);
  } catch {
    errors.push(`${path}: required repository-owned artifact is missing.`);
  }
}

try {
  const { chromium } = await import("@playwright/test");
  const browser = await chromium.launch({ headless: true });
  await browser.close();
} catch (error) {
  errors.push(
    `Chromium: unavailable (${error.message.split("\n")[0]}). ` +
      "Run npm run bootstrap."
  );
}

if (errors.length > 0) {
  errors.forEach((error) => console.error(`doctor failed: ${error}`));
  process.exitCode = 1;
} else {
  console.log(
    `doctor passed: Node ${expectedNode}, npm ${expectedNpm}, uvx ${expectedUv}, and Chromium`
  );
}
