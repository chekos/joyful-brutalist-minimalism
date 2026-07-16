import { readFile } from "node:fs/promises";

export const DTCG_SCHEMA =
  "https://www.designtokens.org/schemas/2025.10/format.json";
export const JBM_EXTENSION = "io.soyserg.jbm";

const REFERENCE = /^\{([^{}]+)\}$/;
const SUPPORTED_TYPES = new Set([
  "color",
  "cubicBezier",
  "dimension",
  "duration",
  "fontFamily",
  "fontWeight",
  "number",
  "shadow"
]);

export async function loadTokenDocument(path = "tokens/jbm.tokens.json") {
  return JSON.parse(await readFile(path, "utf8"));
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function extensionFor(node) {
  return node?.$extensions?.[JBM_EXTENSION] ?? {};
}

export function canonicalToCss(path) {
  const slug = path
    .split(".")
    .map((segment) =>
      segment
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase()
    )
    .join("-");

  return `--jbm-${slug}`;
}

function titleCase(segment) {
  return segment
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) =>
      /^\d+$/.test(part)
        ? part
        : `${part.charAt(0).toUpperCase()}${part.slice(1)}`
    )
    .join(" ");
}

export function canonicalToFigma(path) {
  return path.split(".").map(titleCase).join("/");
}

function fieldName(segment) {
  return segment.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function flattenTokens(document) {
  const tokens = [];
  const structureErrors = [];

  function visit(node, path, inherited) {
    if (!isObject(node)) {
      structureErrors.push(
        `${path || "<root>"} must be an object containing groups or a token.`
      );
      return;
    }

    const extension = extensionFor(node);
    const context = {
      type: node.$type ?? inherited.type,
      figma: extension.figma ?? inherited.figma,
      provenance: extension.provenance ?? inherited.provenance
    };
    const childKeys = Object.keys(node).filter((key) => !key.startsWith("$"));

    if (Object.hasOwn(node, "$value")) {
      if (childKeys.length > 0) {
        structureErrors.push(
          `${path} is both a token and a group; tokens cannot have child tokens.`
        );
      }

      tokens.push({
        path,
        type: context.type,
        value: node.$value,
        description: node.$description ?? "",
        cssCustomProperty: canonicalToCss(path),
        figmaName: canonicalToFigma(path),
        figma: context.figma,
        provenance: context.provenance
      });
      return;
    }

    for (const key of childKeys) {
      visit(node[key], path ? `${path}.${key}` : key, context);
    }
  }

  visit(document, "", {});
  return { tokens, structureErrors };
}

export function tokenIndex(tokens) {
  return new Map(tokens.map((token) => [token.path, token]));
}

function referencePath(value) {
  return typeof value === "string" ? value.match(REFERENCE)?.[1] : undefined;
}

function deepResolve(value, tokensByPath, stack) {
  const referencedPath = referencePath(value);
  if (referencedPath) {
    return resolveTokenValue(referencedPath, tokensByPath, stack);
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepResolve(item, tokensByPath, stack));
  }

  if (isObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        deepResolve(item, tokensByPath, stack)
      ])
    );
  }

  return value;
}

export function resolveTokenValue(path, tokensOrIndex, stack = []) {
  const tokensByPath =
    tokensOrIndex instanceof Map ? tokensOrIndex : tokenIndex(tokensOrIndex);
  const token = tokensByPath.get(path);

  if (!token) {
    throw new Error(`Unknown token reference: ${path}`);
  }

  if (stack.includes(path)) {
    throw new Error(`Circular token reference: ${[...stack, path].join(" -> ")}`);
  }

  return deepResolve(token.value, tokensByPath, [...stack, path]);
}

function cssColor(value) {
  if (value.alpha === undefined || value.alpha === 1) {
    return value.hex.toLowerCase();
  }

  const channels = value.components.map((component) =>
    Math.round(component * 255)
  );
  return `rgb(${channels.join(" ")} / ${value.alpha})`;
}

