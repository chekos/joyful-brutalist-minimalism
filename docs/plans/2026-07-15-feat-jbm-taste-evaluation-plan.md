---
title: "feat: Build a cross-brief JBM taste evaluation"
type: feat
status: completed
date: 2026-07-15
origin: docs/brainstorms/2026-07-15-jbm-taste-evaluation-brainstorm.md
---

# Build a cross-brief JBM taste evaluation

## Overview

Add a model-neutral, repository-owned evaluation kit that reveals when
implementations satisfy individual JBM rules but repeat the same composition
across unrelated content. The chosen approach comes from the approved
[brainstorm](../brainstorms/2026-07-15-jbm-taste-evaluation-brainstorm.md):
stable briefs and review definitions in JSON, a constitution-only generation
contract, and a plain Node CLI for validation, run initialization, and aggregate
reporting.

## Problem statement

The current browser suite proves one canonical specimen's content, responsive
behavior, accessibility, progressive enhancement, and visual stability. It
cannot detect corpus-level sameness: an agent may reuse the same hero, rail,
Plate grid, technical diagram, or delight for every consumer while still
passing the constitution's local checks.

## Proposed solution

### Evaluation definition

Create `evals/taste-v0/` with:

- ten self-contained briefs spanning distinct content relationships;
- a generation contract that limits inputs to meaning and portable values;
- a rubric with scored dimensions, evidenced smell definitions, and a neutral
  motif fingerprint vocabulary; and
- a run template that documents the durable result shape.

### Local CLI

Create `scripts/taste-eval.mjs` with three commands:

1. `validate` checks the checked-in corpus, rubric, and run template.
2. `init` writes a complete run skeleton for a named generator and all briefs.
3. `report` validates completed run files and prints a Markdown comparison with
   per-dimension means, smell counts, and motif frequency.

The CLI must reject unknown IDs, duplicate entries, missing brief coverage,
invalid score ranges, empty evidence, and incomplete run artifacts. It reports
frequency without turning it into a pass/fail taste threshold.

### Documentation and verification

Add a dated experiment runbook that covers generation, artifact capture,
blinded review, reporting, interpretation, and limitations. Add Node tests for
successful initialization/reporting plus representative validation failures,
and include definition validation in `npm run check`.

## User flows

### Initialize and generate

1. The operator validates the repository-owned evaluation definition.
2. They initialize a run with a human-readable label and generator description.
3. Each generator receives the same contract plus one brief at a time.
4. The operator records the artifact and desktop/mobile screenshot paths.

### Review and compare

1. A reviewer receives artifacts identified by run and brief, without model
   branding in the rendered surface.
2. They record motif presence neutrally, score every rubric dimension, and add
   evidence for each smell.
3. The reporter rejects incomplete data or aggregates one or more valid runs.
4. Humans inspect recurring motifs together with content fit and smell evidence
   before proposing any design-language change.

## Failure and edge cases

- An initialized but unreviewed run is valid as a working file but cannot be
  reported as a result.
- A report cannot silently omit briefs or average only favorable outputs.
- Multiple reviewers may score the same output; their scores are averaged while
  their smell evidence remains countable and inspectable.
- Unknown motif, smell, score-dimension, or brief IDs fail validation.
- Duplicate brief outputs or reviewer IDs within one output fail validation.
- Artifact paths remain relative strings; the v0 CLI does not upload, execute,
  or trust generated HTML.
- Model APIs, credentials, retries, rate limits, and cost tracking remain
  outside the repository-owned v0 flow.
- UMAP or embedding visualization is unnecessary for ten briefs and must not be
  presented as causal evidence.

## Acceptance criteria

- [x] `evals/taste-v0/briefs.json` defines ten unique, content-diverse briefs
      with honest supplied facts and no prescribed visual composition.
- [x] `evals/taste-v0/rubric.json` defines score dimensions, evidenced smells,
      and neutral motif fingerprints with stable IDs.
- [x] The generation contract isolates the constitution-and-token track and
      specifies a portable, self-contained artifact.
- [x] `npm run taste:init -- ...` creates a complete run skeleton without
      calling an external service.
- [x] `npm run taste:report -- ...` validates completed runs and emits a stable
      Markdown summary of scores, smells, and motif frequencies.
- [x] Incomplete, duplicate, out-of-range, and unknown-ID data produce clear
      failures covered by tests.
- [x] `npm run check`, `npm run build`, and `npm run test:browser` pass.
- [x] The dated runbook explains blinded review, interpretation limits,
      provenance, and how accepted findings would be promoted through the
      repository's source-of-truth rules.
- [x] No consumer repository, Figma file, token, or reference-site composition
      changes as part of v0.
- [x] Work lands through a `codex/` branch, reviewed PR, clean merge, and synced
      local `main`.

## Risks and mitigations

- **Rubric theater:** scores can look objective without being reliable. Require
  evidence, retain reviewer-level records, and treat aggregates as prompts for
  judgment.
- **Reference-site imitation:** generators may copy the canonical composition.
  Use the constitution-only access boundary from the brainstorm.
- **Brief bias:** one content family may favor one motif. Span multiple content
  relationships and inspect per-brief evidence rather than one overall number.
- **Premature design law:** an initial recurrence may be noise. Keep v0 results
  as a dated experiment and require an accepted decision before changing
  `DESIGN.md`.

## Sources and references

- **Origin brainstorm:**
  [JBM taste evaluation](../brainstorms/2026-07-15-jbm-taste-evaluation-brainstorm.md)
  — carries forward the constitution-only track, neutral motif counting, human
  judgment, and model-neutral boundary.
- [`DESIGN.md` pattern selection](../../DESIGN.md#choosing-and-promoting-a-pattern)
- [`ADOPTION.md` local translation workflow](../../ADOPTION.md#a-six-step-workflow)
- [`tests/browser/reference-site.spec.ts`](../../tests/browser/reference-site.spec.ts)
- [Design Arena methodology](https://notes.designarena.ai/methodology/)
- [UMAP parameter guidance](https://umap-learn.readthedocs.io/en/latest/parameters.html)
