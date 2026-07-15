# Joyful Brutalist Minimalism

Joyful Brutalist Minimalism is Sergio's authored design language for the web:
documented in prose, explored in Figma, and proven through coded specimens.
It is a design practice, not a framework that every project must import.

Start with [DESIGN.md](DESIGN.md). It explains the principles, vocabulary,
judgment calls, accessibility contract, and the boundaries between prose,
tokens, Figma, and browser behavior.

## Sources of truth

| Concern | Authority |
| --- | --- |
| Meaning, judgment, and adoption rules | [`DESIGN.md`](DESIGN.md) |
| Portable named values | [`tokens/jbm.tokens.json`](tokens/jbm.tokens.json) |
| Exact CSS and Figma mapping | [generated token reference](docs/token-reference.md) |
| Browser custom properties | [generated CSS](src/styles/tokens.css) |
| Visual exploration and committed visual decisions | [Joyful Brutalist Minimalism in Figma](https://www.figma.com/design/T4jEmsyQBURKMr6s3zYfFJ) |
| Browser behavior | `src/pages/index.astro` and its specimens |
| Scope and durable work history | [epic #1](https://github.com/chekos/joyful-brutalist-minimalism/issues/1) |

The reference-site path is reserved for the Astro specimen established by the
epic's browser phase. Consumer sites remain independent interpretations.

## Portable foundations

[`tokens/jbm.tokens.json`](tokens/jbm.tokens.json) is the only hand-edited
value source. It follows the
[Design Tokens Community Group 2025.10 format](https://www.designtokens.org/TR/2025.10/format/)
and contains the mapping policy, provenance, contrast pairs, and reduced-motion
contract alongside the tokens.

Generate the derived views:

```sh
npm install
npm run generate
```

This updates:

- `src/styles/tokens.css` for browsers;
- `tokens/jbm.figma.json` for exact Figma targets and scopes; and
- `docs/token-reference.md` for the human mapping and contrast ledger.

Verify formatting, DTCG shape, aliases, mappings, color contrast, generated
parity, and tests:

```sh
npm run check
npm run build
npm run validate:spec
```

`validate:spec` uses `uvx` to check the canonical file against the
published DTCG 2025.10 JSON Schema. The regular check remains deterministic and
offline-capable; it additionally validates JBM's mapping, provenance, contrast,
alias, reduced-motion, and generated-parity contracts.

Do not hand-edit generated files. Change the canonical token JSON, regenerate,
review the diff, and then apply its named targets deliberately in Figma.

## Founding definition

> Joyful Brutalist Minimalism is Sergio's public, authored design language for
> the web: documented in prose, explored in Figma, and proven through coded
> specimens—without requiring every project to import the same components.

The repository is intentionally unlicensed until documentation, code, and
visual-asset licensing are chosen explicitly. Public visibility is not a grant
of reuse rights.
