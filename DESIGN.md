# Joyful Brutalist Minimalism

## The constitution

Joyful Brutalist Minimalism is Sergio's authored design language for the web.
It treats a page as a working surface rather than a neutral container:
structure is visible enough to understand, editorial warmth makes information
inviting, and technical precision makes behavior inspectable.

This document owns the language's meaning and judgment. It should help a person
who does not identify as a professional designer make sound decisions, and it
should give an implementation agent enough constraint to avoid producing a
generic brutalist theme.

The short version is:

> Show how the thing works, give the content room to speak, and attach one
> restrained moment of joy to something useful.

## Authority and conflict resolution

The language has four complementary forms. They are bridged deliberately, not
kept mechanically identical.

| Form | It owns | It does not own |
| --- | --- | --- |
| `DESIGN.md` | Principles, vocabulary, selection criteria, accessibility rules, and reasons | Exact rendered geometry or browser behavior |
| Canonical tokens | Portable named values and platform mappings | Composition, product semantics, or every possible visual value |
| Figma | Visual exploration and committed visual representation: variables, styles, components, patterns, and studies | Browser responsiveness, focus behavior, or automatic repository changes |
| Reference site | Browser truth: responsive layout, interaction, motion, progressive enhancement, and reduced-motion behavior | The meaning of the language or consumer-product architecture |

When two forms disagree:

1. Name the concern before editing: meaning, portable value, visual
   representation, or browser behavior.
2. Resolve it in the form that owns that concern.
3. Translate the accepted decision into the other forms only where the
   translation is meaningful.
4. Record an intentional divergence instead of silently overwriting a local
   interpretation.

For example, an unavailable font is not a reason to rename the Editorial role.
Preserve the role and its reading behavior, choose a local substitute, and
document the substitution. A prototype transition in Figma is not a substitute
for verifying reduced motion in the browser.

## Principles

### 1. Make structure honest

Visible geometry must carry information, expose an action, clarify hierarchy,
or make behavior easier to perceive. A rule may separate sections, show
measure, connect related marks, or expose an index. It should not exist merely
to make the page look engineered.

### 2. Make the work inspectable

Indexes, progress, measurements, diagrams, provenance, and status come from
real content or state. If a visitor cannot explain what a mark measures, the
mark is decoration and should be removed or honestly presented as illustration.

### 3. Treat joy as function

Warmth, tactility, wit, and surprise count when they improve clarity,
attention, memory, or emotional ease. Joy is not a visual surcharge added
after the interface works.

### 4. Pair editorial warmth with technical precision

The main voice should welcome reading. The instrument voice should make
location, measure, provenance, and action exact. Neither role should impersonate
the other: a long paragraph should not feel like telemetry, and a measurement
should not become literary ornament.

### 5. Use one delight at a time

A composition gets one coordinated playful system. A paper-pressure field, a
semantic ruler, a caption reveal, or a useful stamp can be the delight. Do not
stack unrelated effects to prove that the design is expressive.

### 6. Animate explanation, not decoration

Motion may reveal relationship, progress, hierarchy, or cause and effect.
Animation that merely announces its own presence is noise.

### 7. Design each medium intentionally

Figma, browser, print, and a consumer product translate the language according
to their constraints. Semantic agreement matters more than pixel identity
across unlike media.

### 8. Preserve an escape hatch

Keyboard use, visible focus, mobile layouts, zoom, low-power contexts, no
JavaScript, and reduced motion are part of the design. They are not degraded
exceptions.

## Vocabulary

These names describe functions, not component classes. They should outlive a
particular framework.

- **Ground:** the paper-like field on which a composition is built.
- **Rule:** a line that separates, measures, connects, or exposes hierarchy.
- **Kicker:** compact technical context that orients the reader before the
  primary voice.
- **Index:** numbering that creates location, order, or cross-reference.
- **Ledger:** a repeated set of inspectable records.
- **Plate:** a bounded paper surface holding one coherent artifact.
- **Figure:** an image or diagram with a meaningful caption and provenance.
- **Instrument:** an interface whose geometry represents real content or state.
- **Marginalia:** secondary evidence, annotation, or delight attached to
  primary content.
- **Signal:** the sparse accent that marks action, state, or attention.

Use the vocabulary only when the function is present. A bordered card is not
automatically a Plate; a tiny uppercase label without orienting information is
not automatically a Kicker.

