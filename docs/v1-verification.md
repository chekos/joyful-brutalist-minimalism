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

## Repository verification

The release contract is reproducible from a clean dependency install:

```sh
npm ci
npm run validate:spec
npm run verify
```

The checks cover the official DTCG 2025.10 schema, JBM token mappings,
provenance, aliases, contrast, reduced-motion values, generated parity,
formatting, TypeScript, six unit tests, the static Astro build, eight Chromium
behavior and accessibility tests, and three visual-regression surfaces.

## Live Figma verification

Programmatic inspection of the live file and a native screenshot review passed
on 2026-07-14:

- the six pages remain in their approved order;
- `JBM Primitives` contains 28 variables and `JBM Semantics` contains 12;
- all 40 variables have deliberate scopes and canonical WEB code syntax;
- all 12 semantic variables remain aliases;
- four text styles and two effect styles remain local and named;
- seven described component sets contain 23 auto-layout variants with exposed
  properties, bound values, and styled text; and
- the Technical Figure and Reading Instrument remain source-tagged to their
  governing `DESIGN.md` sections.

The durable machine inventory and full-page images live in
[`docs/figma/v1`](figma/v1). The document root also holds the verified
`jbm_dsb/checkpoint_foundations`, `checkpoint_components`, and
`final_validation` records because the connector runtime cannot create named
Figma version-history entries. The final audit also records
`jbm_dsb/v1_release_verification` on document node `0:0`; its status is
`published` and it links issue #7, the publication pull request and deployment,
and the live reference site without changing any visual node.

## Browser verification

The browser suite verifies desktop and mobile composition, keyboard entry and
visible focus, pointer hover state, reduced-motion behavior, complete
no-JavaScript content and fragment navigation, semantic structure, and an axe
scan with no automatically detectable violations.

Representative evidence:

- [desktop composition](reference-site/v1/desktop-hero.png);
- [mobile composition](reference-site/v1/mobile-hero.png);
- [keyboard focus](reference-site/v1/keyboard-focus.png);
- [reduced-motion state](reference-site/v1/reduced-motion.png); and
- [Technical Figure](reference-site/v1/technical-figure.png).

The reduced-motion image records the fifth principle as current while the
media preference is active. The executable assertion additionally confirms
zero transition duration, no current-mark transform, automatic scroll
behavior, and all eight principles remaining present.

## Cross-medium agreement

| Concern | Repository tokens | Figma | Browser |
| --- | --- | --- | --- |
| Vocabulary and roles | Canonical names and aliases | Matching variable and style names | Matching semantic custom properties and labels |
| Paper and pressure | Surface, rule, radius, and shadow values | Ground, Rule, and Plate forms | Responsive paper surfaces with hard edges and restrained pressure |
| Authority exchange | Four owned concerns in `DESIGN.md` | Original Technical Figure | Semantic figure plus complete text equivalent |
| Principle reading | Eight principles and four lenses | Original Reading Instrument study | One content dataset drives marks, counts, status, and ledger |
| Access | Contrast and reduced-motion contracts | Visible focus and state specimens | Keyboard, pointer, touch-sized targets, reflow, reduced motion, and no-JavaScript behavior |

Intentional medium differences remain explicit. Figma owns editable geometry,
styles, component properties, and studies. The browser owns focus order,
viewport-derived reading state, native progress, fragment navigation,
responsive reflow, motion resolution, and the no-JavaScript baseline. The
canonical token file owns portable values. These are translations, not hidden
disagreements.

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
