---
date: 2026-07-16
topic: jbm-colorway-model
status: approved
---

# JBM colorway model

## What we're building

Keep Joyful Brutalist Minimalism's shared structure, type, motion, paper, and
ink grammar while making accent color a deployment-scoped choice. A deployment
chooses one colorway—Terra, Sage, or Sky—and that one family supplies its field,
default, hover, strong, and focus values. Terra is the default.

The primitive palette remains available as source material. The semantic layer,
components, specimens, and reference-site chrome stop assigning unrelated hue
families to simultaneous categories.

## Why this approach

The current system says to use signal color sparsely, but its semantic layer
encodes Terra for actions, Sky for focus and figures, Sage for quiet rules, and
both Sage and Sky for signals. The reference site then uses those roles
together to color lenses and technical content. The result is more like three
themes speaking at once than one restrained color story.

Making Software demonstrates how a near-white and near-black structure can let
one electric blue carry identity. Anthropic's circuit-feature work similarly
uses a narrow orange family against neutral grounds. The transferable lesson is
not either site's aesthetic: structure should come from neutrals, while one
chosen hue family carries most personality. DTCG aliases and Figma variable
modes give JBM a portable way to express that separation.

## Approaches considered

### Deployment-scoped colorways — chosen

Use stable semantic accent roles with Terra, Sage, and Sky mode mappings. Keep
surface, text, and rule roles neutral. A second hue may appear only inside a
bounded figure, data visualization, or status system with an explicit semantic
job.

This keeps one language recognizable across deployments without forcing every
deployment to carry every JBM hue at once.

### Full independent themes — deferred

Letting every colorway redefine paper, ink, typography, and geometry could
create more dramatic themes, but it would weaken the shared language before the
smaller accent model has been proven.

### Keep simultaneous Action, Sage, and Sky roles — rejected

The existing model makes palette names part of reusable semantics and turns
lens categories into a color taxonomy. It contradicts the system's sparse
signal rule and makes the active palette feel busier than the primitive palette
actually is.

## Key decisions

- **One deployment, one colorway:** Terra, Sage, and Sky are alternate mappings
  for the same semantic roles, not simultaneous interface categories.
- **Terra by default:** a clean clone, an unannotated page, and the Figma
  semantic collection all resolve to Terra first.
- **Stable semantic roles:** `accent.field`, `accent.default`,
  `accent.hover`, and `accent.strong` describe jobs without naming a hue.
- **Focus follows the colorway:** visible focus uses the selected strong accent
  and is checked independently in every colorway.
- **Neutrals carry structure:** surfaces, readable text, and ordinary rules do
  not change with the accent mode.
- **Taxonomies do not become rainbows:** lenses, principles, and content types
  stay legible through words, order, and geometry; they do not receive permanent
  hue identities.
- **A second hue is local evidence:** data series, statuses, or a bounded
  technical figure may introduce another family only when its meaning is
  explicit and the color is not promoted into deployment chrome.

## Success criteria

- Canonical tokens declare Terra, Sage, and Sky colorways with complete mappings
  for every colorway-dependent semantic role.
- Generated CSS makes Terra the fallback and exposes one whole-site colorway
  attribute rather than per-component palette switches.
- Generated Figma mappings and the live semantic collection contain matching
  Terra, Sage, and Sky modes.
- Every declared text, action, and focus contrast passes in every colorway.
- The reference site defaults to Terra and no longer renders a multi-hue lens
  taxonomy.
- The Foundations specimen can preview each whole-site colorway without showing
  those hues as simultaneous interface roles.

## Boundaries

- Do not change Bone or Paper values in this implementation. Their beige-plus-
  orange resemblance to contemporary Anthropic work needs a separate visual
  study tracked in
  [issue #32](https://github.com/chekos/joyful-brutalist-minimalism/issues/32).
- Do not add consumer-product theme architecture or edit consumer repositories.
- Do not require user preference persistence; a deployment chooses a colorway.
  The reference site's switcher is documentation for that deployment choice.
- Keep primitive Terra, Sage, and Sky values available for authored figures and
  future study even when they are not the active colorway.

## Sources

- [Making Software](https://www.makingsoftware.com/)
- [Scaling Monosemanticity](https://transformer-circuits.pub/2024/scaling-monosemanticity/)
- [Design Tokens Community Group format](https://www.designtokens.org/tr/drafts/format/)
- [Figma variables](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables)
- [Carbon themes](https://carbondesignsystem.com/elements/themes/overview/)
- [Implementation issue #31](https://github.com/chekos/joyful-brutalist-minimalism/issues/31)
- [`DESIGN.md`](../../DESIGN.md)
