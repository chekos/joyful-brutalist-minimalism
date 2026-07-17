# 0004 — Colorways are deployment-scoped

- Status: accepted
- Date: 2026-07-16
- Issue: https://github.com/chekos/joyful-brutalist-minimalism/issues/31
- Owning authority: `DESIGN.md` and `tokens/jbm.tokens.json`

## Context

JBM's primitive Terra, Sage, and Sky families are useful source material, but
the original semantic layer assigned all three to concurrent interface roles.
That made palette names part of reusable component contracts, colored content
taxonomies by default, and contradicted the constitution's sparse-signal rule.

The durable question is not whether the primitive palette should lose colors.
It is where a deployment chooses its color story and which concerns remain
shared across deployments.

## Decision

JBM is the shared grammar; each deployment chooses one colorway. Terra is the
default colorway, with Sage and Sky as alternate mode mappings for the stable
semantic roles `accent.field`, `accent.default`, `accent.hover`, and
`accent.strong`. Focus follows the selected strong accent.

Paper surfaces, readable ink, ordinary rules, typography, geometry, and motion
remain shared. A second hue may appear only inside a bounded figure, data
visualization, or status system with an explicit semantic job. It does not
become simultaneous deployment chrome or a permanent content taxonomy.

The canonical token extension owns portable colorway names and aliases. Figma
represents them as modes in the `JBM Semantics` collection. The browser uses a
single root `data-jbm-colorway` attribute, with Terra aliases as the fallback.

## Consequences

Components consume semantic accent roles and can move between colorways without
renaming or palette-specific props. The same deployment cannot use Terra for
actions, Sage for one content category, and Sky for another merely to create
variety.

Primitive families remain available for documentation, exploration, and
meaningful local figures. Sage and Sky currently reuse their accessible dark
value for default, hover, and strong roles because no separate tested mid-tone
exists; interaction geometry must continue to carry hover state.

Bone and Paper values are intentionally unchanged. Their resemblance to a
common beige-plus-orange AI aesthetic is tracked separately in issue #32.

## Evidence

- Approved rationale:
  `docs/brainstorms/2026-07-16-jbm-colorway-model-brainstorm.md`
- Implementation and verification:
  `docs/plans/2026-07-16-feat-jbm-colorway-modes-plan.md`
- Implementation pull request:
  https://github.com/chekos/joyful-brutalist-minimalism/pull/33
- Live parity receipt:
  `docs/figma/v1/inspection.json`
- Browser evidence:
  `docs/reference-site-v1.md`
