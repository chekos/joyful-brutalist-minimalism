# Reference site v1 inspection receipt

The static [Astro browser specimen](../src/pages/index.astro) interprets the
repository-owned constitution, canonical tokens, and committed
[Figma library](https://www.figma.com/design/T4jEmsyQBURKMr6s3zYfFJ) as one
coherent page. It fulfills
[issue #6](https://github.com/chekos/joyful-brutalist-minimalism/issues/6)
and is reviewed in
[pull request #9](https://github.com/chekos/joyful-brutalist-minimalism/pull/9)
without creating a client component framework or changing a consumer repository.
The deployment-scoped colorway implementation is tracked in
[issue #31](https://github.com/chekos/joyful-brutalist-minimalism/issues/31)
and
[pull request #33](https://github.com/chekos/joyful-brutalist-minimalism/pull/33);
the separate Paper/Bone review remains open in
[issue #32](https://github.com/chekos/joyful-brutalist-minimalism/issues/32).

Its authoritative inputs are [`DESIGN.md`](../DESIGN.md),
[`tokens/jbm.tokens.json`](../tokens/jbm.tokens.json), the generated
[`src/styles/tokens.css`](../src/styles/tokens.css), and the
[Figma v1 receipt](figma-v1.md).

## Browser result

- Astro produces one static route with vanilla CSS and a one-line capability
  class for progressive enhancement. There is no React, Vue, Svelte, or other
  client UI runtime.
- The page communicates the founding thesis, all eight principles, portable
  foundations, the seven authored forms, the Technical Figure, the Principle
  Index, and one explicitly unpromoted Contextual Marginalia study in one
  editorial composition.
- Source Serif 4 and IBM Plex Mono are bundled locally so the approved
  Editorial and Instrument roles do not depend on a third-party font request.
- The generated CSS token file remains the only browser value bridge. Site CSS
  consumes its semantic properties rather than defining a parallel palette or
  motion scale.
- The document declares Terra as its one deployment colorway. The Foundations
  preview can switch the whole specimen to Sage or Sky without persisting a
  user preference or mixing palette families inside the interface taxonomy.

## Deployment colorways

The root `data-jbm-colorway` attribute selects one complete semantic accent
mapping. Terra is both the explicit reference-site default and the generated
fallback; Sage and Sky override the same `accent.field`, `accent.default`,
`accent.hover`, `accent.strong`, and `focus.ring` roles. Paper/Bone surfaces,
Ink, neutral rules, typography, geometry, and motion stay shared.

The preview is an accessible documentation control, not a site-wide preference
system. Its three buttons expose one pressed state, update a polite status, and
change the whole specimen. Without JavaScript the control stays hidden and the
complete Terra document remains readable. Unknown attribute values also fall
back to Terra. Lens names and principle indices remain neutral instead of
turning Terra, Sage, and Sky into permanent content categories.

## Content-derived Principle Index

The page defines one eight-item principle dataset. That same dataset renders
the principle ledger, index marks, and lens counts. The index therefore cannot
drift from the prose without changing the source data, and it never pretends to
measure reading progress that the page does not meaningfully expose.

The primary-lens result matches the Figma study:

| Lens | Principles | Count |
| --- | --- | ---: |
| Structure | 01, 02 | 2 / 8 |
| Experience | 03, 05 | 2 / 8 |
| Translation | 04, 06, 07 | 3 / 8 |
| Access | 08 | 1 / 8 |

All eight adjacent marks are ordinary fragment links. They remain readable and
operable without JavaScript, and every mark jumps directly to its principle in
the real ledger. Lens bars in Figma summarize classification counts; the browser
does not reinterpret them as viewport-derived progress.

## Earned scale

The browser applies the reduction test from `DESIGN.md`: when smaller type
preserves hierarchy and comprehension, the larger treatment has no job. The
hero title remains the one true display moment; the thesis, support copy,
section headings, and typography specimen use restrained contextual sizes.
Whitespace now groups the hero's title, thesis, actions, and provenance instead
of staging a full viewport around monumental type. The committed Figma
`Earned scale` study records the comparison without introducing a portable size
token or changing the Plate grid.

## Contextual Marginalia study

The page adds an original two-annotation reading passage informed by the
interaction contract observed in
[Making Software](https://www.makingsoftware.com/chapters/how-to-make-a-font).
The source contributed the useful relationship—an annotated term temporarily
exchanges a side measure for contextual explanation—not reusable wording,
geometry, assets, code, rulers, or exact animation.

The default sidecar is an honest register of the passage's two real notes.
Hovering or focusing either bold, dotted-underlined term exchanges that register
for its matching note. Direct activation targets the same note without
JavaScript. At narrow widths and in print, the register disappears and both
notes flow directly after the passage. Reduced motion makes the exchange
immediate while preserving the state.

Decision 0002 keeps Contextual Marginalia as a named study until a second
genuinely different content context proves a stable contract. The live Figma
file now records the register, active-note, and narrow/print states. Existing
tokens were verified as exact coverage, so no new portable value was added.
No consumer-repository change is implied by the core JBM evidence.

## Authored forms in context

The page uses the seven Figma forms for their documented functions:

| Form | Browser use |
| --- | --- |
| Ground | The warm page field and bounded instrument surface |
| Kicker | Section, source, and evidence orientation |
| Rule | Section hierarchy, measure, and figure connection |
| Index Row | The inspectable eight-principle ledger |
| Plate | Color, type, space, pressure, and figure artifacts |
| Action Link | Explicit source and provenance destinations |
| Figure Caption | Figure identity, explanation, source, and originality note |

## Technical Figure

The original diagram encodes one system through the four owning forms defined
in `DESIGN.md`: meaning, portable values, visual representation, and browser
behavior. Its accepted-change plate states the round-trip rule: change one
owner, reconcile all forms, then verify or document divergence explicitly.
Adjacent text provides the complete non-visual equivalent.

## Semantic agreement and intentional differences

Figma and browser agree on vocabulary, semantic token roles, hard-edged paper
grammar, the four-owner round-trip relationship, Contextual Marginalia's three
representative states, the static principle classification, and the earned-scale
reduction test.
The following differences belong to the browser medium:

- the wide Principle Index becomes a sticky left rail on large screens and a
  horizontal source index on narrow screens;
- the rail remains static because all eight destinations are adjacent; direct
  fragment links expose useful navigation without fake progress;
- visible focus, logical keyboard order, touch behavior, responsive reflow,
  no-JavaScript navigation, and reduced-motion resolution are executable rather
  than visually simulated;
- the document, rail, and narrow mast use square, token-colored authored
  scrollbars instead of dropping an unconsidered system scrollbar into the
  composition; and
- the Technical Figure reflows into a linear two-column or single-column
  explanation on narrow screens while preserving its four owners and center
  rule.

These are intentional translations, not token or meaning disagreements. The
current parity states and node evidence live in
[`docs/sync/manifest.json`](sync/manifest.json).

## Verification

`npm run verify` runs formatting, canonical token validation, generated parity,
Astro type checking, unit tests, the static build, and the Chromium suite. The
browser suite verifies:

- all eight source principles and all seven authored forms;
- content-derived static index links and lens counts;
- Terra as the default deployment colorway, complete whole-site Sage and Sky
  switching, one pressed state, and Terra fallback for unknown values;
- neutral principle-taxonomy cues with no concurrent palette-family encoding;
- keyboard entry and visible focus;
- complete no-JavaScript content and fragment navigation;
- Contextual Marginalia pointer, keyboard, activation, and narrow-layout states;
- reduced-motion duration, state, and reading content;
- exact annotated type roles, authored scrollbar styling, and no horizontal
  overflow at desktop, tablet, 200% zoom-equivalent, and mobile widths;
- automated accessibility analysis with axe; and
- desktop, mobile, and Technical Figure screenshot regression.

Independent agent-browser inspection also confirmed a complete accessibility
tree, clean desktop and mobile composition, and no console or page errors.

## Visual evidence

### Desktop composition

![Desktop hero and Principle Index](reference-site/v1/desktop-hero.png)

### Mobile composition

![Mobile Principle Index and hero](reference-site/v1/mobile-hero.png)

### Technical Figure in context

![Technical Figure browser composition](reference-site/v1/technical-figure.png)

### Terra deployment colorway

![Terra deployment colorway](reference-site/v1/colorway-terra.png)

### Sage deployment colorway

![Sage deployment colorway](reference-site/v1/colorway-sage.png)

### Sky deployment colorway

![Sky deployment colorway](reference-site/v1/colorway-sky.png)

### Contextual Marginalia in its note state

![Contextual Marginalia browser study](reference-site/v1/contextual-marginalia.png)

The executable visual baselines are stored with the browser tests in
[`tests/browser/__screenshots__`](../tests/browser/__screenshots__). They are
scoped to representative surfaces so failures remain reviewable.

## Publication boundary

The artifact is published at [jbm.bns.studio](https://jbm.bns.studio) through
the repository's GitHub Pages workflow. Public visibility and the Figma link do
not imply a license or automatic inheritance by consumer repositories.
