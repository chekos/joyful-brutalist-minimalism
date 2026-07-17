---
title: "feat: Make JBM colorways deployment-scoped"
type: feat
status: completed
date: 2026-07-16
origin: docs/brainstorms/2026-07-16-jbm-colorway-model-brainstorm.md
---

# Make JBM colorways deployment-scoped

## Overview

Implement the approved
[colorway model](../brainstorms/2026-07-16-jbm-colorway-model-brainstorm.md)
across the meaning, token, Figma, and browser authorities. Terra remains the
default; Sage and Sky become alternate whole-deployment mappings. The work is
tracked in
[issue #31](https://github.com/chekos/joyful-brutalist-minimalism/issues/31),
with the Paper/Bone reassessment isolated in
[issue #32](https://github.com/chekos/joyful-brutalist-minimalism/issues/32).

## Problem statement

JBM's primitive palette is useful, but the active semantic palette currently
assigns Terra, Sage, and Sky to concurrent actions, focus, signals, rules,
lenses, and figures. That makes palette names part of component contracts and
creates more chromatic hierarchy than the language's sparse-signal principle
can support.

## Proposed solution

### Meaning and decision record

Update `DESIGN.md` so the shared grammar, deployment colorway, local second-hue
exception, and selection criteria are explicit. Record the new portability and
ownership boundary in decision 0004.

### Canonical tokens and generated artifacts

Replace `action.*` and palette-named `signal.*` semantics with
`accent.field`, `accent.default`, `accent.hover`, and `accent.strong`. Add a
JBM extension that declares Terra, Sage, and Sky mode aliases and Terra as the
default. Make focus follow the strong accent and make quiet rules neutral.

Extend generation and validation so:

- CSS emits the Terra fallback plus `data-jbm-colorway` overrides;
- Figma mappings expose the same mode aliases;
- token references document the colorway matrix; and
- contrast and completeness checks run for every mode.

### Reference site

Set the document's deployment colorway to Terra. Remove lens-specific hue
assignments, consume only stable accent semantics, and add an accessible
Foundations control that previews one whole-site colorway at a time. The
control is documentation, not a consumer preference system, and default content
remains complete without JavaScript.

### Figma reconciliation

Preserve the existing twelve semantic variable identities where possible:

- rename Action/Default and Action/Hover to Accent/Default and Accent/Hover;
- migrate existing signal consumers to Accent/Strong;
- repurpose the old signal variables as Accent/Field and Accent/Strong;
- rename the Default mode to Terra and add Sage and Sky;
- populate every semantic variable in all three modes; and
- update Foundations labels, syntax, bindings, and explanatory copy.

Audit every page after the migration, capture updated visual evidence, and
refresh the repository inspection receipt and sync manifest.

## User flows

### Choose a deployment colorway

1. A consumer adopts JBM's semantic tokens.
2. It accepts the Terra fallback or sets `data-jbm-colorway` to `sage` or
   `sky` at the deployment root.
3. Actions, strong accents, fields, and focus change together.
4. Surfaces, text, rules, type, geometry, and motion remain shared.

### Preview the language

1. The reference site loads in Terra without depending on JavaScript.
2. A reader reaches the Foundations colorway control.
3. Selecting Sage or Sky changes the entire specimen and pressed-state
   announcement.
4. Only one colorway is active at a time.

## Failure and edge cases

- A missing colorway value for any required token fails validation.
- An unknown colorway attribute falls back to Terra because the root aliases
  remain Terra.
- Sage and Sky have no separate mid-tone hover primitive; their hover alias
  remains the accessible dark value while geometry and underline changes carry
  the interaction state.
- A pale field value is never used as readable text or a focus indicator.
- Primitive palette documentation may show all source colors together; product
  chrome and category taxonomies may not.
- Existing Figma bindings to old Signal variables must be migrated before a
  variable is repurposed as the pale Accent/Field role.

## Acceptance criteria

- [x] `DESIGN.md` and decision 0004 define the deployment-scoped colorway rule.
- [x] Canonical tokens contain no palette family names in semantic token paths.
- [x] Terra is the canonical, generated CSS, browser, and Figma default.
- [x] Sage and Sky provide complete alternate mappings for every
      colorway-dependent semantic token.
- [x] All declared text, action, and focus contrast pairs pass for all three
      colorways.
- [x] Generated CSS, Figma mapping JSON, and token reference remain
      deterministic and current.
- [x] The reference site uses one colorway at a time and no longer encodes lens
      categories with multiple hues.
- [x] The colorway preview is keyboard operable, announces state, and leaves
      the no-JavaScript page complete in Terra.
- [x] Live Figma variables, modes, components, documentation, and specimens
      match the repository contract without broken bindings.
- [x] Sync inspection, screenshots, manifest, and publication receipts are
      refreshed.
- [x] `npm run verify` and the DTCG schema check pass.
- [x] Work lands through a `codex/` branch, reviewed PR, clean merge, Pages
      deployment, live smoke test, and synced local `main`.
- [x] Issue #31 closes with evidence while issue #32 remains open for the
      independent Paper/Bone study.

## Risks and mitigations

- **Mode support:** Figma plan limits could prevent multiple modes. Discover
  and add modes before dependent documentation work; stop on an actual plan
  error rather than simulating parity.
- **Unreadable repurposed bindings:** old Signal variables are used for text
  and rules. Rebind their consumers to Accent/Strong before assigning a pale
  field value.
- **Color as the only interaction cue:** Sage and Sky reuse their accessible
  dark value for hover. Preserve underline, padding, and background changes so
  hover is not color-only.
- **A reference-site theme toy:** label the control as deployment preview,
  change the whole document, avoid persistence, and keep it out of the site
  mast.
- **Anthropic resemblance remains:** keep Paper/Bone values explicitly out of
  scope and use issue #32 for a content-diverse visual review after this
  semantic migration lands.

## Sources and references

- **Origin brainstorm:**
  [JBM colorway model](../brainstorms/2026-07-16-jbm-colorway-model-brainstorm.md)
- [Implementation issue #31](https://github.com/chekos/joyful-brutalist-minimalism/issues/31)
- [Paper/Bone study #32](https://github.com/chekos/joyful-brutalist-minimalism/issues/32)
- [`DESIGN.md`](../../DESIGN.md)
- [`SYNC.md`](../../SYNC.md)
- [`tokens/jbm.tokens.json`](../../tokens/jbm.tokens.json)
- [`src/pages/index.astro`](../../src/pages/index.astro)