function cssDimension(value) {
  return `${value.value}${value.unit}`;
}

function quoteFontFamily(family) {
  if (
    family === "serif" ||
    family === "sans-serif" ||
    family === "monospace" ||
    family.startsWith("ui-") ||
    family === "system-ui"
  ) {
    return family;
  }

  return /\s/.test(family) ? JSON.stringify(family) : family;
}

function cssReference(value) {
  const path = referencePath(value);
  return path ? `var(${canonicalToCss(path)})` : undefined;
}

function cssValuePart(value, tokensByPath) {
  const reference = cssReference(value);
  if (reference) {
    return reference;
  }

  if (isObject(value) && Object.hasOwn(value, "colorSpace")) {
    return cssColor(value);
  }

  if (
    isObject(value) &&
    Object.hasOwn(value, "value") &&
    Object.hasOwn(value, "unit")
  ) {
    return cssDimension(value);
  }

  return formatResolvedValue(deepResolve(value, tokensByPath, []));
}

export function toCssValue(token, tokensOrIndex) {
  const tokensByPath =
    tokensOrIndex instanceof Map ? tokensOrIndex : tokenIndex(tokensOrIndex);
  const reference = cssReference(token.value);

  if (reference) {
    return reference;
  }

  switch (token.type) {
    case "color":
      return cssColor(token.value);
    case "dimension":
    case "duration":
      return cssDimension(token.value);
    case "cubicBezier":
      return `cubic-bezier(${token.value.join(", ")})`;
    case "fontFamily":
      return token.value.map(quoteFontFamily).join(", ");
    case "fontWeight":
    case "number":
      return String(token.value);
    case "shadow": {
      const { color, offsetX, offsetY, blur, spread, inset } = token.value;
      return [
        inset ? "inset" : "",
        cssValuePart(offsetX, tokensByPath),
        cssValuePart(offsetY, tokensByPath),
        cssValuePart(blur, tokensByPath),
        cssValuePart(spread, tokensByPath),
        cssValuePart(color, tokensByPath)
      ]
        .filter(Boolean)
        .join(" ");
    }
    default:
      throw new Error(`Cannot render CSS for unsupported type ${token.type}.`);
  }
}

function displayEffectStyle(token) {
  const prefix = token.figma.stylePrefix ?? "";
  const leaf = titleCase(token.path.split(".").at(-1));
  const normalizedLeaf = leaf
    .replace(new RegExp(`^${prefix}\\s+`, "i"), "")
    .trim();
  return [prefix, normalizedLeaf].filter(Boolean).join("/");
}

export function figmaMapping(token) {
  const base = {
    target: token.figma.target,
    name: token.figmaName
  };

  switch (token.figma.target) {
    case "variable":
      return {
        ...base,
        collection: token.figma.collection,
        type: token.figma.type,
        scopes: token.figma.scopes
      };
    case "text-style":
      return {
        ...base,
        style: token.figma.style,
        field: fieldName(token.path.split(".").at(-1))
      };
    case "effect-style":
      return {
        ...base,
        style: displayEffectStyle(token)
      };
    case "documentation":
      return {
        ...base,
        page: token.figma.page,
        section: token.figma.section
      };
    default:
      return base;
  }
}

export function describeFigmaMapping(token) {
  const mapping = figmaMapping(token);

  switch (mapping.target) {
    case "variable":
      return `${mapping.collection} · ${mapping.name} · ${mapping.type} · ${mapping.scopes.join(", ")}`;
    case "text-style":
      return `${mapping.style} · ${mapping.field}`;
    case "effect-style":
      return mapping.style;
    case "documentation":
      return `${mapping.page} · ${mapping.section} · ${mapping.name}`;
    default:
      return "Unmapped";
  }
}

function colorHexFromComponents(components) {
  return `#${components
    .map((component) =>
      Math.round(component * 255).toString(16).padStart(2, "0")
    )
    .join("")}`;
}

function validateDimension(value, units) {
  return (
    isObject(value) &&
    Number.isFinite(value.value) &&
    units.has(value.unit)
  );
}

