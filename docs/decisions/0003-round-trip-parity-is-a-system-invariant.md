# 0003 — Round-trip parity is a system invariant

- Status: accepted
- Date: 2026-07-16
- Issue: https://github.com/chekos/joyful-brutalist-minimalism/issues/24
- Owning authority: `DESIGN.md`, `SYNC.md`, and `docs/sync/manifest.json`

## Context

Contextual Marginalia reached `DESIGN.md` and the reference site while Figma
was left unchanged. Existing tokens happened to cover the implementation, but
“unchanged” did not distinguish verified reuse from an omitted sync step. That
made the repository and Figma behave like a one-way handoff rather than two
ways of accessing the same authored system.

## Decision

JBM requires round-trip semantic parity across meaning, canonical tokens,
Figma, and the reference site. Work may originate in the repository or Figma.
The owning form resolves the concern, and every other core form receives an
explicit state: represented, verified-existing, not-applicable, or
intentional-divergence.

Portable values remain canonical in `tokens/jbm.tokens.json`; a Figma-originated
portable-value change is promoted there and regenerated. Consumer repositories
remain explicit adopters and are not part of automatic core synchronization.

## Consequences

An accepted change cannot silently omit Figma or hide behind the word
“unchanged.” Existing values may remain unchanged when live parity proves they
already cover the decision. Figma remains free to explore, while accepted
changes can be synchronized back into durable repository authorities without a
last-write-wins policy.

## Evidence

Issue #24 records the correction. The live Figma checkpoint
`jbm_dsb/checkpoint_contextual_marginalia`, the refreshed Figma screenshots,
the sync manifest, and `npm run validate:sync` provide the cross-medium proof.
