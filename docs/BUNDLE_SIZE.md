# Bundle size tracking

Tracks **client JS/CSS** sizes after each production build, prints a console diff vs the previous run, and appends structured logs under `logs/bundle-size/`.

## When it runs

| Trigger | Command |
|---------|---------|
| **Post-commit** (local) | Lefthook runs `npm run analyze:bundle:build` after every `git commit` |
| **Manual** | `npm run analyze:bundle:build` |
| **CI** | GitHub Actions after `npm run build` |
| **Analyze only** | `npm run analyze:bundle` (requires existing `.next/`) |

Post-commit runs a full `next build`, so commits take longer. Skip when needed:

```bash
SKIP_BUNDLE_SIZE=1 git commit -m "docs: wip"
```

## Console output

Example:

```text
Bundle size report — commit a1b2c3d
feat: add dashboard posts

  Client JS:       548.2 KB (12 files)  +2.1 KB
  Client CSS:        8.4 KB (4 files)   ±0 B
  Client total:    556.6 KB               +2.1 KB
```

## Log files

All under `logs/bundle-size/` (gitignored except this README):

- **`latest.json`** — last snapshot (baseline for diffs)
- **`history.jsonl`** — machine-readable history (one JSON object per line)
- **`report.log`** — plain-text audit trail

## npm scripts

```bash
npm run analyze:bundle          # read .next only
npm run analyze:bundle:build    # build + report
npm run analyze:bundle:ci       # same as build (used in CI)
```

## CI

The `quality` job in `.github/workflows/ci.yml` runs bundle analysis after build and writes a summary to the GitHub Actions step summary when available.

## What is measured

Sums file sizes under `.next/static/chunks/*.js` and client CSS under `.next/static/`. This is a **practical proxy** for shipped client weight, not a full `@next/bundle-analyzer` breakdown.

For deep analysis, add `@next/bundle-analyzer` separately.

## Related

- `docs/PERFORMANCE_MONITORING.md` — runtime Core Web Vitals (browser)
- `docs/RENDERING_STRATEGIES.md` — static vs dynamic impact on TTFB/LCP
