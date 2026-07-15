import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const expectedNode = readFileSync(".node-version", "utf8").trim();
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const expectedNpm = packageJson.packageManager.split("@").at(-1);
const checkpoint = JSON.parse(
  readFileSync("docs/releases/v1-portability.json", "utf8")
);
const expectedUv = checkpoint.toolchain.uv;

function version(command, args, pattern) {
  try {
    return execFileSync(command, args, { encoding: "utf8" }).match(pattern)?.[1];
  } catch {
    return undefined;
  }
}

function fail(message) {
  console.error(`bootstrap blocked: ${message}`);
  process.exit(1);
}

if (process.version.slice(1) !== expectedNode) {
  fail(
    `Node ${expectedNode} is required; found ${process.version.slice(1)}. ` +
      "Use .node-version with your Node version manager, then retry."
  );
}

const actualNpm = version("npm", ["--version"], /^(\S+)/);
if (actualNpm !== expectedNpm) {
  fail(
    `npm ${expectedNpm} is required; found ${actualNpm ?? "no npm"}. ` +
      `Run corepack prepare npm@${expectedNpm} --activate, then retry.`
  );
}

const actualUv = version("uvx", ["--version"], /^uvx (\S+)/);
if (actualUv !== expectedUv) {
  fail(
    `uvx ${expectedUv} is required; found ${actualUv ?? "no uvx"}. ` +
      "Install the pinned uv version described in PORTABILITY.md and retry."
  );
}

function run(command, args) {
  execFileSync(command, args, { stdio: "inherit" });
}

run("npm", ["ci"]);
run("npm", [
  "exec",
  "--",
  "playwright",
  "install",
  ...(process.platform === "linux" ? ["--with-deps"] : []),
  "chromium"
]);
run("npm", ["run", "doctor"]);

console.log("bootstrap complete; run npm run verify");
