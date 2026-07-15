# Joyful Brutalist Minimalism — agent guidance

This repository holds Sergio's authored web design practice. It is not a shared
application framework and it does not own the product code of sites that use or
influence the language.

## Sources of truth

- `DESIGN.md` owns meaning: principles, vocabulary, selection criteria,
  accessibility rules, and guidance about when a pattern belongs.
- The linked Figma file owns visual exploration and committed visual decisions:
  variables, styles, components, patterns, and studies.
- The reference site owns browser truth: responsiveness, interaction, motion,
  progressive enhancement, and reduced-motion behavior.
- Token files own portable named values and their mappings to platform code.

When these forms disagree, do not silently synchronize them. Identify whether
the conflict concerns meaning, visual representation, browser behavior, or a
portable value; resolve it in the corresponding source of truth and document
the translation.

## Design boundaries

- Treat Joyful Brutalist Minimalism as an authored language, not a generic UI
  kit. Prefer distinctive editorial and inspectable patterns over a catalog of
  generic controls.
- Consumer repositories interpret the language. They do not automatically
  inherit changes from this repository or Figma.
- Visible geometry must carry information, expose an action, clarify structure,
  or make behavior easier to perceive.
- Delight must be useful, restrained, accessible, and optional under reduced
  motion. Do not stack unrelated effects.
- Technical diagrams must encode real concepts or data. Do not invent
  measurements, controls, or scientific-looking decoration.
- External references are study material. Extract principles and interaction
  contracts; do not copy proprietary assets or implementations.

## Repository hygiene

- Keep evergreen documents free of temporary priority lists and open-ended
  roadmap sections. Use dated files in `docs/brainstorms/` and `docs/plans/`,
  plus GitHub issues, for active work.
- Preserve source links and explain provenance when a pattern is promoted from
  another project.
- Use `codex/` branches for implementation work. Stage intended paths only,
  verify in proportion to the change, commit, push, and open or update the pull
  request.
- Do not edit consumer repositories while researching them unless the user
  explicitly expands the task to those repositories.

