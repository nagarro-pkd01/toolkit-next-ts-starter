# Toolkit Next TS Starter

Enterprise-ready [Next.js](https://nextjs.org) starter with strict TypeScript, projen metadata, Biome, git hooks, CI, and release automation.

## Included Defaults

- Projen project metadata and synthesis entrypoint (`.projenrc.js`)
- Next.js App Router with strict TypeScript and typed routes
- Route-grouped App Router with `providers.tsx`, `error.tsx`, and `not-found.tsx`
- Layered `src/` layout: `views`, `services`, `hooks`, `store`, `utils`, `constants`
- Atomic design UI under `components/atoms`, `molecules`, `organisms`, `templates`
- Design tokens and theme under `styles/design-system/`
- Dedicated API/service layer under `services/` (including feature APIs such as `services/auth/`)
- Zustand stores, shared hooks, and `utils/` for errors and logging
- Biome for linting + formatting
- Lefthook + lint-staged + commitlint for commit quality
- Conventional commits and semantic-release automation
- CI workflow and NPM publish workflow
- Starter logging utility and documentation for operational consistency
- Starter templates for Cursor and Claude skill workflows
- Documented naming conventions (`docs/NAMING_CONVENTIONS.md`)
- Rendering strategy examples with docs (`/rendering`, `docs/RENDERING_STRATEGIES.md`)
- Vitest + React Testing Library (unit/component) and Playwright (E2E) - `docs/TESTING.md`

## Project Structure

```
src/
  app/                 # Next.js App Router (thin route re-exports)
    (auth)/
    (shop)/
    (dashboard)/
    api/
    providers.tsx
  views/               # Page views wired by app routes (not `pages/` — reserved by Next.js)
  components/
    atoms/
    molecules/
    organisms/
    templates/
  services/
    auth/
    http/
    api-clients/
  hooks/
  store/               # Zustand
  utils/
    logger/
    errors/
  constants/           # app routes + env config
  styles/
    design-system/
  assets/
  types/
docs/
  NAMING_CONVENTIONS.md
  RENDERING_STRATEGIES.md
  PERFORMANCE_MONITORING.md
  BUNDLE_SIZE.md
  TESTING.md
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

### Rendering strategy examples

Visit [http://localhost:3000/rendering](http://localhost:3000/rendering) for live demos of static (SSG), dynamic (SSR), ISR, streaming, and client rendering. See `docs/RENDERING_STRATEGIES.md` for when each approach is used in this starter and how to verify with `next build`.

### Performance monitoring

Core Web Vitals, long tasks, and memory growth heuristics run in the browser with in-app improvement tips when thresholds are exceeded. See `docs/PERFORMANCE_MONITORING.md`. Optional desktop alerts: `NEXT_PUBLIC_PERFORMANCE_NOTIFY=true`.

### Bundle size on commit

After each `git commit`, Lefthook runs a production build and prints client bundle size with a diff vs the previous commit. Logs are stored under `logs/bundle-size/`. See `docs/BUNDLE_SIZE.md`. Skip with `SKIP_BUNDLE_SIZE=1`.

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

## Security

Trivy filesystem scans (no account required): `npm run security:scan`, `npm run security:critical`.

## Quality Gates

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
npm run validate
```

## Git and Commit Workflow

- Branch naming strategy: see `docs/BRANCHING_STRATEGY.md`
- Commit message rules: see `docs/COMMIT_MESSAGES.md` (enforced by commitlint + CI)
- Hooks:
  - pre-commit: `lint-staged`
  - commit-msg: `commitlint`
  - pre-push: block direct push to `main`, `npm run test`, `npm run typecheck`

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
