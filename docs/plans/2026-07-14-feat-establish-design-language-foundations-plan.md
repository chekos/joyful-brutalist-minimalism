---
title: "feat: Establish Joyful Brutalist Minimalism foundations"
type: feat
status: active
date: 2026-07-14
origin: docs/brainstorms/2026-07-14-joyful-brutalist-minimalism-brainstorm.md
---

# Establish Joyful Brutalist Minimalism foundations

## Overview

Create the first complete expression of Joyful Brutalist Minimalism as Sergio's
authored web design practice. The work spans four connected artifacts:
`DESIGN.md`, portable tokens, a Figma foundations/components library, and a
static reference site with coded specimens.

The implementation must preserve the project's founding boundary: this is a
language that consumer sites interpret, not a component dependency they must
all install. The design decisions and rationale originate in the approved
[brainstorm](../brainstorms/2026-07-14-joyful-brutalist-minimalism-brainstorm.md).

## Stakeholders

- **Sergio:** author and primary designer; needs a visual surface he can edit
  directly and an understandable workflow for refining details.
- **Design and coding agents:** need a precise, machine-readable contract plus
  visual references and executable examples.
- **Consumer repositories:** may borrow tokens, principles, or patterns while
  retaining product-specific semantics and implementations.
- **Visitors:** should be able to understand and experience the design language
  through the reference site.

## Discovery findings

### Repository and Figma baseline