function validateResolvedValue(token, value) {
  switch (token.type) {
    case "color":
      return (
        isObject(value) &&
        value.colorSpace === "srgb" &&
        Array.isArray(value.components) &&
        value.components.length === 3 &&
        value.components.every(
          (component) =>
            Number.isFinite(component) && component >= 0 && component <= 1
        ) &&
        (value.alpha === undefined ||
          (Number.isFinite(value.alpha) &&
            value.alpha >= 0 &&
            value.alpha <= 1)) &&
        /^#[0-9a-f]{6}$/i.test(value.hex ?? "") &&
        colorHexFromComponents(value.components) === value.hex.toLowerCase()
      );
    case "dimension":
      return validateDimension(value, new Set(["px", "rem"]));
    case "duration":
      return validateDimension(value, new Set(["ms", "s"]));
    case "cubicBezier":
      return (
        Array.isArray(value) &&
        value.length === 4 &&
        value.every(Number.isFinite) &&
        value[0] >= 0 &&
        value[0] <= 1 &&
        value[2] >= 0 &&
        value[2] <= 1
      );
    case "fontFamily":
      return (
        (typeof value === "string" && value.length > 0) ||
        (Array.isArray(value) &&
          value.length > 0 &&
          value.every((family) => typeof family === "string" && family.length > 0))
      );
    case "fontWeight":
      return (
        (Number.isFinite(value) && value >= 1 && value <= 1000) ||
        [
          "thin",
          "hairline",
          "extra-light",
          "ultra-light",
          "light",
          "normal",
          "regular",
          "book",
          "medium",
          "semi-bold",
          "demi-bold",
          "bold",
          "extra-bold",
          "ultra-bold",
          "black",
          "heavy",
          "extra-black",
          "ultra-black"
        ].includes(value)
      );
    case "number":
      return Number.isFinite(value);
    case "shadow":
      return (
        isObject(value) &&
        validateResolvedValue({ type: "color" }, value.color) &&
        ["offsetX", "offsetY", "blur", "spread"].every((key) =>
          validateDimension(value[key], new Set(["px", "rem"]))
        ) &&
        (value.inset === undefined || typeof value.inset === "boolean")
      );
    default:
      return false;
  }
}

