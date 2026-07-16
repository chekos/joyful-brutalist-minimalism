# JBM taste evaluation v0 — generation contract

Generate one brief at a time. The purpose is to test whether JBM's meaning can
produce content-specific compositions without copying its reference specimen.

## Allowed inputs

The generator may read only:

- `DESIGN.md`;
- `tokens/jbm.tokens.json`;
- this generation contract; and
- the assigned object from `evals/taste-v0/briefs.json`.

Do not inspect `src/`, generated CSS, browser screenshots, Figma, consumer
repositories, another brief, or another generated output. Record any accidental
additional access in the run notes.

## Task

Create a self-contained `index.html` that serves the assigned audience and goal.
Start from the supplied content relationship, not from a JBM component list.
Use only the brief's supplied facts. Do not mention JBM in the rendered product.

The artifact must:

- include its CSS and optional JavaScript inline;
- make no network request to render, including fonts, images, analytics, or data;
- use semantic HTML and a logical reading and keyboard order;
- preserve all information without JavaScript;
- reflow at 390 × 844 and 1440 × 1000 without hiding meaning;
- preserve visible focus and honor `prefers-reduced-motion`;
- avoid controls that imply an unavailable backend or media source; and
- include ordinary external links only when the brief supplies their targets.

Visible measurements, progress, capacity, status, charts, diagrams, and
provenance must derive from the supplied facts. A static solution is preferable
when motion or interactivity would not explain anything.

## Required evidence

For each output, retain:

- the self-contained `index.html`;
- a 1440 × 1000 desktop screenshot;
- a 390 × 844 mobile screenshot; and
- generator identity, model or tool version when known, generation date, and
  any deviation from the allowed-input boundary.

Do not present generated output as an accepted JBM pattern. It remains study
material until human review and the repository's normal decision workflow say
otherwise.
