import assert from "node:assert/strict";
import test from "node:test";
import {
  canonicalToCss,
  canonicalToFigma,
  flattenTokens,
  loadTokenDocument,
  renderCss,
  renderFigmaMappings,
  resolveTokenValue,
  resolveTokenValueForColorway,
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
  assert.ok(tokens.length >= 65);
});

test("semantic aliases resolve to their approved primitives", () => {
  assert.deepEqual(
    resolveTokenValue("color.semantic.accent.default", tokensByPath),
    resolveTokenValue("color.primitive.terra.700", tokensByPath)
  );
  assert.deepEqual(
    resolveTokenValue("color.semantic.surface.page", tokensByPath),
    resolveTokenValue("color.primitive.bone.50", tokensByPath)
  );
});

test("Terra is the default and every colorway resolves the same semantic roles", () => {
  const colorways = document.$extensions["io.soyserg.jbm"].colorways;
  assert.equal(colorways.default, "terra");
  assert.deepEqual(colorways.modes, ["terra", "sage", "sky"]);

  for (const [colorway, primitive] of [
    ["terra", "color.primitive.terra.700"],
    ["sage", "color.primitive.sage.700"],
    ["sky", "color.primitive.sky.700"]
  ]) {
    assert.deepEqual(
      resolveTokenValueForColorway(
        "color.semantic.accent.default",
        colorway,
        tokensByPath
      ),
      resolveTokenValue(primitive, tokensByPath)
    );
    assert.deepEqual(
      resolveTokenValueForColorway(
        "color.semantic.focus.ring",
        colorway,
        tokensByPath
      ),
      resolveTokenValue(primitive, tokensByPath)
    );
  }
});

test("canonical names deterministically map to CSS and Figma", () => {
  assert.equal(
    canonicalToCss("color.semantic.accent.default"),
    "--jbm-color-semantic-accent-default"
  );
  assert.equal(
    canonicalToFigma("color.semantic.accent.default"),
    "Color/Semantic/Accent/Default"
  );
});

test("generated CSS preserves semantic aliases", () => {
  const token = tokensByPath.get("color.semantic.accent.default");
  assert.equal(
    toCssValue(token, tokensByPath),
    "var(--jbm-color-primitive-terra-700)"
  );

  const css = renderCss(document);
  assert.match(css, /:root\[data-jbm-colorway="terra"\]/);
  assert.match(css, /:root\[data-jbm-colorway="sage"\]/);
  assert.match(css, /:root\[data-jbm-colorway="sky"\]/);
  assert.match(
    css,
    /--jbm-color-semantic-accent-default: var\(--jbm-color-primitive-sage-700\)/
  );
});

test("generated Figma mappings expose the same semantic collection modes", () => {
  const mapping = JSON.parse(renderFigmaMappings(document));
  assert.deepEqual(mapping.colorways, {
    default: "Terra",
    modes: ["Terra", "Sage", "Sky"],
    attribute: "data-jbm-colorway",
    collection: "JBM Semantics"
  });

  const accent = mapping.mappings.find(
    (item) => item.token === "color.semantic.accent.default"
  );
  assert.deepEqual(Object.keys(accent.figma.modes), ["Terra", "Sage", "Sky"]);
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
  invalid.color.semantic.accent.default.$value = "{color.missing}";
  const result = validateTokenDocument(invalid);
  assert.ok(result.errors.some((error) => error.includes("Unknown token reference")));
});

test("the validator rejects an incomplete colorway mapping", () => {
  const invalid = structuredClone(document);
  delete invalid.color.semantic.accent.default.$extensions["io.soyserg.jbm"]
    .colorwayValues.sky;
  const result = validateTokenDocument(invalid);
  assert.ok(
    result.errors.some((error) =>
      error.includes("color.semantic.accent.default has no sky colorway value")
    )
  );
});
