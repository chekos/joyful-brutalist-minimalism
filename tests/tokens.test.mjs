import assert from "node:assert/strict";
import test from "node:test";
import {
  canonicalToCss,
  canonicalToFigma,
  flattenTokens,
  loadTokenDocument,
  resolveTokenValue,
  tokenIndex,
  toCssValue,
  validateTokenDocument
} from "../scripts/lib/tokens.mjs";

const document = await loadTokenDocument();
const validation = validateTokenDocument(document);
const { tokens } = flattenTokens(document);
const tokensByPath = tokenIndex(tokens);

test("the canonical document passes schema, mapping, contrast, and provenance checks", () => {
  assert.deepEqual(validation.errors, []);
  assert.ok(tokens.length >= 55);
});

test("semantic aliases resolve to their approved primitives", () => {
  assert.deepEqual(
    resolveTokenValue("color.semantic.action.default", tokensByPath),
    resolveTokenValue("color.primitive.terra.700", tokensByPath)
  );
  assert.deepEqual(
    resolveTokenValue("color.semantic.surface.page", tokensByPath),
    resolveTokenValue("color.primitive.bone.50", tokensByPath)
  );
});

test("canonical names deterministically map to CSS and Figma", () => {
  assert.equal(
    canonicalToCss("color.semantic.action.default"),
    "--jbm-color-semantic-action-default"
  );
  assert.equal(
    canonicalToFigma("color.semantic.action.default"),
    "Color/Semantic/Action/Default"
  );
});

test("generated CSS preserves semantic aliases", () => {
  const token = tokensByPath.get("color.semantic.action.default");
  assert.equal(
    toCssValue(token, tokensByPath),
    "var(--jbm-color-primitive-terra-700)"
  );
});

test("all declared contrast pairs pass their threshold", () => {
  for (const pair of validation.contrasts) {
    assert.ok(
      pair.ratio >= pair.minimum,
      `${pair.name}: ${pair.ratio.toFixed(2)} is below ${pair.minimum}`
    );
  }
});

test("the validator rejects an unknown alias", () => {
  const invalid = structuredClone(document);
  invalid.color.semantic.action.default.$value = "{color.missing}";
  const result = validateTokenDocument(invalid);
  assert.ok(result.errors.some((error) => error.includes("Unknown token reference")));
});
