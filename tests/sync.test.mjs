import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { validateSyncContract } from "../scripts/validate-sync.mjs";

const manifest = JSON.parse(
  await readFile("docs/sync/manifest.json", "utf8")
);

test("the round-trip sync manifest has complete evidence", async () => {
  assert.deepEqual(await validateSyncContract(), []);
});

test("the sync validator rejects a silently omitted core form", async () => {
  const invalid = structuredClone(manifest);
  delete invalid.features[0].forms.figma;
  const errors = await validateSyncContract({ manifestOverride: invalid });
  assert.ok(
    errors.some((error) => error.includes("figma has no explicit sync state"))
  );
});
