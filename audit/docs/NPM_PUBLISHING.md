# NPM Publishing Guide

This starter supports two modes:

1. **Repository mode** (clone and use directly)
2. **Scaffolding mode** (publish package and bootstrap via `npx`)

## Publish Prerequisites

- NPM account with publish access
- `NPM_TOKEN` configured in GitHub repository secrets
- Conventional commits enabled (already configured)
- `main` branch protected with passing CI

## Local Verification Before Publish

```bash
npm ci
npm run validate
npm pack --dry-run
```

Review packed files to ensure only starter assets are shipped.

## Automated Publish (recommended)

- Merge conventional-commit PR into `main`
- GitHub Action `release.yml` runs `semantic-release`
- Semantic release:
  - calculates version from commit history
  - updates changelog
  - creates GitHub release
  - publishes to npm

## Enterprise Consumption

After publishing:

```bash
npx toolkit-next-ts-starter@latest my-app
cd my-app
npm install
npm run dev
```

Use `--force` if the target directory is non-empty.
