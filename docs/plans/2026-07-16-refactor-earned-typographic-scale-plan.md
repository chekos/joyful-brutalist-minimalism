---
title: "Refactor: Earn typographic scale and preserve functional asymmetry"
type: refactor
status: completed
date: 2026-07-16
---

# Refactor: Earn typographic scale and preserve functional asymmetry

## Overview

Recalibrate the current Joyful Brutalist Minimalism visual specimen so display
type earns its size through hierarchy or comprehension instead of acting as a
default style. Preserve asymmetric composition only where it makes a real
content relationship, navigation state, or medium-specific distinction easier
to understand.

This plan carries forward Sergio's accepted judgment that unnecessarily large
type is not a JBM principle, is not useful delight, and should not survive merely
because it leaked into the current specimen. The existing Plate grid is not a
target of this work.

## Existing authority

`DESIGN.md` already establishes the governing test:

- visible geometry must carry information, expose an action, clarify hierarchy,
  or make behavior easier to perceive;
- delight must improve clarity, attention, memory, or ease; and
- brutalism does not mean enormous type by default.

The work therefore clarifies and applies existing meaning rather than inventing
a new aesthetic direction. A numbered decision record is only necessary if the
assessment changes that meaning or the ownership boundaries among `DESIGN.md`,
Figma, tokens, and the browser.

## Assessment method

Inventory every materially enlarged display treatment and every visibly offset
composition in the current Figma file and reference site. For each instance,
record:

1. the content or interaction role it serves;
2. what becomes harder to understand if the treatment is removed;
3. whether typeface, weight, measure, spacing, or placement can express the same
   hierarchy with less scale;
4. whether the composition remains coherent at representative desktop, tablet,
   mobile, 200% zoom, and long-content conditions; and
5. which source of truth owns the correction.

Apply a reduction test: compare the current treatment with restrained variants.
If the meaning, hierarchy, and experience remain intact after the type is made
substantially smaller, classify the original scale as unearned. The test should
be comparative and visual; it should not establish one universal numeric ceiling
for all future JBM work.

For asymmetry, distinguish a functional offset from a decorative one. Examples
worth testing include the real reading rail, the title/thesis split, and Figma's
editorial-versus-technical grouping. Retain an offset only when the unequal
placement makes that relationship more legible.

## Work sequence

### 1. Assess and codify earned scale

- Inventory Figma text styles, frames, and reference-site selectors that create
  dominant display moments.
- Compare restrained alternatives and document which relationships survive.
- Add a concise earned-scale selection test to `DESIGN.md` if the existing
  wording is not operational enough.
- Add an `unearned-scale` smell to the taste-evaluation rubric while keeping
  `dominant-display-hero` a neutral motif. Large type may be valid in a specific
  brief; recurrence without a job is the smell.
- Record the accepted classifications and route each correction to Figma,
  browser behavior, or portable tokens.

### 2. Recalibrate Figma visual representation

- Create a clearly named study before changing committed visual decisions.
- Reduce unearned scale across the cover, principles, foundations, components,
  patterns, and studies wherever the audit finds it.
- Preserve functional asymmetry and the Plate grid.
- Inspect wrapping, hierarchy, rhythm, and evidence density across the relevant
  frames.
- Save a version-history checkpoint and update the inspection evidence without
  claiming that browser responsiveness belongs to Figma.

### 3. Recalibrate reference-site browser behavior

- Reduce the hero title, thesis, section headings, quotation specimen, and any
  other audit findings that rely on scale without adding meaning.
- Remove full-viewport staging or empty-space pressure that exists chiefly to
  support monumental type.
- Preserve the functional reading rail and retain the title/thesis split only if
  it continues to clarify two distinct editorial roles.
- Keep semantic order, actions, the Plate grid, and content intact.
- Verify responsive hierarchy at representative widths, 200% zoom, long content,
  keyboard use, reduced motion, and no JavaScript.

## Boundaries

- Do not turn the external article's blacklist into JBM doctrine.
- Do not ban large type categorically. Require it to earn its scale in the
  specific composition.
- Do not change the Plate grid as part of this work.
- Do not flatten every composition into centered or equal columns.
- Do not introduce portable size tokens unless the assessment proves a reusable
  cross-medium value.
- Do not edit consumer repositories.
- Do not silently synchronize Figma and the browser; resolve each finding in the
  authority that owns it and document the translation.

## Acceptance criteria

- [x] The current Figma and browser specimens have a complete inventory of
      dominant display treatments and meaningful offsets.
- [x] Every retained large-scale treatment and offset has a stated content,
      hierarchy, state, or interaction function.
- [x] The assessment distinguishes neutral motifs from the `unearned-scale`
      smell and does not impose a generic blacklist.
- [x] The Plate grid remains unchanged unless separately authorized.
- [x] Figma contains approved restrained-scale visual decisions and the verified
      `jbm_dsb/checkpoint_earned_scale` connector checkpoint. Named version
      history remains unavailable to the remote runtime and is documented as a
      manual Figma action.
- [x] The reference site no longer uses monumental scale or viewport staging as
      a default compositional shortcut.
- [x] Desktop, tablet, mobile, 200% zoom, long-content, keyboard, reduced-motion,
      and no-JavaScript verification preserve meaning and actions.
- [x] Automated repository checks and browser tests pass, with before/after
      screenshots attached to the implementation pull request.
- [x] No consumer repository is changed.

## Outcome

The inventory retained Figma's 64px cover and page headings because they orient
distinct 1440px reference canvases; component-section names remain subordinate
at 36px. The browser hero remains its sole display moment. Its thesis, support
copy, section headings, Plate headings, and typography quotation now pass the
reduction test, while the full-viewport staging and decorative empty-space
pressure are gone.

The sticky rail remains a functional asymmetric navigation surface, but its
viewport-derived progress and active-row animation were removed. The Figma
Principle Index now labels its bars as real lens counts, and the new Earned Scale
study records the rejected 48px treatment beside the accepted 32px composition.
No portable value, component set, Plate variant, or consumer repository changed.

## Issue structure

The GitHub issue graph is the active sequencing surface:

1. [#25 — assess and codify earned scale and functional asymmetry](https://github.com/chekos/joyful-brutalist-minimalism/issues/25);
2. [#26 — recalibrate the committed Figma visual representation](https://github.com/chekos/joyful-brutalist-minimalism/issues/26); and
3. [#27 — recalibrate and verify the reference-site browser implementation](https://github.com/chekos/joyful-brutalist-minimalism/issues/27).

The child issues depend on the assessment. The browser issue should use the
approved Figma checkpoint as visual intent while preserving medium-specific
responsive behavior.

## Sources and references

- `DESIGN.md` composition, geometry, delight, and pattern-promotion rules
- `src/styles/site.css` current reference-site typography and composition
- `src/pages/index.astro` current semantic structure
- `evals/taste-v0/rubric.json` motif and smell vocabulary
- [Joyful Brutalist Minimalism in Figma](https://www.figma.com/design/T4jEmsyQBURKMr6s3zYfFJ)
- [Taste evaluation implementation issue #19](https://github.com/chekos/joyful-brutalist-minimalism/issues/19)
- [Taste evaluation pull request #20](https://github.com/chekos/joyful-brutalist-minimalism/pull/20)
