# Figma v1 inspection receipt

The editable [Joyful Brutalist Minimalism Figma file](https://www.figma.com/design/T4jEmsyQBURKMr6s3zYfFJ)
translates the repository-owned constitution and portable tokens into visual
representations. It does not create a second portable-value source.

This build fulfills [issue #5](https://github.com/chekos/joyful-brutalist-minimalism/issues/5)
and is reviewed in [pull request #8](https://github.com/chekos/joyful-brutalist-minimalism/pull/8).
Its authoritative inputs are [`DESIGN.md`](../DESIGN.md),
[`tokens/jbm.tokens.json`](../tokens/jbm.tokens.json), and the generated
[`tokens/jbm.figma.json`](../tokens/jbm.figma.json). The machine-readable
inspection result is stored in [`docs/figma/v1/inspection.json`](figma/v1/inspection.json).
The repository-owned
[`recovery-manifest.json`](figma/v1/recovery-manifest.json) records the minimum
inventory needed to audit an imported copy or a manual rebuild.

## Inspection result

- Pages exist in the required order: `00 Cover`, `01 Principles`,
  `02 Foundations`, `03 Components`, `04 Patterns`, and `05 Studies`.
- `JBM Primitives` contains 28 variables and `JBM Semantics` contains 12
  semantic aliases. All 40 variables have deliberate scopes and canonical WEB
  code syntax.
- Four text styles and two paper effect styles match the generated mapping.
  `System/Utility` uses Inter as the documented Figma substitute for the
  browser-native `system-ui` stack.
- Seven auto-layout component sets contain 23 variants. Every set has exposed
  text or boolean properties, usage documentation, mapped text styles, and
  variable-bound committed values.
- The Technical Figure encodes the four repository-defined authorities and
  uses a live Figure Caption instance with provenance.
- The Reading Instrument remains a study. It classifies all eight principles
  once by primary decision lens: Structure 2, Experience 2, Translation 3,
  and Access 1.
- Programmatic inspection and native-resolution screenshot review passed.

| Component | Variant axes | Variants | Exposed properties |
| --- | --- | ---: | --- |
| Ground | Surface | 3 | Kicker, Content, Show Meta |
| Kicker | Tone | 3 | Text, Show Marker |
| Rule | Emphasis, Weight | 4 | Label, Show Label |
| Index Row | State | 2 | Index, Label, Evidence, Show Evidence |
| Plate | Surface, Pressure | 6 | Title, Body, Meta, Show Meta |
| Action Link | State | 3 | Label, Show Arrow |
| Figure Caption | Layout | 2 | Index, Caption, Provenance, Show Provenance |

## Checkpoints and connector boundary

The Figma connector's remote runtime does not support
`saveVersionHistoryAsync`. The file still auto-saves, but named version-history
entries could not be created programmatically. Equivalent verified checkpoint
records are stored on the document root under the stable `jbm_dsb` shared-data
namespace:

- `checkpoint_foundations`: 40 variables and 6 styles;
- `checkpoint_components`: 7 component sets and 23 variants; and
- `final_validation`: the complete pages, tokens, styles, components, and
  studies audit.

This is an intentional connector limitation, not a hidden substitute for a
Figma version. If a named manual checkpoint is needed, create it from the file
history using the labels `JBM v1 — foundations` and `JBM v1 — components`.

## Recovery boundary

Use Figma's **File → Save local copy** command for a manual `.fig` snapshot and
follow [`PORTABILITY.md`](../PORTABILITY.md#figma) for storage and checksums.
A local copy does not include comments or version history, and importing it
creates an independent file. The recovery manifest therefore records pages,
variables, styles, components, variants, properties, studies, and their
repository-owned mappings. Full deterministic reconstruction is intentionally
deferred.

## Source-of-truth workflow

1. Change portable values only in `tokens/jbm.tokens.json`.
2. Run `npm run generate`, inspect the generated CSS, Figma mapping, and token
   reference together, then run `npm run check` and `npm run validate:spec`.
3. Apply the generated Figma mapping deliberately. Semantic variables must
   remain aliases to primitives.
4. Keep Figma-only geometry, component properties, and studies in Figma.
5. Record meaningful divergence rather than forcing unlike media into pixel
   identity.

## Visual evidence

### Cover

![Cover page](figma/v1/00-cover.png)

### Principles

![Principles page](figma/v1/01-principles.png)

### Foundations

![Foundations page](figma/v1/02-foundations.png)

### Components

![Components page](figma/v1/03-components.png)

### Patterns

![Patterns page](figma/v1/04-patterns.png)

### Studies

![Studies page](figma/v1/05-studies.png)

Detailed crops: [Technical Figure](figma/v1/technical-figure.png) and
[Reading Instrument](figma/v1/reading-instrument.png).
