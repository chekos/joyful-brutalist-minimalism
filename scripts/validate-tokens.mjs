import { loadTokenDocument, validateTokenDocument } from "./lib/tokens.mjs";

const document = await loadTokenDocument();
const { contrasts, errors, tokens } = validateTokenDocument(document);

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`error: ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `validated ${tokens.length} DTCG tokens, ${tokens.length} CSS mappings, and ${tokens.length} Figma mappings`
  );
  for (const pair of contrasts) {
    const colorway = pair.colorway ? ` [${pair.colorway}]` : "";
    console.log(
      `contrast: ${pair.name}${colorway} ${pair.ratio.toFixed(2)}:1 (minimum ${pair.minimum}:1)`
    );
  }
}
