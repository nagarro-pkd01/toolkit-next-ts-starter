# Testing

This starter uses **Vitest + React Testing Library (RTL)** for unit/component tests and **Playwright** for end-to-end (E2E) tests.

## Commands

| Command | Description |
|---------|-------------|
| `npm run test` | Run Vitest unit/component tests |
| `npm run test:watch` | Vitest watch mode |
| `npm run test:coverage` | Vitest with coverage report |
| `npm run test:e2e` | Playwright E2E (starts `next start` via config) |
| `npm run test:e2e:ui` | Playwright UI mode (local debugging) |
| `npm run validate` | lint + typecheck + **test** + build |

## Vitest + RTL

- **Config:** `vitest.config.mts` (uses Vite React plugin, `@/` aliases, CSS modules)
- **Setup:** `vitest.setup.ts` (`@testing-library/jest-dom/vitest`, `matchMedia` mock)
- **Location:** colocated `*.test.ts(x)` next to source (see `Button.test.tsx`, `rateMetric.test.ts`)

### What to test with Vitest

- Presentational components (atoms, molecules)
- Pure utilities and services (no DOM)
- Client components with user interactions (`userEvent`)

### What to test with Playwright instead

- Async Server Components and full page flows
- Navigation, layouts, and API integration
- Cross-route behavior

## Playwright

- **Config:** `playwright.config.ts`
- **Tests:** `e2e/*.spec.ts`
- **Server:** config runs `npm run start` on port 3000 (build first in CI)

### First-time setup (local)

```bash
npm run build
npx playwright install chromium
npm run test:e2e
```

### CI

GitHub Actions runs unit tests and E2E (Chromium) on every PR/push to `main` / `develop`.

## Conventions

- File names: `ComponentName.test.tsx`, `feature.spec.ts` (E2E)
- Use `screen` + roles from RTL (avoid test IDs unless necessary)
- E2E: prefer `getByRole`, `getByPlaceholder`, accessible names

## Related

- `docs/NAMING_CONVENTIONS.md`
- [Next.js testing docs](https://nextjs.org/docs/app/guides/testing)
