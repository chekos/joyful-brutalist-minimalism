# Adopting Joyful Brutalist Minimalism

Joyful Brutalist Minimalism is a design practice to interpret, not a package a
consumer must install. Adoption begins with meaning, takes the smallest useful
piece, and ends with evidence that the local translation still works for the
people using it.

## The adoption contract

| Question | Authority to inspect |
| --- | --- |
| What does this language mean, and what judgment does it require? | [`DESIGN.md`](DESIGN.md) |
| Which reusable values have stable names? | [`tokens/jbm.tokens.json`](tokens/jbm.tokens.json) |
| How should those values look and compose? | [The editable Figma source](https://www.figma.com/design/T4jEmsyQBURKMr6s3zYfFJ) |
| How should the composition respond and behave in a browser? | [The reference specimen](src/pages/index.astro) |

These sources cooperate, but they do not compete for ownership. Do not change
a browser implementation to redefine a principle, or change Figma geometry to
create a new portable value. Change the owning source and translate the result
deliberately.

## A six-step workflow

1. **Name the concern.** State the content, relationship, or behavior the
   consumer needs. Avoid starting from a desired visual effect.
2. **Read the governing meaning.** Read the relevant principle and vocabulary
   in `DESIGN.md`. Inspect Figma for visual intent and the reference site for
   executable behavior.
3. **Choose the smallest useful form.** Adopt one relevant token role, rule,
   plate, index row, action link, caption, or composition pattern. Do not copy
   the whole specimen when one relationship will do.
4. **Translate into local semantics.** Map the chosen role to the consumer's
   framework, component names, content model, and existing tokens. Preserve
   the function; local implementation details may differ.
5. **Verify access and behavior.** Check semantic structure, keyboard order,
   visible focus, contrast, pointer and touch behavior, responsive reflow,
   reduced motion, and the useful no-JavaScript baseline where applicable.
6. **Record intentional divergence.** In the consumer's issue or pull request,
   name the source pattern, the local decision, why the medium or product
   required it, and the evidence used to verify it.

## Divergence receipt

Use this compact record in a consumer issue or pull request:

```md
JBM source: DESIGN.md § [principle or vocabulary] + [token/form/pattern]
Local concern: [the content, relationship, or behavior being served]
Translation: [the local semantic or implementation choice]
Divergence: [none, or the intentional difference and its reason]
Evidence: [keyboard, pointer/touch, viewport, contrast, motion, and test links]
```

A divergence is healthy when it preserves meaning and fits the medium. It is a
defect when it silently changes a named value, obscures structure, removes an
escape hatch, or creates a second source of truth.

## Example: a source card

A product needs to show one research artifact with title, summary, status, and
provenance.

- Read `Plate`, `Figure`, and `Provenance` in `DESIGN.md`.
- Inspect the Figma Plate and Figure Caption for hierarchy and pressure.
- Adopt the semantic paper surface, primary and secondary text roles, one rule,
  and one caption relationship.
- Implement the artifact in the product's existing card component and content
  schema; do not import the reference page as a component library.
- Verify heading structure, source-link naming, focus, narrow reflow, contrast,
  and reduced motion.
- Record any local difference, such as using a native disclosure for metadata,
  in the product's pull request.

## Upstream changes

When the consumer reveals a reusable improvement, open an issue in this
repository and identify the owning authority. Portable values change first in
`tokens/jbm.tokens.json` and regenerate into CSS and the Figma mapping. Visual
decisions change in Figma. Browser behavior changes in the reference specimen.
Meaning and judgment change in `DESIGN.md`.

No consumer inherits an upstream change automatically. Re-adoption is an
explicit product decision with its own verification.

## Licensing boundary

This public repository is intentionally unlicensed until documentation, code,
and visual-asset licenses are chosen explicitly. Public visibility and this
workflow do not grant reuse rights.