- Public repository: `chekos/joyful-brutalist-minimalism`.
- Figma file: [Joyful Brutalist Minimalism](https://www.figma.com/design/T4jEmsyQBURKMr6s3zYfFJ).
- The Figma file begins with one empty page, no variables, no local styles, and
  no components.
- The authenticated Figma account has one eligible Pro team and a full seat.
- Material 3 and Figma Simple Design System are subscribed, but they are
  structural references rather than the visual source for this authored system.
- Sergio's accessible `Mira Mira — Design System` library contains relevant
  precedents: Paper, Plate, Kicker, Field Button, Stamp, serif and mono text
  styles, a 20/100 notebook grid, and bone/ink/terra/sage roles.

### Source-language convergence

The strongest shared patterns across soyserg.io, Biblioteca, and Mira Mira are:

- Paper grounds, subtle grids, hard rules, and low or zero radii.
- Near-black ink, warm off-white paper, and a sparse earthy accent.
- Editorial serif reading type paired with compact technical notation.
- Indexes, folios, ledgers, captions, and explicit provenance.
- Offset or inset paper shadows that suggest physical artifacts without
  skeuomorphic decoration.
- Motion between roughly 140–500ms, using quick fades and a more expressive
  `cubic-bezier(.2, .75, .25, 1)` for spatial reveal.
- Comprehensive reduced-motion fallbacks.
- Delight that is attached to meaning: paper pressure, stamps, content-derived
  ruler marks, and caption reveals.

No relevant `docs/solutions/` knowledge base exists in the three repositories.
Local product code and Figma precedents are therefore the primary evidence.
External best-practice research is unnecessary for this initial authored scope.

## Source-of-truth architecture

| Concern | Canonical artifact | Verification |
| --- | --- | --- |
| Principles, vocabulary, judgment | `DESIGN.md` | Editorial review against the approved brainstorm |
| Portable named values | `tokens/jbm.tokens.json` | Schema validation and generated CSS parity |
| Visual decisions and composability | Figma variables, styles, components, and studies | Programmatic inspection plus screenshots |
| Browser behavior | Reference site | Static build, accessibility checks, and browser tests |
| Active work and unresolved adoption | GitHub issues | Linked PRs and acceptance checklists |

## Proposed v1 foundations

These values are the discovery checkpoint proposal. Do not write them into
Figma until the checkpoint is approved.

### Color roles

| Primitive family | Evidence | Semantic uses |
| --- | --- | --- |
| Bone / Paper | `#fffef9`, `#f5f1e8`, `#ebe4d5` across consumer sites | Page, raised paper, quiet paper |
| Ink | `#0a0a0a`, `#161514`, `#2a2a2a` | Primary text, hard rule, secondary text |
| Terra | `#a94229`, `#b54724`, `#d7653d` | Action, current state, focus, sparse emphasis |
| Sage | `#5f7057` and translucent derivatives | Quiet metadata, grid, secondary signal |
| Sky | `#a7d8de` and darker accessible derivative | Informational diagrams and alternate annotations |

Semantic variables should alias primitives. Product-specific names such as
`ember` or `terracotta` can remain consumer aliases rather than becoming the
only vocabulary of the core language.

### Typography roles

| Role | Proposed v1 specimen | Behavior |
| --- | --- | --- |
| Editorial | Source Serif 4 | Long reading, display, headings, quotes; warm and legible |
| Instrument | IBM Plex Mono | Kicker, index, measure, provenance, controls; compact and tabular |
| System fallback | Native UI sans | Dense utility UI when a mono face harms readability |

The core contract uses role names, not mandatory font families. Biblioteca's
Newsreader + Instrument Sans pairing remains compliant because it preserves the
same editorial/instrument relationship.

### Geometry and motion

- Spacing follows a 4px base with a deliberately small named scale.
- Rules use 1px for ordinary structure and 2px for hard emphasis.
- Radius defaults to 0; 1–2px is permitted for paper artifacts; circles must
  encode a genuine ring, point, seal, or control.
- Shadows are crisp offsets or subtle paper elevation, never soft dashboard
  decoration.
- Fast state change: 140–180ms ease.
- Explanatory reveal: 320–500ms using `cubic-bezier(.2, .75, .25, 1)`.
- Reduced motion removes transforms, clipping, and smooth scrolling while
  preserving content and state.

## Proposed v1 components and studies

Build components one at a time, inspecting and validating each before starting
the next.

| Asset | Type | Purpose | Source precedent |
| --- | --- | --- | --- |
| Ground | Component | Paper plus optional 20/100 notebook grid | soyserg.io, Mira Mira Paper |
| Kicker | Component set | Technical eyebrow with tone variants | All three sources |
| Rule | Component set | Separator, measure, and emphasized rule | soyserg.io and Biblioteca |
| Index Row | Component set | Number, title, description, and state | Personal-site ledgers and Biblioteca catalog |
| Plate | Component | Bounded paper artifact with restrained offset/elevation | Personal artifacts, Biblioteca reader, Mira Mira Plate |
| Action Link | Component set | Text-first action with arrow/bracket treatments and interaction states | soyserg.io links and Biblioteca actions |
| Figure Caption | Component set | Figure number, explanation, and optional provenance | Biblioteca system map and personal artifacts |
| Technical Figure | Composed study | Demonstrate rules, labels, grid, real concepts, and caption | Biblioteca GuideSystemMap |
| Reading Instrument | Pattern study | Demonstrate real-content measurement and explanatory motion | Biblioteca ReadingRuler and Making Software ruler |

The Reading Instrument remains a study until at least two genuinely different
documents prove a stable reusable contract.

## Implementation phases

### Phase 1 — Constitution and portable foundations

- Write `DESIGN.md` from the approved brainstorm, including principles,
  vocabulary, foundations, composition, imagery, motion, accessibility,
  agent-facing decision rules, and anti-patterns.
- Create `tokens/jbm.tokens.json` using the Design Tokens Community Group shape.
- Add an explicit mapping from repository tokens to Figma variable names and
  CSS custom properties.
- Generate or maintain `src/styles/tokens.css` from the canonical token file;
  do not create two independently edited token sources.
- Document provenance for values synthesized from consumer repositories.

### Phase 2 — Figma foundations and components

- Create pages in order: `00 Cover`, `01 Principles`, `02 Foundations`,
  `03 Components`, `04 Patterns`, and `05 Studies`.
- Add primitive and semantic variable collections with deliberate scopes and
  web code syntax.
- Add text and effect styles after verifying the selected fonts are available.
- Build the seven v1 components sequentially with auto layout, exposed text or
  boolean properties, token bindings, descriptions, and usage examples.
- Build Technical Figure and Reading Instrument studies from instances of the
  foundations/components where practical.
- Keep a run ledger during Figma mutations and save a version-history checkpoint
  after foundations and after components.

### Phase 3 — Executable reference site

- Scaffold a static Astro site with vanilla CSS and TypeScript; avoid a runtime
  component framework unless a specimen proves it necessary.
- Build one coherent page rather than a generic Storybook catalog.
- Include the founding thesis, foundations, components in context, the
  Technical Figure, and the Reading Instrument.
- Implement responsive compositions, keyboard operation, visible focus,
  semantic HTML, progressive enhancement, and reduced-motion behavior.
- Include provenance links and make `DESIGN.md`, tokens, and Figma discoverable.
- Keep the site framework-neutral from the consumer's perspective.

### Phase 4 — Verification and adoption contract

- Validate token schema and CSS parity.
- Run formatting, type checking, static build, and browser regression tests.
- Test representative desktop, mobile, keyboard-only, and reduced-motion flows.
- Programmatically inspect Figma page names, variable collections, styles,
  component sets, bindings, and variant counts.
- Capture Figma screenshots for visual QA of foundations, components, and both
  studies.
- Add agent-facing adoption instructions: how to read the language, choose a
  pattern, translate it to a consumer repo, and document intentional divergence.
- Publish the static site only after the local specimen and Figma library agree
  at the semantic level.

## User-flow analysis

### Authoring flow

1. Sergio opens Figma and changes a visual decision or explores an alternative.
2. The experiment remains a study until it is named and accepted.
3. If accepted, the corresponding semantic decision is reflected in
   `DESIGN.md` or tokens as appropriate.
4. The coded specimen proves the behavior under browser constraints.
5. A version note records the material change and its rationale.

### Agent adoption flow

1. An agent reads `DESIGN.md` before designing a consumer surface.
2. It identifies the content function and chooses relevant foundations or
   patterns rather than copying a whole composition.
3. It inspects Figma for visual intent and the reference site for behavior.
4. It implements within the consumer repo's framework and semantics.
5. It verifies accessibility and records meaningful divergence.

### Visitor flow

1. A visitor reaches the reference site and understands the thesis without
   needing design-system expertise.
2. They encounter principles through real specimens rather than token tables
   alone.
3. Pointer, keyboard, mobile, and reduced-motion contexts preserve the same
   information and actions.
4. They can inspect the design constitution, Figma source, and tokens.

## Failure and edge cases

- **Figma and code differ:** name the kind of conflict and resolve it in the
  owning artifact; never overwrite silently.
- **A font is unavailable:** preserve the typography role and metrics, record
  the substitute, and avoid hard failure.
- **Motion is disabled:** reveal all content immediately and retain focus,
  progress, and current-state indicators.
- **JavaScript is unavailable:** the page remains readable and navigable; an
  instrument may become a static index.
- **A consumer wants one pattern only:** document the minimum semantic contract
  and allow a local implementation.
- **A product-specific motif appears reusable:** require evidence from a second
  context before promotion.
- **Token changes would alter existing products:** do not propagate
  automatically; open consumer-specific work with visual verification.
- **Figma library publishing is unavailable:** keep the file editable and use
  direct links; publishing is an enhancement, not a blocker to v1.

## Acceptance criteria

### Documentation

- [ ] `DESIGN.md` expresses all approved brainstorm principles and vocabulary.
- [ ] Authority boundaries and conflict-resolution rules are explicit.
- [ ] Anti-patterns include decorative pseudo-data, gratuitous brutalism,
  effect stacking, and mechanical cross-repo synchronization.

### Tokens

- [ ] One canonical platform-neutral token file exists.
- [ ] Every Figma variable and CSS custom property maps back to a canonical name.
- [ ] Color contrast for text and interactive states meets WCAG AA.
- [ ] Motion tokens include a reduced-motion contract.

### Figma

- [ ] Required pages, collections, styles, components, and studies exist.
- [ ] Components use auto layout and bound variables rather than unexplained
  hardcoded values.
- [ ] Variant properties are understandable to a non-designer.
- [ ] Foundations, components, and studies pass screenshot review.

### Reference site

- [ ] Static build succeeds without a client framework dependency.
- [ ] The page works at mobile and desktop widths.
- [ ] Keyboard, focus, pointer, reduced-motion, and no-JavaScript behavior are
  intentionally designed.
- [ ] The Technical Figure encodes a real concept and the Reading Instrument is
  derived from real page content.

### Durability

- [ ] GitHub issue and pull requests link the brainstorm, plan, Figma file, and
  deployed specimen.
- [ ] Implementation is committed, pushed, reviewed, and merged with a clean
  local `main`.
- [ ] Consumer repositories remain untouched unless separately authorized.

## Dependencies and deferred decisions

- The checkpoint must approve the proposed color synthesis and typography roles
  before Phase 1 writes tokens or Phase 2 writes Figma variables.
- Documentation, code, and visual asset licenses require a separate explicit
  choice before encouraging third-party reuse.
- A permanent custom domain and hosting provider are deferred until the local
  reference site is proven.
- Publishing the Figma file as a team library is desirable but not required for
  the initial editable source.

## Sources and references

- **Origin brainstorm:**
  [docs/brainstorms/2026-07-14-joyful-brutalist-minimalism-brainstorm.md](../brainstorms/2026-07-14-joyful-brutalist-minimalism-brainstorm.md)
- [Making Software — How to Make a Font](https://www.makingsoftware.com/chapters/how-to-make-a-font)
- [soyserg.io design foundations](https://github.com/chekos/soyserg.io/blob/deeef5e/app/globals.css)
- [Biblioteca document architecture](https://github.com/chekos/bns-pub/tree/6ca3bfd/src/components)
- [Biblioteca design foundations](https://github.com/chekos/bns-pub/blob/6ca3bfd/src/styles/global.css)
- [Joyful Brutalist Minimalism in Figma](https://www.figma.com/design/T4jEmsyQBURKMr6s3zYfFJ)
