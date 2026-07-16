---
date: 2026-07-15
topic: jbm-taste-evaluation
status: approved
---

# JBM taste evaluation

## What we're building

Create a small, repository-owned experiment for detecting when otherwise valid
Joyful Brutalist Minimalism outputs collapse into the same composition across
unrelated briefs. The experiment uses ten content-diverse briefs, a shared
generation contract, a human review rubric, a neutral motif fingerprint, and a
local report that makes repetition visible across the corpus.

V0 evaluates the constitution rather than a model vendor. It supplies the
inputs and analysis workflow but does not call a paid API, choose a permanent
model roster, or treat one agent's outputs as an independent comparison set.

## Why this approach

The Design Arena analysis of GPT-5.6 Sol suggests that design preference can
improve when a model combines reliable structures with prompt-specific
adaptation and suppresses recurring defaults. The transferable method is to
inspect a distribution of outputs, not to copy its blacklist of purple
gradients, bento layouts, large type, or offset composition.

JBM already judges geometry by function. Its own reference site intentionally
uses large editorial type, offset composition, bordered Plates, and a reading
rail. Those forms become smells only when they appear without a content reason
or recur regardless of the brief.

## Approaches considered

### Repository-owned corpus and review kit — chosen

Keep stable briefs, scoring definitions, motif vocabulary, run initialization,
and aggregation in Git. Generate artifacts separately, review them without
generator labels, then compare results through a deterministic local report.

This is portable, model-neutral, inexpensive, and consistent with the repo's
plain Markdown, JSON, and Node tooling.

### Automated multi-model runner — deferred

An automated runner could produce a corpus faster, but it would introduce API
credentials, cost, provider-specific request formats, and a changing model
roster before the evaluation contract has been proven. V0 should make those
runs possible without owning them.

### Visual anti-pattern blacklist — rejected

Blanket bans would turn contextual motifs into forbidden styles and conflict
with `DESIGN.md`. The experiment records motif frequency neutrally and records
smells only when a reviewer can cite an unearned or harmful use.

## Key decisions

- **Constitution-only track:** generators may read `DESIGN.md`, canonical
  tokens, the generation contract, and one brief. They may not inspect the
  reference-site composition, screenshots, Figma studies, or other outputs.
- **Ten content-diverse briefs:** the corpus covers narrative, procedural,
  status, catalog, evidence, comparison, action, and data relationships without
  prescribing layout.
- **Single-file artifact contract:** each output is a self-contained
  `index.html` with no network dependency so reviewers can reproduce it without
  adopting a framework.
- **Human judgment plus deterministic aggregation:** reviewers score named JBM
  criteria and cite evidence for smells. The CLI calculates averages and
  frequencies but does not declare taste mechanically.
- **Motifs are neutral:** a fingerprint records recurring forms such as a
  dominant hero, sticky rail, bordered module grid, or technical diagram. High
  frequency is a review prompt, not an automatic failure.
- **Incomplete work fails explicitly:** reports reject missing artifacts,
  screenshots, fingerprints, reviews, unknown IDs, and incomplete brief
  coverage instead of averaging partial runs silently.

## Success criteria

- A clean clone can validate the evaluation definition, initialize a labeled
  run, and report one or more completed run files with existing Node tooling.
- Every brief contains enough honest source material to avoid invented metrics,
  provenance, or status.
- A reviewer can distinguish semantic JBM fidelity from mere resemblance to the
  reference site.
- The aggregate report exposes repeated motifs and evidenced smells across all
  briefs without turning frequency into design law.
- Existing token, portability, browser, and repository checks continue to pass.

## Boundaries

- Do not change `DESIGN.md`, tokens, Figma, the published reference site, or a
  consumer repository based on this unrun experiment.
- Do not commit generated model outputs as accepted patterns.
- Do not require credentials, external services, or a specific model vendor.
- Keep active model selection and execution sequencing in the GitHub issue.

## Sources

- [How OpenAI's Sol Finally Learned Design Taste](https://readwise.io/reader/shared/01kxmcy9qpxtp05qq7vz9nrb4b/)
- [Design Arena methodology](https://notes.designarena.ai/methodology/)
- [UMAP parameter guidance](https://umap-learn.readthedocs.io/en/latest/parameters.html)
- [`DESIGN.md`](../../DESIGN.md)
- [`ADOPTION.md`](../../ADOPTION.md)
