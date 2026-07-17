# 0006 — The public site explains the practice

- Status: accepted
- Date: 2026-07-17
- Issue: https://github.com/chekos/joyful-brutalist-minimalism/issues/39
- Owning authority: reference site

## Context

The reference site exposed internal production surfaces as if they were useful
reader destinations: raw token data, design-tool work, issue and change
receipts, synchronization rules, repository links, and licensing language.
Those links made the page narrate how it was produced instead of helping a
visitor understand the design practice.

The Constitution link also left the site for a raw file. That presentation
mixed public design guidance with internal workflow and made the intended
reading path feel unfinished.

## Decision

The public site explains the practice, not its production environment.

- The Constitution is a dedicated page on the same site.
- Public pages contain no links or references to internal design tools,
  hosting tools, raw project files, issue receipts, synchronization process, or
  licensing status.
- The home page ends with a visitor-facing figure about testing an idea through
  meaning, materials, composition, and behavior.
- The public Constitution curates the accepted principles, foundations, and
  selection guidance. It does not mirror internal workflow sections.
- Project records may continue to name the tools and artifacts required to
  build, verify, and publish the site.

## Consequences

Visitors can read and be inspired by the language without first understanding
the project toolchain. The Constitution has a stable public URL and a direct
path back to the browser specimen.

The public figure intentionally diverges from the internal four-authority
diagram. The project retains its internal parity and portability contracts, but
the website does not teach those contracts unless a later public-content
decision gives them a clear reader-facing purpose.

## Evidence

- Tracking issue:
  https://github.com/chekos/joyful-brutalist-minimalism/issues/39
- Browser sources:
  `src/pages/index.astro`, `src/pages/constitution.astro`, and
  `src/content/constitution.ts`
- Browser verification:
  `tests/browser/reference-site.spec.ts`
