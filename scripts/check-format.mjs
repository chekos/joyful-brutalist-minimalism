import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const files = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
  { encoding: "utf8" }
)
  .split("\0")
  .filter(Boolean)
  .filter((path) => /\.(css|json|md|mjs|yml|yaml)$/.test(path));

const errors = [];

for (const path of files) {
  const source = await readFile(path, "utf8");

  if (source.includes("\r")) {
    errors.push(`${path}: use LF line endings`);
  }
  if (!source.endsWith("\n")) {
    errors.push(`${path}: add a final newline`);
  }

  source.split("\n").forEach((line, index) => {
    if (/\s+$/.test(line)) {
      errors.push(`${path}:${index + 1}: remove trailing whitespace`);
    }
  });

  if (path.endsWith(".json")) {
    try {
      const parsed = JSON.parse(source);
      const formatted = `${JSON.stringify(parsed, null, 2)}\n`;
      if (source !== formatted) {
        errors.push(`${path}: format JSON with two-space indentation`);
      }
    } catch (error) {
      errors.push(`${path}: invalid JSON (${error.message})`);
    }
  }
}

if (errors.length > 0) {
  errors.forEach((error) => console.error(`error: ${error}`));
  process.exitCode = 1;
} else {
  console.log(`format check passed for ${files.length} files`);
}
