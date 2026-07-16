---
date: 2026-07-15
experiment: jbm-taste-evaluation-v0
status: ready
issue: https://github.com/chekos/joyful-brutalist-minimalism/issues/19
---

# JBM taste evaluation v0

This experiment tests whether independent implementations can remain
recognizably Joyful Brutalist Minimalism while adapting their composition to ten
different content relationships. It evaluates a corpus, not one polished page.

The experiment definition lives in [`evals/taste-v0`](../../evals/taste-v0).
The [generation contract](../../evals/taste-v0/generation-contract.md) is a
deliberately narrower input boundary than ordinary adoption: it withholds the
reference site and Figma so their compositions cannot become hidden templates.

## 1. Validate and initialize a run

From a clean clone:

```sh
npm run validate:taste-eval
npm run taste:init -- \
  --label "generator-a" \
  --generator "vendor/model/version or human workflow" \
  --output output/taste-eval/generator-a/run.json
```

Initialization makes no model or network call. It writes a complete skeleton
with all ten brief IDs. `output/taste-eval/` is ignored working state; promote a
result into a dated repository artifact only through an issue and an explicit
review decision.

## 2. Generate artifacts

Give the generator the allowed files plus one brief object at a time. Keep every
other brief and output outside its context. Store each self-contained artifact
and its two required screenshots beside the run file, then fill their relative
paths into the corresponding output record.

This separation matters: a generator that can see all prior outputs may vary
them deliberately, hiding the default behavior the experiment is intended to
observe.

## 3. Review without generator labels

Give each reviewer the assigned brief, rendered desktop and mobile surfaces,
and artifact behavior. Hide the run label and generator metadata during review.
Use the dimension, smell, and motif IDs in
[`rubric.json`](../../evals/taste-v0/rubric.json).

Motifs are neutral observations. Record `dominant-display-hero`, for example,
whenever it is present; do not mark a smell unless its use lacks a content job
or causes a named failure. Every smell requires artifact-specific evidence.
Use `unearned-scale` only when substantially smaller type preserves the same
hierarchy and comprehension, proving that the larger treatment was spectacle
rather than structure. A dominant hero remains neutral when its scale has a
specific, evidenced job.

Each review has this shape:

```json
{
  "reviewer": "reviewer-a",
  "scores": {
    "content-fit": 4,
    "structure-honesty": 4,
    "inspectability": 5,
    "useful-delight": 3,
    "access-resilience": 4,
    "authored-identity": 4,
    "adaptive-composition": 4
  },
  "smells": [
    {
      "id": "motif-without-job",
      "evidence": "The numbered marks imply sequence, but the records are unordered."
    }
  ],
  "evidence": "The comparison remains complete on mobile and every measure comes from the brief.",
  "notes": null
}
```

Use at least two independent reviewers when a result may influence
`DESIGN.md`. Reviewer scores are averaged within each output before outputs are
averaged, so adding reviewers to one brief does not give it extra weight.

## 4. Produce the corpus report

```sh
npm run taste:report -- \
  output/taste-eval/generator-a/run.json \
  output/taste-eval/generator-b/run.json
```

Reporting fails if a run omits a brief, uses an unknown rubric ID, contains an
out-of-range or incomplete score, lacks evidence, duplicates a reviewer, or
points to missing artifacts or screenshots. A valid report shows:

- mean scores for each rubric dimension;
- the number of outputs carrying each evidenced smell; and
- the number of outputs containing each neutral motif.

## 5. Interpret, then promote deliberately

Do not rank a generator from one overall number. Read score differences beside
brief-level evidence. Inspect motifs that recur across unrelated briefs, then
ask whether the content repeatedly required them. A high motif count is a
question; an evidenced smell is a finding; neither is automatically design law.

Keep conclusions in a dated result or GitHub issue. If repeated evidence changes
the language's meaning or selection rules, propose the change in `DESIGN.md` and
record the accepted decision according to `docs/decisions/README.md`. Do not
silently synchronize Figma, the reference site, or consumer repositories.

## Limitations

- Ten briefs can expose obvious template collapse but cannot estimate a model's
  complete design distribution.
- Human scores remain subjective; blinding and multiple reviewers reduce but do
  not remove that subjectivity.
- The experiment does not measure production maintainability or replace the
  browser accessibility suite.
- V0 intentionally avoids CLIP embeddings and UMAP. Their projections are
  sensitive to representation and parameters, and a visible cluster or hole
  would not establish why a generator produced or suppressed a motif.

## Provenance

The experiment adapts the distribution-level question from
[Design Arena's GPT-5.6 Sol analysis](https://readwise.io/reader/shared/01kxmcy9qpxtp05qq7vz9nrb4b/),
the pairwise-preference context from the
[Design Arena methodology](https://notes.designarena.ai/methodology/), and the
parameter caveat from the
[UMAP documentation](https://umap-learn.readthedocs.io/en/latest/parameters.html).
Its briefs, rubric, run format, and interpretation rules are original to JBM.
