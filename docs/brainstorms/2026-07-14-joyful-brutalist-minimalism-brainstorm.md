---
title: Joyful Brutalist Minimalism as an authored design practice
date: 2026-07-14
status: approved
---

# Joyful Brutalist Minimalism as an authored design practice

## Founding decision

Joyful Brutalist Minimalism is Sergio's public, authored design language for
the web: documented in prose, explored in Figma, and proven through coded
specimens—without requiring every project to import the same components.

The project is not primarily a cross-repository component library. It gives
Sergio a place to understand, articulate, and refine his own approach to web
design. Consumer sites remain independent interpretations of the language.

## Why this form

The design language needs three complementary forms because each is optimized
for a different kind of work:

| Form | Authority | What it makes possible |
| --- | --- | --- |
| `DESIGN.md` | Meaning and judgment | Agents and people can understand the principles, vocabulary, boundaries, and reasons behind decisions. |
| Figma | Visual representation | Sergio can directly manipulate type, space, color, composition, components, and studies. |
| Reference site | Browser behavior | Responsive layout, motion, focus, reduced motion, and interaction can be experienced rather than described. |
| Tokens | Portable named values | Visual decisions can cross into code without imposing one framework or component implementation. |

These forms should remain bridgable, not mechanically identical. A conflict is
resolved in the form that owns the disputed concern.

## Recurring evidence

The language already exists in practice. The new project should identify and
codify what recurs instead of inventing a brand from zero.

| Recurring idea | soyserg.io | Biblioteca | Mira Mira design system |
| --- | --- | --- | --- |
| Paper as a working surface | Bone page, 20/100 sage notebook grid, paper-pressure shading | Paper/deep-paper surfaces, document sheet, inset paper shadow | `Paper` and `Plate` components; bone ground and offset shadow |
| Ink plus a warm signal | Noir/graphite with terracotta | Ink/ink-soft with ember | Ink, terra, sage color roles |
| Editorial voice plus technical notation | Source Serif 4 with mono metadata and folios | Newsreader with Instrument Sans utility labels | Serif hierarchy with mono kicker, tag, button, and ring styles |
| Hard structure | One- and two-pixel rules, ledgers, records, indexes | Document shell, content rails, rules, maps, ruler marks | Radius-zero plates, field controls, stamps |
| Inspectability | Evidence records, route metrics, workbench provenance | Content-derived reading map, real progress, version and artifact metadata | Field vocabulary and explicit component descriptions |
| Useful delight | One Delight Rule, paper-pressure field, ink studies | Caption reveal, semantic ruler motion, technical diagram | Stamps, notebook ground, tactile offset shadows |

## Design thesis

Joyful Brutalist Minimalism treats a page as a working surface rather than a
neutral container. Structure should be visible enough to understand. Delight
should make that structure easier to perceive, remember, or use.

The tension is intentional:

- **Brutalist / joyful:** direct forms gain warmth, tactility, humor, or surprise.
- **Minimal / information-rich:** few visual systems can still encode meaningful detail.
- **Editorial / technical:** expressive reading typography coexists with precise labels, measures, and diagrams.
- **Authored / reusable:** the language is recognizably Sergio's while remaining adaptable to different products.

## Principles

1. **Make structure honest.** Geometry must carry information, expose an action,
   clarify hierarchy, or improve use.
2. **Make the work inspectable.** Measurements, progress, indexes, diagrams, and
   status should be derived from real content or state.
3. **Treat joy as function.** Warmth and delight count when they improve clarity,
   attention, memory, or emotional ease.
4. **Pair editorial warmth with technical precision.** Reading and measurement
   should feel like parts of the same artifact.
5. **Use one delight at a time.** A composition gets one coordinated playful
   system, not a pile of unrelated effects.
6. **Animate explanation, not decoration.** Motion should reveal relationship,
   progress, hierarchy, or cause and effect.
7. **Design each medium intentionally.** Figma, browser, print, and consumer
   products translate the language according to their own constraints.
8. **Preserve an escape hatch.** Focus, keyboard use, mobile layouts, low-power
   contexts, and reduced motion are part of the design rather than exceptions.

