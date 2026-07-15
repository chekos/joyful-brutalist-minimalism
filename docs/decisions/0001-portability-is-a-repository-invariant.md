# 0001 — Portability is a repository invariant

- Status: accepted
- Date: 2026-07-15
- Issue: https://github.com/chekos/joyful-brutalist-minimalism/issues/13
- Owning authority: `PORTABILITY.md`

## Context

The design language should remain usable when the workstation, AI account, or
connected-tool session changes. Prior conversations and private host memory are
valuable working context, but a future collaborator cannot depend on them.

## Decision

A clean clone plus documented public prerequisites must be sufficient to
understand, run, verify, recover, and continue JBM. Accepted durable judgment
belongs in the owning repository artifact. External systems need a named owner,
recovery path, and repository-owned inventory; their connectors remain optional
accelerators.

## Consequences

The repository gains a small bootstrap and doctor, a Figma recovery manifest,
and checkpoint checksums. Containers and deterministic Figma reconstruction are
deferred until demonstrated need outweighs their maintenance cost.

## Evidence

The implementation and clean-checkout verification are linked from issue #13.
