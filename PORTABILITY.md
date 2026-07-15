# Portability

A clean clone plus documented public prerequisites must be sufficient to
understand, run, verify, recover, and continue Joyful Brutalist Minimalism.
Prior chats, host memory, private skills, and current account state are useful
accelerators; they are never sources of truth.

This is a deliberately small contract. It does not require a container or try
to rebuild Figma automatically.

## Fresh-machine bootstrap

Install Git, the exact Node version in [`.node-version`](.node-version), and
the exact `uv` version in the [v1 checkpoint](docs/releases/v1-portability.json).
The declared npm version lives in `package.json`. Then run:

```sh
git clone https://github.com/chekos/joyful-brutalist-minimalism.git
cd joyful-brutalist-minimalism
npm run bootstrap
npm run verify
```

`bootstrap` refuses incompatible tool versions, installs the locked npm
dependencies and Chromium, and runs the local doctor. `verify` checks the
repository contracts, builds the reference site, and runs browser,
accessibility, and visual regression tests. `npm run doctor` can be run alone
for explicit repair guidance.

The only network-dependent validation outside bootstrap is
`npm run validate:spec`, which fetches the published DTCG schema through a
pinned `check-jsonschema` version. The ordinary `npm run check` remains
offline-capable after bootstrap.

## Capability boundary

| Capability | Needed for | No-access fallback |
| --- | --- | --- |
| Filesystem, Git, Node, npm, and `uvx` | Local authoring and complete verification | None; `npm run doctor` names the missing prerequisite |
| GitHub account | Pushing, pull requests, issues, Actions, and Pages | Work and verify locally; durable design truth remains in Git |
| Figma account with file access | Direct visual exploration and component editing | Use the committed inventory, screenshots, mappings, and inspection receipt; do not claim the live file was inspected |
| Cloudflare access | Managing the `jbm.bns.studio` DNS boundary | The GitHub Pages deployment remains repository-owned; do not change DNS |

No repository command requires a secret. Authentication stays in each tool's
credential store and must never be copied into files, examples, or snapshots.

## Repository-owned external inventory

- GitHub repository: <https://github.com/chekos/joyful-brutalist-minimalism>
- Editable Figma source: <https://www.figma.com/design/T4jEmsyQBURKMr6s3zYfFJ>
- Published browser specimen: <https://jbm.bns.studio>
- Figma recovery contract:
  [`docs/figma/v1/recovery-manifest.json`](docs/figma/v1/recovery-manifest.json)
- Known-good artifact checksums:
  [`docs/releases/v1-portability.json`](docs/releases/v1-portability.json)

External tools may disappear or be inaccessible to a future account. The
repository therefore records what each one owns and the smallest honest
fallback, rather than treating connector access as ambient context.

## Backup and recovery

### Git and repository state

Create an off-machine mirror with:

```sh
git clone --mirror https://github.com/chekos/joyful-brutalist-minimalism.git
```

The mirror preserves Git objects and refs. GitHub issues, pull requests, and
settings are service metadata, not part of that clone; accepted design judgment
must therefore be promoted into the owning repository artifact and, when
cross-cutting, a [decision record](docs/decisions/README.md).

### Figma

From the editable file, use **File → Save local copy** and save the result as
`backups/figma/jbm-v1.fig`. The directory is intentionally ignored by Git.
Calculate its checksum with:

```sh
shasum -a 256 backups/figma/jbm-v1.fig
```

Record the path or approved release-asset URL and checksum in
`snapshot.current` inside the recovery manifest. A `.fig` local copy excludes
comments and version history; importing it creates an independent file whose
components no longer link to the original library. The committed inventory,
token mappings, inspection result, and screenshots make that import auditable.

## Optional release checkpoint

The repository is prepared for, but does not create, `v1.0.0`. After separate
owner approval:

1. Run `npm run bootstrap`, `npm run validate:spec`, and `npm run verify` from a
   clean clone.
2. Export and checksum the `.fig` snapshot, update the recovery and checkpoint
   manifests, and commit those records.
3. Tag the verified commit as `v1.0.0` and create a GitHub Release.
4. Attach the `.fig` snapshot using the release asset name declared in the
   recovery manifest, then verify its downloaded SHA-256 checksum.

Restore by cloning the tag, running the bootstrap and verification commands,
and importing the checksum-verified `.fig` asset into the destination account.