## Foundations

### Color

The palette has five role families.

| Family | Purpose | Core values |
| --- | --- | --- |
| Bone / Paper | Page, raised paper, and quiet paper | `#fffef9`, `#f5f1e8`, `#ebe4d5` |
| Ink | Primary marks, hard rules, and secondary readable text | `#0a0a0a`, `#161514`, `#2a2a2a` |
| Terra | Action, current state, and sparse warm emphasis | `#a94229`, `#b54724`, `#d7653d` |
| Sage | Quiet metadata, notebook structure, and secondary signal | `#5f7057`, `#dfe5db` |
| Sky | Informational diagrams and alternate annotation | `#2e6670`, `#a7d8de` |

Semantic tokens state intended use. Prefer
`color.semantic.action.default` to a raw Terra value when the decision is
about an action. A consumer may retain a product-specific alias such as
`ember`, but it should document which language role that alias interprets.

Terra 400, Sage 200, and Sky 200 are fields or large marks, not body-text
colors. The validator checks every declared text, interaction, signal, and
focus pairing against its WCAG threshold. The generated
[token reference](docs/token-reference.md) is the exact ledger.

Use signal color sparsely. If everything is Terra, nothing is a signal.

### Typography

Typography is defined by role rather than by compulsory font licensing.

| Role | Function | V1 specimen |
| --- | --- | --- |
| **Editorial** | Long reading, display, headings, and quotation | Source Serif 4 |
| **Instrument** | Kicker, index, measure, provenance, and compact controls | IBM Plex Mono |
| **System** | Dense utility text where mono reduces readability | Native UI sans |

A substitute is compliant when it preserves the relationship:

- Editorial is warm, legible, and comfortable in paragraphs.
- Instrument is compact, precise, and supports tabular comparison.
- System is used intentionally for utility density, not as an unexamined
  default.

Do not set paragraphs in Instrument merely to look technical. Do not set
measurements in an expressive display face when alignment or scanning matters.

### Space

The portable scale uses a 4px base:
`0, 4, 8, 12, 16, 24, 32, 48, 64`.

The scale gives related things a shared rhythm. It is not a demand for
mechanical uniformity. Editorial pauses may be asymmetric when the content
requires them; the reason should be visible in hierarchy or measure.

### Rules

Use 1px for ordinary structure and 2px for hard emphasis. Rules should touch or
align with the objects they explain. A floating rule with no relationship to
content is usually decoration.

### Radius

The default radius is zero. A 2px paper edge is allowed when it helps a Plate
feel like a bounded artifact. A full circle is reserved for a genuine point,
ring, seal, status, or control. Rounded rectangles are not the default grammar.

### Shadow and elevation

Prefer a crisp offset or a restrained inset paper mark. A shadow should explain
that one artifact sits above or within another. Avoid diffuse stacks that turn
the page into generic dashboard chrome.

## Composition

Begin with the content relationship, not a component inventory.

1. Choose a Ground appropriate to the reading environment.
2. Establish the primary editorial voice.
3. Add Instrument text only where location, state, measure, action, or
   provenance becomes clearer.
4. Use Rules and Indexes to expose hierarchy or sequence.
5. Bound a Plate only when the content is one coherent artifact.
6. Choose one useful delight and define its accessible fallback.

Hard structure and generous space can coexist. Brutalism here means directness,
visible construction, and decisive hierarchy. It does not mean crowding,
hostility, indiscriminate borders, or enormous type by default.

### Repetition and ledgers

A Ledger earns its repetition from real records. Keep repeated geometry stable
enough to compare entries. Let content length and priority determine where the
rhythm bends.

### Instruments

An Instrument must name what it measures, derive its state from real content,
and remain understandable when its motion is removed. Treat early instruments
as studies until two genuinely different contexts demonstrate a stable reusable
contract.

### Contextual marginalia

Contextual Marginalia is a named study for term-level supplementary text. The
primary sentence remains complete without the note. An annotated term uses
strong editorial emphasis, a dotted underline, and a visible index so the
relationship is legible before interaction.

On wide reading surfaces, a real annotation register may yield to the matching
marginal note when the term receives hover, keyboard focus, or activation. The
register must index actual annotations rather than imitate a decorative ruler.
When marginal space is unavailable, including narrow and print layouts, place
all notes in reading order directly after the passage. Reduced motion makes the
exchange immediate; it does not remove the note or its focus state.