function colorLuminance(color) {
  const channels = color.components.map((channel) =>
    channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

export function contrastRatio(foreground, background) {
  const foregroundLuminance = colorLuminance(foreground);
  const backgroundLuminance = colorLuminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

export function validateTokenDocument(document) {
  const { tokens, structureErrors } = flattenTokens(document);
  const tokensByPath = tokenIndex(tokens);
  const errors = [...structureErrors];
  const rootExtension = extensionFor(document);

  if (document.$schema !== DTCG_SCHEMA) {
    errors.push(`$schema must be ${DTCG_SCHEMA}.`);
  }

  if (tokens.length === 0) {
    errors.push("The canonical file must contain at least one token.");
  }

  const cssNames = new Set();
  const figmaVariableNames = new Set();

  for (const token of tokens) {
    if (!token.type || !SUPPORTED_TYPES.has(token.type)) {
      errors.push(`${token.path} has unsupported or missing $type ${token.type}.`);
      continue;
    }

    if (!token.figma?.target) {
      errors.push(`${token.path} has no inherited Figma mapping.`);
    } else if (token.figma.target === "variable") {
      if (
        !token.figma.collection ||
        !token.figma.type ||
        !Array.isArray(token.figma.scopes) ||
        token.figma.scopes.length === 0
      ) {
        errors.push(`${token.path} has an incomplete Figma variable mapping.`);
      }

      const variableKey = `${token.figma.collection}/${token.figmaName}`;
      if (figmaVariableNames.has(variableKey)) {
        errors.push(`Duplicate Figma variable mapping: ${variableKey}.`);
      }
      figmaVariableNames.add(variableKey);
    } else if (
      token.figma.target === "text-style" &&
      !token.figma.style
    ) {
      errors.push(`${token.path} has no Figma text style name.`);
    } else if (
      token.figma.target === "effect-style" &&
      !token.figma.stylePrefix
    ) {
      errors.push(`${token.path} has no Figma effect style prefix.`);
    } else if (
      token.figma.target === "documentation" &&
      (!token.figma.page || !token.figma.section)
    ) {
      errors.push(`${token.path} has incomplete Figma documentation mapping.`);
    } else if (
      !["variable", "text-style", "effect-style", "documentation"].includes(
        token.figma.target
      )
    ) {
      errors.push(`${token.path} uses unknown Figma target ${token.figma.target}.`);
    }

    if (!token.provenance?.sources?.length || !token.provenance?.decision) {
      errors.push(`${token.path} has no inherited provenance decision.`);
    }

    if (cssNames.has(token.cssCustomProperty)) {
      errors.push(`Duplicate CSS custom property: ${token.cssCustomProperty}.`);
    }
    cssNames.add(token.cssCustomProperty);

    try {
      const resolvedValue = resolveTokenValue(token.path, tokensByPath);
      if (!validateResolvedValue(token, resolvedValue)) {
        errors.push(
          `${token.path} does not contain a valid resolved ${token.type} value.`
        );
      }

      const directReference = referencePath(token.value);
      if (
        directReference &&
        tokensByPath.get(directReference)?.type !== token.type
      ) {
        errors.push(
          `${token.path} aliases ${directReference} with a different token type.`
        );
      }
    } catch (error) {
      errors.push(`${token.path}: ${error.message}`);
    }
  }

  const contrasts = [];
  for (const pair of rootExtension.contrastPairs ?? []) {
    try {
      const foreground = resolveTokenValue(pair.foreground, tokensByPath);
      const background = resolveTokenValue(pair.background, tokensByPath);
      const ratio = contrastRatio(foreground, background);
      contrasts.push({ ...pair, ratio });
      if (ratio < pair.minimum) {
        errors.push(
          `${pair.name} contrast is ${ratio.toFixed(2)}:1; expected at least ${pair.minimum}:1.`
        );
      }
    } catch (error) {
      errors.push(`${pair.name}: ${error.message}`);
    }
  }

  const reducedMotion = rootExtension.reducedMotion;
  if (!reducedMotion?.duration || !reducedMotion?.transformDistance) {
    errors.push("The root extension must declare the reduced-motion token contract.");
  } else {
    try {
      const duration = resolveTokenValue(reducedMotion.duration, tokensByPath);
      const distance = resolveTokenValue(
        reducedMotion.transformDistance,
        tokensByPath
      );
      if (duration.value !== 0 || distance.value !== 0) {
        errors.push("Reduced-motion duration and transform distance must resolve to zero.");
      }
    } catch (error) {
      errors.push(`Reduced-motion contract: ${error.message}`);
    }
  }

  return { contrasts, errors, tokens };
}

export function renderCss(document) {
  const { errors, tokens } = validateTokenDocument(document);
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
  const tokensByPath = tokenIndex(tokens);
  const lines = [
    "/**",
    " * GENERATED FILE — DO NOT EDIT DIRECTLY.",
    " * Source: tokens/jbm.tokens.json",
    " * Run: npm run generate",
    " */",
    "",
    ":root {"
  ];

  for (const token of tokens) {
    if (token.description) {
      lines.push(`  /* ${token.description} */`);
    }
    lines.push(
      `  ${token.cssCustomProperty}: ${toCssValue(token, tokensByPath)};`
    );
  }

  lines.push("}", "");
  return lines.join("\n");
}

function formatResolvedValue(value) {
  if (isObject(value) && Object.hasOwn(value, "colorSpace")) {
    return value.alpha === undefined || value.alpha === 1
      ? value.hex
      : `${value.hex} at ${Math.round(value.alpha * 100)}%`;
  }
  if (
    isObject(value) &&
    Object.hasOwn(value, "value") &&
    Object.hasOwn(value, "unit")
  ) {
    return `${value.value}${value.unit}`;
  }
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  if (isObject(value) && Object.hasOwn(value, "offsetX")) {
    return [
      value.inset ? "inset" : "",
      cssDimension(value.offsetX),
      cssDimension(value.offsetY),
      cssDimension(value.blur),
      cssDimension(value.spread),
      cssColor(value.color)
    ]
      .filter(Boolean)
      .join(" ");
  }
  return String(value);
}

function escapeCell(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

export function renderTokenReference(document) {
  const { contrasts, errors, tokens } = validateTokenDocument(document);
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
  const tokensByPath = tokenIndex(tokens);
  const lines = [
    "<!-- GENERATED FILE — DO NOT EDIT DIRECTLY. Run: npm run generate -->",
    "",
    "# Token reference and platform mapping",
    "",
    "The canonical source is `tokens/jbm.tokens.json`. CSS custom properties,",
    "this reference, and `tokens/jbm.figma.json` are generated views of that",
    "one source and must never be edited independently.",
    "",
    "CSS names are the canonical token path in kebab-case with a `--jbm-`",
    "prefix. Figma variable names are the same path in slash-separated Title",
    "Case. Where Figma cannot bind the value honestly, the mapping targets a",
    "text style, effect style, or named documentation section instead.",
    "",
    "## Exact mappings",
    "",
    "| Canonical token | Type | Resolved value | CSS custom property | Figma target | Provenance |",
    "| --- | --- | --- | --- | --- | --- |"
  ];

  for (const token of tokens) {
    const value = formatResolvedValue(
      resolveTokenValue(token.path, tokensByPath)
    );
    lines.push(
      `| \`${token.path}\` | \`${token.type}\` | \`${escapeCell(value)}\` | \`${token.cssCustomProperty}\` | ${escapeCell(describeFigmaMapping(token))} | ${escapeCell(token.provenance.sources.join(", "))} |`
    );
  }

  lines.push(
    "",
    "## Contrast contract",
    "",
    "| Pair | Foreground | Background | Ratio | Required |",
    "| --- | --- | --- | ---: | ---: |"
  );

  for (const pair of contrasts) {
    lines.push(
      `| ${pair.name} | \`${pair.foreground}\` | \`${pair.background}\` | ${pair.ratio.toFixed(2)}:1 | ${pair.minimum}:1 |`
    );
  }

  lines.push(
    "",
    "## Sync boundary",
    "",
    "- Change values, aliases, mapping policies, contrast pairs, or provenance in",
    "  `tokens/jbm.tokens.json`.",
    "- Run `npm run generate`, then `npm run check`.",
    "- Reconcile Figma to the generated mapping. Variables may bind directly;",
    "  text styles, effect styles, and prototype behavior require their named",
    "  target.",
    "- If an accepted portable-value change begins in Figma, promote it to the",
    "  canonical token file, regenerate, and reconcile the live file.",
    "- If Figma and code disagree, classify the disagreement before changing",
    "  anything: meaning belongs in `DESIGN.md`, visual representation in",
    "  Figma, browser behavior in the reference site, and portable values here.",
    ""
  );

  return lines.join("\n");
}

export function renderFigmaMappings(document) {
  const { errors, tokens } = validateTokenDocument(document);
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
  const tokensByPath = tokenIndex(tokens);

  return (
    JSON.stringify(
      {
        generated: true,
        generatedFrom: "tokens/jbm.tokens.json",
        specification: "DTCG 2025.10",
        instructions:
          "Do not edit. Reconcile live Figma variables and styles to these targets. Promote accepted Figma-originated portable-value changes to the canonical token file, regenerate, and record any intentional divergence.",
        mappings: tokens.map((token) => ({
          token: token.path,
          type: token.type,
          resolvedValue: resolveTokenValue(token.path, tokensByPath),
          cssCustomProperty: token.cssCustomProperty,
          figma: figmaMapping(token)
        }))
      },
      null,
      2
    ) + "\n"
  );
}
