---
title: "feat: Add the Contextual Marginalia study"
type: feat
status: completed
date: 2026-07-16
origin: docs/brainstorms/2026-07-16-contextual-marginalia-brainstorm.md
---

# Add the Contextual Marginalia study

## Overview

Translate the approved
[brainstorm](../brainstorms/2026-07-16-contextual-marginalia-brainstorm.md)
into repository-owned meaning, an original executable browser study, and
behavioral evidence. The original issue kept tokens, Figma, and consumer
repositories unchanged; issue #24 and Decision 0003 supersede the Figma part of
that boundary through the round-trip parity follow-up.

## Implementation

1. Define Contextual Marginalia and its promotion boundary in `DESIGN.md`.
2. Record the authority decision in `docs/decisions/0002-*.md`.
3. Add a two-annotation reading study to the reference site with a real default
   register and matching note states.
4. Use links, semantic emphasis, and adjacent note content so JavaScript is not
   required for meaning or operation.
5. Reflow all notes into reading order on narrow and print layouts, and remove
   transition movement under reduced motion.
6. Add pointer, keyboard, no-JavaScript, narrow-layout, accessibility, and
   screenshot regression coverage.
7. Capture durable browser evidence and update the reference-site receipt.

## Acceptance criteria

- [x] `DESIGN.md` owns the content, structure, access, and promotion contract.
- [x] Decision 0002 explains the study-before-pattern classification.
- [x] The reference site includes original copy and geometry with explicit
      Making Software provenance.
- [x] Hover and keyboard focus reveal the matching marginal note.
- [x] The register contains only real annotations.
- [x] Narrow, print, no-JavaScript, and reduced-motion states preserve meaning.
- [x] Automated accessibility and browser regression tests pass.
- [x] Original browser delivery adds no token value or consumer-repository
      change. The follow-up verifies existing-token parity and adds the required
      Figma study while Biblioteca remains unchanged.
- [x] Work lands through issue #21, a `codex/` branch, a reviewed PR, clean
      merge, and synced local `main`.
