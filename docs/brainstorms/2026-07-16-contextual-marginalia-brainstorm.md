---
date: 2026-07-16
topic: contextual-marginalia
status: approved
---

# Contextual marginalia

## What we're building

Add a named browser study for term-level annotations that keep the primary
sentence intact while letting its side measure yield to a relevant marginal
note. An annotated term uses strong editorial emphasis, a dotted underline,
and a real index. On wide screens, hover or keyboard focus exchanges the
annotation register for the matching note; narrow and print layouts place all
notes directly after the reading passage.

The study is called **Contextual Marginalia**. It is evidence for a possible
future pattern, not a generic component or an automatic Biblioteca dependency.

## Why this approach

The Making Software recording is compelling because the delight has a job: a
reader can resolve terminology without leaving the sentence, while the margin
changes from orientation to explanation at the moment it becomes useful. JBM
should extract that relationship rather than copy the source ruler, geometry,
wording, code, or exact animation.

The repository already distinguishes meaning, browser behavior, visual
representation, and portable values. The smallest honest translation updates
the meaning in `DESIGN.md`, proves behavior in the reference site, and records
the promotion boundary in a decision. Existing tokens already provide the
needed paper, ink, rule, spacing, focus, and motion values.

## Approaches considered

### Original named study — chosen

Create new JBM copy and geometry around a real two-note register. Verify hover,
focus, narrow layout, no JavaScript, reduced motion, print, and accessibility.
Keep promotion contingent on a second distinct context.

### Generic annotation component — rejected

A configurable component would overstate the evidence and turn an authored
reading relationship into kit inventory. Biblioteca has not yet supplied the
second context required by the constitution.

### Documentation only — rejected

Prose can define the selection criteria but cannot prove the interaction,
responsive reading order, focus behavior, or motion fallback that belong to
the browser.

## Key decisions

- **Content stays primary:** removing the note leaves a complete sentence.
- **The index is real:** its numbers and labels derive from the two actual
  annotations; it is not a decorative ruler.
- **The margin exchanges roles:** default orientation yields to contextual
  explanation, then returns when the reader leaves the term.
- **Hover has parity:** keyboard focus exposes the same note, and narrow
  layouts expose all notes without requiring hover.
- **Motion is optional:** the swap uses existing JBM timings and becomes
  immediate under reduced motion.
- **The source remains study material:** provenance is explicit, while assets,
  wording, geometry, implementation, and exact animation remain original.
- **Biblioteca is a later consumer decision:** this repository change does not
  edit or obligate a consumer repository.

## Success criteria

- A reader can identify the annotation before interacting.
- Both pointer and keyboard entry reveal the matching note.
- Narrow, no-JavaScript, reduced-motion, and print states retain all meaning.
- The browser study looks native to JBM rather than like a Making Software
  reproduction.
- The repository clearly explains why the work is a study and what evidence
  would permit promotion.

## Sources

- [Making Software — How to Make a Font](https://www.makingsoftware.com/chapters/how-to-make-a-font)
- [`DESIGN.md`](../../DESIGN.md)
- [Issue #21](https://github.com/chekos/joyful-brutalist-minimalism/issues/21)
