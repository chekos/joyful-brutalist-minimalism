# Joyful Brutalist Minimalism v1 verification

This receipt verifies the v1 design language across its four authorities:
meaning, portable values, visual representation, and browser behavior. It also
records the adoption and publication boundaries required by
[issue #7](https://github.com/chekos/joyful-brutalist-minimalism/issues/7).

## Release ledger

| Phase | Durable receipt |
| --- | --- |
| Constitution and portable foundations | [Issue #3](https://github.com/chekos/joyful-brutalist-minimalism/issues/3), [pull request #4](https://github.com/chekos/joyful-brutalist-minimalism/pull/4), [`DESIGN.md`](../DESIGN.md), and the [token reference](token-reference.md) |
| Figma foundations, components, and studies | [Issue #5](https://github.com/chekos/joyful-brutalist-minimalism/issues/5), [pull request #8](https://github.com/chekos/joyful-brutalist-minimalism/pull/8), the [editable Figma source](https://www.figma.com/design/T4jEmsyQBURKMr6s3zYfFJ), and its [inspection receipt](figma-v1.md) |
| Executable browser specimen | [Issue #6](https://github.com/chekos/joyful-brutalist-minimalism/issues/6), [pull request #9](https://github.com/chekos/joyful-brutalist-minimalism/pull/9), and the [reference-site receipt](reference-site-v1.md) |
| Adoption, final verification, and publication | [Issue #7](https://github.com/chekos/joyful-brutalist-minimalism/issues/7), [pull request #10](https://github.com/chekos/joyful-brutalist-minimalism/pull/10), [publication pull request #11](https://github.com/chekos/joyful-brutalist-minimalism/pull/11), the [successful Pages deployment](https://github.com/chekos/joyful-brutalist-minimalism/actions/runs/29388865075), and the [adoption guide](../ADOPTION.md) |
| Deployment-scoped colorways | [Issue #31](https://github.com/chekos/joyful-brutalist-minimalism/issues/31), [decision 0004](decisions/0004-colorways-are-deployment-scoped.md), the [Figma receipt](figma-v1.md), and the [reference-site receipt](reference-site-v1.md) |

## Repository verification

The release contract is reproducible from a clean dependency install:

```sh
npm ci
npm run validate:spec
npm run verify
```

The checks cover the official DTCG 2025.10 schema, JBM token mappings,
round-trip sync evidence, provenance, aliases, contrast, reduced-motion values,
generated parity, formatting, TypeScript, unit tests, the static Astro build,
Chromium behavior and accessibility tests, and visual-regression surfaces.

## Live Figma verification

Programmatic inspection of the live file and a native screenshot review passed
again on 2026-07-16:

- the six pages remain in their approved order;
- `JBM Primitives` contains 28 variables and `JBM Semantics` contains 12;
- all 40 variables have deliberate scopes and canonical WEB code syntax;
- all 12 semantic variables remain aliases in complete `Terra`, `Sage`, and
  `Sky` modes, with Terra as the default;
- four text styles and two effect styles remain local and named;
- seven described component sets contain 23 auto-layout variants with exposed
  properties, bound values, and styled text; and
- the Technical Figure expresses one system through four owning forms;
- the Principle Index keeps all eight adjacent anchors visible, classifies each
  once, and explicitly avoids claiming reading progress;
- the Earned Scale study records the accepted 48px-to-32px reduction test while
  leaving the Plate component grid unchanged; and
- Contextual Marginalia records the default register, active-note, and
  narrow/print states without being promoted to a component; and
- the bound Foundations colorway preview records one deployment mode at a time,
  Kicker tones use semantic names, and palette families no longer encode the
  Principle Index taxonomy.

The durable machine inventory and full-page images live in
[`docs/figma/v1`](figma/v1). The document root also holds the verified
`jbm_dsb/checkpoint_foundations`, `checkpoint_components`,
`checkpoint_contextual_marginalia`, `checkpoint_earned_scale`, and
`checkpoint_colorways`, plus `final_validation` records because the connector
runtime cannot create named Figma version-history entries. The final audit also records
`jbm_dsb/v1_release_verification` on document node `0:0`; its status is
`published` and it links issue #7, the publication pull request and deployment,
and the live reference site without changing any visual node.

## Browser verification

The browser suite verifies desktop and mobile composition, keyboard entry and
visible focus, pointer hover state, reduced-motion behavior, complete
no-JavaScript content and fragment navigation, semantic structure, and an axe
scan with no automatically detectable violations. It also verifies Terra as
the whole-document default, Sage and Sky as complete alternate mappings, one
pressed preview state, an unknown-value Terra fallback, and neutral taxonomy
cues.

Representative evidence:

- [desktop composition](reference-site/v1/desktop-hero.png);
- [mobile composition](reference-site/v1/mobile-hero.png);
- [keyboard focus](reference-site/v1/keyboard-focus.png);
- [reduced-motion state](reference-site/v1/reduced-motion.png); and
- [Technical Figure](reference-site/v1/technical-figure.png);
- [Terra colorway](reference-site/v1/colorway-terra.png);
- [Sage colorway](reference-site/v1/colorway-sage.png); and
- [Sky colorway](reference-site/v1/colorway-sky.png).

The reduced-motion evidence confirms that optional movement resolves
immediately while content and focus remain intact. The executable assertions
also confirm that the static principle index requires no current-mark transform
or animated reading status and that all eight destinations remain present.

## Cross-medium agreement

| Concern | Repository tokens | Figma | Browser |
| --- | --- | --- | --- |
| Vocabulary and roles | Canonical names and aliases | Matching variable and style names | Matching semantic custom properties and labels |
| Deployment colorway | Terra fallback plus complete Terra, Sage, and Sky semantic mappings | Three semantic modes and a bound Foundations preview | One root attribute switches the whole specimen; Terra remains the no-JavaScript fallback |
| Paper and pressure | Surface, rule, radius, and shadow values | Ground, Rule, and Plate forms | Responsive paper surfaces with hard edges and restrained pressure |
| Authority exchange | Four owned concerns in `DESIGN.md` | Original Technical Figure | Semantic figure plus complete text equivalent |
| Principle index | Eight principles and four lenses | Static Principle Index study with honest count bars | One content dataset drives adjacent fragment links, counts, and ledger without fake progress |
| Earned scale | Reduction test in `DESIGN.md`; no new portable value | Accepted 48px-to-32px comparison study | Restrained thesis, support, section, and specimen type; hero remains the sole display moment |
| Contextual Marginalia | Existing named values verified as sufficient | Register, active-note, and narrow/print study states | Executable pointer, focus, activation, responsive, print, and reduced-motion behavior |
| Access | Contrast and reduced-motion contracts | Visible focus and state specimens | Keyboard, pointer, touch-sized targets, reflow, reduced motion, and no-JavaScript behavior |

Intentional medium differences remain explicit. Figma owns editable geometry,
styles, component properties, and studies. The browser owns focus order,
fragment navigation, responsive reflow, authored scrollbar behavior, motion
resolution, and the no-JavaScript baseline. The
canonical token file owns portable values. [`SYNC.md`](../SYNC.md) makes the
repository and Figma peer entry points and requires an explicit parity state in
every core form. These are translations, not hidden disagreements.

## Adoption and licensing

[`ADOPTION.md`](../ADOPTION.md) teaches a person or agent to select the smallest
relevant pattern, map it into local semantics, verify access, and record
intentional divergence without making a consumer depend on this repository.
No consumer repository was changed.

The repository remains intentionally unlicensed. Public visibility, the Figma
link, and this adoption workflow do not grant permission to reuse
documentation, code, or visual assets.

## Approved publication path

Sergio approved `https://jbm.bns.studio` as the permanent v1 URL on
2026-07-14. The repository publishes its static `dist` artifact through the
`github-pages` environment using [the dedicated deployment workflow](../.github/workflows/deploy-pages.yml).

The domain contract is intentionally narrow:

- GitHub Pages uses the workflow build type and owns deployment and TLS;
- the repository Pages setting names `jbm.bns.studio` as its custom domain;
- Cloudflare DNS holds one DNS-only CNAME from `jbm.bns.studio` to
  `chekos.github.io`; and
- HTTPS is enforced after GitHub provisions and validates the certificate.

Publication is complete only after the workflow succeeds and the custom URL is
verified over HTTPS for content, assets, accessibility, and representative
browser behavior.

## Publication verification

Publication completed on 2026-07-14:

- [pull request #11](https://github.com/chekos/joyful-brutalist-minimalism/pull/11)
  merged the dedicated Pages workflow and canonical production URL;
- [deployment run 29388865075](https://github.com/chekos/joyful-brutalist-minimalism/actions/runs/29388865075)
  built and deployed commit `7c4899f829adfad343f43ac999c733d4419e0c9e`;
- the Pages API reports `build_type: workflow`, custom domain
  `jbm.bns.studio`, and HTTPS enforcement enabled;
- authoritative DNS resolves the DNS-only CNAME to `chekos.github.io`; and
- [https://jbm.bns.studio](https://jbm.bns.studio) returns the v1 specimen with
  the matching canonical URL and deployed stylesheet over a valid certificate.

A live Chromium smoke repeated the title, eight-principle ledger, four-node
authority figure, keyboard entry, reduced-motion, no-JavaScript, and axe
checks against the public URL. HTTP redirects to HTTPS, and the live response
contains no mixed-content asset references.