The browser specimen proves this interaction as a study. Do not promote it to a
reusable component until a second genuinely different content context
demonstrates a stable contract. Making Software is provenance for the
relationship, not a source for copied wording, geometry, assets, code, rulers,
or exact animation.

## Imagery, figures, and diagrams

A Figure includes:

- a figure number or stable reference;
- an explanation of what the viewer should understand;
- a source or provenance note when the material is not wholly original; and
- alt text or an adjacent textual equivalent for the meaningful content.

Technical geometry must encode real concepts, relationships, or data. Never
invent ticks, coordinates, progress, legends, controls, or scientific-looking
labels to create an atmosphere of precision.

Original diagrams should begin from the concept being explained. External work,
including Making Software, is study material: extract principles and
interaction contracts, then create new geometry, assets, wording, and motion.
Do not reproduce its diagrams, rulers, source code, or exact animations.

Photography and illustration may be warm or playful, but they still need a
content role and provenance. Decorative imagery must not compete with the one
chosen delight.

## Motion

The motion vocabulary has two tempos:

- **Fast state change:** 160ms with the standard curve for hover, focus-adjacent
  feedback, and compact state transitions.
- **Explanatory reveal:** 400ms with
  `cubic-bezier(.2, .75, .25, 1)` when spatial change explains relationship,
  sequence, or progress.

Motion starts from a question: “What becomes easier to understand because this
moves?” If the answer is only “it feels lively,” use a static treatment.

Never require animation to reveal the only copy of content or state. The
no-JavaScript form remains readable and navigable.

### Reduced-motion contract

When `prefers-reduced-motion: reduce` applies:

- reveal all content immediately;
- resolve duration and transform distance to zero;
- remove transforms, clipping reveals, parallax, and smooth scrolling;
- preserve focus indication, progress, current state, and reading position; and
- do not replace motion with flashing, opacity pulsing, or another effect.

Reduced motion changes the explanation method, not the available information.

## Accessibility contract

Accessibility is a foundation, not a polish pass.

- Body text and text-like actions meet at least 4.5:1 contrast. Large text and
  non-text focus or state indicators meet their applicable thresholds.
- Every interactive element is reachable and operable by keyboard in a logical
  order.
- Focus is visible without relying on color alone and is not hidden by sticky
  geometry.
- Hover never exposes information that focus or an explicit control cannot
  expose.
- Touch targets remain usable without forcing visual controls to become soft or
  oversized.
- Semantic HTML carries reading order, headings, lists, figures, captions, and
  controls before ARIA is added.
- At 200% zoom and narrow mobile widths, content reflows without hiding meaning
  or requiring two-dimensional scrolling, except for genuinely spatial data.
- Motion follows the reduced-motion contract.
- A figure's textual equivalent communicates its concept, not merely its
  appearance.
- Color is never the only carrier of action, state, category, or progress.

Test with keyboard-only use, representative mobile and desktop widths, reduced
motion, and JavaScript disabled. A screenshot alone cannot verify this contract.

## Choosing and promoting a pattern

Before adding a pattern, answer:

1. **Content:** What real content or state does it serve?
2. **Structure:** What relationship does its geometry make visible?
3. **Inspectability:** Can a person explain where its labels, measures, and
   status come from?
4. **Delight:** What one moment of ease, tactility, or surprise helps the task?
5. **Access:** What happens with keyboard, mobile, zoom, no JavaScript, and
   reduced motion?
6. **Medium:** Which decisions belong to meaning, tokens, Figma, or browser
   behavior?
7. **Evidence:** Has a second distinct context proven that it is a reusable
   component rather than a study?

If these answers are weak, keep the work as a named study or remove it. Do not
promote a motif simply because it is visually distinctive.

## Human authoring workflow

1. Describe the problem and the intended role in a GitHub issue.
2. Explore visual alternatives in a clearly named Figma study. Do not mutate a
   committed component while the decision is still exploratory.
3. Decide which authority owns the accepted change.
4. Update that authority:
   - meaning or selection rules in this document;
   - portable values in `tokens/jbm.tokens.json`;
   - visual representation in Figma; or
   - responsive and interactive behavior in the reference site.
5. Regenerate derived token artifacts with `npm run generate` and run
   `npm run check`.