## Working vocabulary

- **Ground:** the paper-like field on which the page is composed.
- **Rule:** a line that separates, measures, connects, or exposes hierarchy.
- **Kicker:** compact technical context that orients the reader before the main voice.
- **Index:** numbering that creates location, order, or cross-reference.
- **Ledger:** a repeated set of inspectable records.
- **Plate:** a bounded paper surface holding one coherent artifact.
- **Figure:** an image or diagram with a meaningful caption and provenance.
- **Instrument:** an interface whose geometry represents real content or state.
- **Marginalia:** secondary evidence, annotation, or delight attached to primary content.
- **Signal:** the sparse accent that marks action, state, or attention.

This vocabulary is semantic. It should outlive any particular CSS class or
component framework.

## V1 scope

V1 establishes a compact but complete vertical slice:

- A durable `DESIGN.md` with principles, vocabulary, foundations, motion,
  accessibility, agent instructions, and anti-patterns.
- Platform-neutral color, spacing, rule, radius, shadow, and motion tokens with
  a CSS translation.
- A Figma file with documented foundations and a small set of distinctive
  primitives: Ground, Kicker, Rule, Index Row, Plate, Action Link, and Figure
  Caption.
- Two composed studies: a technical Figure and an inspectable Reading
  Instrument. The latter is a pattern study, not yet a universal component.
- A small reference site where the same decisions are tested in a real browser.
- Adoption guidance that teaches agents how to interpret the language without
  copying a whole site or forcing a package dependency.

## Non-goals

- A comprehensive catalog of generic application controls.
- A React, Astro, or Web Components package that all sites must consume.
- Automatic synchronization into soyserg.io, Biblioteca, or Mira Mira.
- Rebranding existing products so they look identical.
- Copying Making Software's diagrams, source code, or exact animations.
- Publishing a stable public package before the language has been proven by the
  reference specimens.

## Decisions to resolve at the discovery checkpoint

The existing sources intentionally disagree on exact font families and color
values. The library should not silently declare one product the winner.

1. **Typography implementation:** use role names (`Editorial`, `Instrument`)
   everywhere, with Source Serif 4 + IBM Plex Mono proposed for the v1 specimen.
   Newsreader + Instrument Sans remains a valid Biblioteca interpretation.
2. **Color synthesis:** define a small shared primitive family around Bone,
   Paper, Ink, Terra, Sage, and Sky, then give consumer sites semantic aliases.
3. **Licensing:** keep the public repository unlicensed until documentation,
   code, and visual-asset licensing are chosen deliberately.
4. **Hosting:** build a static reference site first; choose the permanent domain
   and hosting destination after the specimen is useful locally.

## Success criteria

- Sergio can edit the Figma components and studies directly without breaking
  their basic structure.
- An agent can read `DESIGN.md` and produce a composition that follows the
  language without being shown a consumer site's source code.
- Figma token names, repository token names, and CSS custom properties have an
  explicit mapping.
- The reference site demonstrates responsive, keyboard, focus, hover, and
  reduced-motion behavior.
- At least one technical figure contains real concepts rather than decorative
  pseudo-data.
- Consumer projects can adopt individual principles or patterns without
  importing a package or becoming visually identical.

## Sources

- [Making Software — How to Make a Font](https://www.makingsoftware.com/chapters/how-to-make-a-font)
- [soyserg.io design foundations](https://github.com/chekos/soyserg.io/blob/deeef5e/app/globals.css)
- [soyserg.io agent design guidance](https://github.com/chekos/soyserg.io/blob/deeef5e/AGENTS.md)
- [Biblioteca document architecture](https://github.com/chekos/bns-pub/tree/6ca3bfd/src/components)
- [Biblioteca design foundations](https://github.com/chekos/bns-pub/blob/6ca3bfd/src/styles/global.css)
- [Joyful Brutalist Minimalism in Figma](https://www.figma.com/design/T4jEmsyQBURKMr6s3zYfFJ)
- `Mira Mira — Design System`, discovered through Sergio's subscribed Figma libraries on 2026-07-14
