# Round-trip sync

Joyful Brutalist Minimalism is one authored system with several access points.
The repository and the editable Figma file are peers: work may begin in either
place, then the owning authority and every other core form are reconciled.

Sync means semantic parity, not identical artifacts. Prose cannot execute a
hover state, Figma cannot prove browser focus order, and browser CSS should not
become a second token source. Each form stays native to its job while exposing
the same accepted system.

## Completion states

Every accepted change receives one explicit state in each core form:

| State | Meaning |
| --- | --- |
| `represented` | The form contains the meaningful translation and evidence. |
| `verified-existing` | Existing values or structures already cover the change; live parity was checked. |
| `not-applicable` | The concern has no honest expression in that form. |
| `intentional-divergence` | The medium requires a documented difference that preserves the accepted meaning. |

Silence is not a state. “Unchanged” is only complete when it means
`verified-existing` or `not-applicable` and the reason is recorded in
[`docs/sync/manifest.json`](docs/sync/manifest.json).

## Repository to Figma

1. Classify the change as meaning, portable value, visual representation, or
   browser behavior.
2. Edit the owning repository source and verify it.
3. If portable values changed, edit `tokens/jbm.tokens.json`, run
   `npm run generate`, and reconcile the generated names, values, aliases,
   scopes, and styles in Figma.
4. Represent accepted visual states in Figma. Browser-only behavior still gets
   a state study or annotation when that translation is meaningful.
5. Update the Figma inspection, screenshots, recovery inventory, and sync
   manifest. Run `npm run validate:sync`.

## Figma to repository

1. Inspect the changed Figma nodes, variables, styles, components, and nearby
   states before editing repository files.
2. Classify each accepted change by owner:
   - portable variable or style value: promote it to
     `tokens/jbm.tokens.json`, regenerate, then reconcile Figma to the generated
     mapping;
   - meaning, vocabulary, or promotion rule: update `DESIGN.md` and add a
     decision record when the boundary changed;
   - browser behavior: implement and verify it in the reference site;
   - visual composition: keep Figma as owner and update the repository receipt,
     screenshots, and sync manifest.
3. Resolve conflicts in the owning form. Never make last-write-wins an
   implicit policy.
4. Verify every core form has an explicit completion state.

This workflow lets Sergio change the system in Figma and ask the repository to
sync, or change it through the repository and expect Figma to catch up.

## Token invariant

`tokens/jbm.tokens.json` is the canonical portable-value file.
`tokens/jbm.figma.json`, browser CSS, and the token reference are generated
views. The live Figma variables and styles must match their generated targets.
If a Figma experiment proposes a new portable value, it is not canonical until
that value is deliberately promoted and regenerated.

A feature does not require a new token merely because it is new. Reusing an
existing role is a valid result only after exact live parity is verified and
recorded.

## Consumer boundary

Biblioteca and other consumer products are interpretations, not core JBM forms.
They do not inherit upstream changes automatically. Adoption remains an
explicit product decision with its own implementation and verification.

## Verification

Run:

```sh
npm run validate:sync
npm run verify
```

The offline validator checks the repository receipt and required evidence. A
live reconciliation additionally inspects the editable Figma file and refreshes
its checkpoint before the repository receipt is committed.
