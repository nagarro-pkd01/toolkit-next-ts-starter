# Toolkit Next TS Starter

Enterprise-ready [Next.js](https://nextjs.org) starter with strict TypeScript, projen metadata, Biome, git hooks, CI, and release automation.

## Included Defaults

- Projen project metadata and synthesis entrypoint (`.projenrc.js`)
- Next.js App Router with strict TypeScript and typed routes
- Route-grouped App Router with `providers.tsx`, `error.tsx`, and `not-found.tsx`
- Feature-first `modules/` layer for business logic
- Atomic design UI layer under `components/ui`, `molecules`, `organisms`, `templates`
- Design tokens and theming foundations under `design-system/`
- Dedicated API/service layer under `services/`
- Global hooks, store, and shared `lib` error/logging utilities
- Biome for linting + formatting
- Lefthook + lint-staged + commitlint for commit quality
- Conventional commits and semantic-release automation
- CI workflow and NPM publish workflow
- Starter logging utility and documentation for operational consistency
- Starter templates for Cursor and Claude skill workflows

## Project Structure

```
src/
  app/
    (auth)/
    (shop)/
    (dashboard)/
    api/
    providers.tsx
  modules/
    auth/
    product/
    cart/
    user/
    checkout/
  components/
    ui/
    molecules/
    organisms/
    templates/
  design-system/
    tokens/
    theme/
  services/
    http/
    api-clients/
  hooks/
  store/
  lib/
    logger/
    errors/
  styles/
  types/
docs/
  BRANCHING_STRATEGY.md
  LOGGING.md
  CURSOR_SKILLS.md
  CLAUDE_SKILLS.md
.cursor/skills/release-readiness/SKILL.md
.claude/skills.md
```

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Bootstrap via npm (shared enterprise starter)

```bash
npx toolkit-next-ts-starter@latest my-app
cd my-app
npm install
npm run dev
```

### Multi-client demo

```bash
http://localhost:3000?client=acme
http://localhost:3000?client=globex
```

## Quality Gates

```bash
npm run lint
npm run typecheck
npm run build
npm run validate
```

## Git and Commit Workflow

- Branch naming strategy: see `docs/BRANCHING_STRATEGY.md`
- Conventional commits are validated with `commitlint`
- Hooks:
  - pre-commit: `lint-staged`
  - commit-msg: `commitlint`
  - pre-push: `npm run typecheck`

## Release + NPM Publishing

- Semantic release configuration: `.releaserc.json`
- GitHub workflow: `.github/workflows/release.yml`
- Detailed publishing runbook: `docs/NPM_PUBLISHING.md`
- Enterprise rollout checklist: `docs/ENTERPRISE_ADOPTION.md`
- Required secrets:
  - `NPM_TOKEN`
  - `GITHUB_TOKEN` (provided by GitHub Actions runtime)

Commits on `main` trigger automated versioning, changelog updates, GitHub release, and NPM publish.

## Troubleshooting

- If route type errors appear after moving pages, run `npm run build` once to refresh generated Next route types.
- `npm run typecheck` already runs `next typegen` before TypeScript checking.

## Projen

This repo includes a projen entrypoint (`.projenrc.js`) for project metadata ownership.

```bash
npm run projen
```

Run this after changing `.projenrc.js` to synthesize managed artifacts.