6. Translate the decision into the other forms where needed, inspect the real
   result, and record meaningful divergence.
7. Link the issue, pull request, Figma checkpoint, and browser evidence.

## Agent workflow

Before designing or implementing:

1. Read this document and the issue that authorizes the work.
2. Identify the content function before selecting a pattern.
3. Inspect Figma for visual intent and the reference site for browser behavior.
4. Read canonical tokens rather than sampling values from generated CSS.
5. Preserve consumer-repository boundaries and local product semantics.

When changing tokens:

1. Edit only `tokens/jbm.tokens.json`.
2. Give every new token a DTCG type, description, inherited provenance, and an
   honest Figma target.
3. Add or update contrast pairs when a color is used for text, interaction,
   focus, or meaningful non-text state.
4. Run `npm run generate`.
5. Review canonical JSON, generated CSS, the Figma mapping, and the human token
   reference together.
6. Run `npm run check`; never silence a mapping, contrast, or parity failure
   by editing a generated file.

When adopting into a consumer:

1. Choose the smallest relevant principle, foundation, or pattern.
2. Translate it into the consumer's own framework and content semantics.
3. Verify accessibility in that product.
4. Document important substitutions or divergence.
5. Do not add an automatic dependency or propagate repository changes without
   separate authorization.

## Anti-patterns

### Decorative pseudo-data

Fake coordinates, progress, diagnostics, legends, rulers, and measurements
undermine inspectability. Use real data, explain an abstract concept honestly,
or remove the technical treatment.

### Gratuitous brutalism

Aggression is not the goal. Indiscriminate borders, crowded type, intentional
friction, raw controls without hierarchy, and hostile contrast are not made
correct by calling them brutalist.

### Effect stacking

Do not combine a grid, paper pressure, noisy texture, offset shadow, stamp,
cursor effect, kinetic caption, and animated ruler in one composition. Choose
the one delight that helps.

### Mechanical synchronization

Do not copy every token, component, or visual change into every consumer.
Consumers interpret the language and may diverge intentionally. Cross-repo
propagation requires its own issue, product context, and visual verification.

### Generic kit expansion

Do not add a component merely to fill out a checklist of buttons, cards,
dialogs, and form controls. The library grows from recurring authored needs.

### Unexplained hardcoding

A study may test a new value. A committed foundation or component must bind to
an existing token or propose a named token with rationale and provenance.

## Provenance and originality

The language codifies recurring evidence without declaring one consumer the
winner:

- [soyserg.io design foundations](https://github.com/chekos/soyserg.io/blob/deeef5e/app/globals.css)
  contribute bone grounds, notebook structure, ink, Terra, editorial/mono
  pairing, ledgers, and the one-delight discipline.
- [soyserg.io agent guidance](https://github.com/chekos/soyserg.io/blob/deeef5e/AGENTS.md)
  contributes explicit design boundaries and inspectability.
- [Biblioteca foundations](https://github.com/chekos/bns-pub/blob/6ca3bfd/src/styles/global.css)
  contribute paper surfaces, ember/ink relationships, reading architecture,
  captions, and content-derived instruments.
- [Biblioteca components](https://github.com/chekos/bns-pub/tree/6ca3bfd/src/components)
  contribute evidence for document shells, maps, rulers, and provenance.
- Mira Mira — Design System contributes editable Figma precedents for Paper,
  Plate, Kicker, Stamp, a notebook grid, and bone/ink/terra/sage roles.
- [Making Software — How to Make a Font](https://www.makingsoftware.com/chapters/how-to-make-a-font)
  is an approved study in explanatory diagrams and semantic ruler motion, not a
  source of reusable assets or implementation.

The exact token ledger records which sources informed each family and where a
new accessible value was intentionally synthesized. New external references
must be credited, and proprietary assets or implementations must not be copied.

## Change discipline

Evergreen language belongs here only after it is accepted. Temporary
priorities, candidate work, and unresolved adoption belong in GitHub issues or
dated design documents.

A durable change should include:

- the content or design reason;
- the authority that owns it;
- token and platform mapping changes where applicable;
- accessibility evidence;
- visual or browser evidence appropriate to the concern; and
- links between the issue, pull request, Figma checkpoint, and deployed
  specimen.

The repository remains intentionally unlicensed until documentation, code, and
visual-asset licensing are chosen explicitly. Public visibility does not imply
permission to reuse the work.
