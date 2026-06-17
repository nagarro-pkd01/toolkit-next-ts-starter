# Engineering Rules

This document is the project-level rulebook for TypeScript, ESLint, React, Next.js, and SCSS work.
Humans and AI agents should read it before implementing code changes.

The executable gates are:

- `npm run lint` for ESLint and Prettier.
- `npm run typecheck` for Next.js route types and TypeScript.
- `npm run test` for unit/component tests.
- `npm run build` for production build validation.

Use this document to understand the standards behind those gates and to make consistent decisions
before a tool catches a problem.

## Before Editing

1. Read `AGENTS.md`.
2. Read the relevant Next.js guide in `node_modules/next/dist/docs/` before changing `src/app/`,
   routing, metadata, caching, layouts, server components, or route handlers.
3. Read `docs/NAMING_CONVENTIONS.md`.
4. Read the closest folder `README.md`.
5. Make the smallest change that satisfies the requirement.
6. Verify with the narrowest useful command first, then broader gates when the change is risky.

## TypeScript Rules

- Keep `strict` TypeScript clean. Do not loosen `tsconfig.json` to make a feature compile.
- Do not use `any`. Model unknown data with `unknown`, validate it, then narrow it.
- Prefer precise domain types in `src/types/` or beside the owning feature/service.
- Keep type names in PascalCase and avoid redundant suffixes such as `UserInterface` or
  `ProductType`.
- Prefer `type` for unions, mapped types, and component props. Use `interface` when extension or
  declaration merging is intentionally useful.
- Use `import type` for type-only imports.
- Do not suppress errors with `@ts-ignore`. If a suppression is unavoidable, use `@ts-expect-error`
  with a short reason and remove it as soon as the upstream type issue is fixed.
- Avoid broad casts such as `as any` or double casts. If a cast is needed, keep it close to a
  validated boundary.
- Keep runtime validation at external boundaries: environment variables, API responses, route
  params, local storage, and third-party SDK payloads.
- Do not export raw provider response shapes across the app unless they are the chosen application
  contract.
- Keep async functions explicit about failures. Return stable application errors rather than leaking
  provider-specific exceptions through feature boundaries.
- Respect `forceConsistentCasingInFileNames`: import paths must match real file and folder casing.

## ESLint and React Rules

- Treat `eslint.config.mjs` as the source of enforced JavaScript, TypeScript, React, and Next.js
  rules.
- Keep `@typescript-eslint/no-explicit-any` as an error.
- Do not disable ESLint rules inline unless there is a documented reason on the same line or the
  line above.
- Keep React hooks at the top level. Do not call hooks conditionally or inside callbacks.
- Include all required effect dependencies. If an effect would loop, restructure the code instead of
  hiding the dependency.
- Clean up every side effect created by a component or utility: event listeners, observers, timers,
  subscriptions, pending requests, and external SDK handlers.
- Prefer derived values over duplicated state. Store state only when the value changes over time and
  cannot be derived cheaply from props or existing state.
- Keep client components intentional. Add `"use client"` only for browser APIs, React state/effects,
  event handlers, or client-only libraries.
- Server Components are the default in `src/app/` and page-level route code.
- Do not import server-only code into client components.
- Use direct imports for components so unrelated modules and styles do not enter the same route
  bundle through broad barrels.
- Do not add new barrel files unless they define a deliberate public API for a feature or package.

## Next.js Rules

- `src/app/` is for routing, layouts, loading/error/not-found states, metadata, route handlers, and
  route-level caching decisions.
- Keep `page.tsx` files thin. Route UI should be imported from `src/features/` or the agreed
  application layer.
- Framework filenames keep Next.js-required names: `page.tsx`, `layout.tsx`, `route.ts`,
  `loading.tsx`, `error.tsx`, and `not-found.tsx`.
- Read the installed Next.js docs before changing App Router behavior. This project targets Next.js
  16, which may differ from older guidance.
- Prefer route-specific metadata near the route and shared defaults in `src/app/layout.tsx`.
- Do not add client-side data fetching when a Server Component or route handler is the better fit.
- Be explicit about caching, revalidation, and dynamic rendering. Do not rely on accidental default
  behavior for production-critical data.
- Keep API route handlers thin. Put reusable business or integration behavior in services or the
  owning feature.

## SCSS Rules

- Use SCSS modules for component styles: `ComponentName.module.scss`.
- Keep component styles colocated with the component they style.
- Use `src/styles/globals.scss` only for document defaults, global resets, CSS variables, and truly
  global behavior.
- Use `@use`; do not add new `@import`.
- Prefer design-system CSS variables and tokens over raw colors, spacing, typography, and radius
  values.
- Keep selectors shallow. Avoid styling by distant ancestors or page-specific global selectors.
- Avoid `!important`. If specificity is painful, simplify the selector or component boundary.
- Do not style elements outside the component's ownership boundary from a module file.
- Use semantic class names based on role, not visual appearance alone.
- Keep responsive rules close to the selector they modify. Prefer shared breakpoints from
  `src/styles/breakpoints.scss`.
- Avoid one-off pixel magic. Use tokens or document why a specific value is required.
- Respect accessibility in styles: visible focus states, sufficient contrast, reduced-motion support,
  and no layout that depends only on color.
- Prefer stable dimensions for repeated UI such as cards, buttons, grids, panels, and toolbar items
  to avoid layout shift.

## File and Folder Rules

- Follow `docs/NAMING_CONVENTIONS.md`.
- Component files are PascalCase: `UserCard.tsx`.
- SCSS modules match the component: `UserCard.module.scss`.
- Non-component utility and service files use the project's chosen convention and should stay
  consistent with nearby files.
- Folders should be kebab-case unless the folder is a Next.js route group or existing local
  convention requires otherwise.
- Keep tests and stories close to the code they verify.
- Update the nearest `README.md` when moving responsibilities between folders.

## Quality Rules

- Add or update tests when behavior changes, especially for utilities, data transformations,
  business rules, and error handling.
- For UI changes, verify accessible labels, keyboard behavior, focus states, loading state, empty
  state, and error state.
- For performance-sensitive work, check bundle impact and avoid broad imports.
- For logging, analytics, and telemetry, never include passwords, tokens, cookies, authorization
  headers, or personal data.
- For API work, cover success, validation failure, authentication failure, authorization failure,
  server failure, and network failure where applicable.
- For security-sensitive work, update docs or ADRs when introducing a new trust boundary,
  third-party script, cookie, token, or external endpoint.

## AI Agent Checklist

Before implementing:

- Confirm the requested scope in one or two sentences.
- Identify the owning folder and nearest README.
- Inspect existing patterns before creating new abstractions.
- Prefer direct edits over broad refactors.
- Avoid touching unrelated dirty files.

While implementing:

- Keep changes small and traceable to the request.
- Preserve existing public contracts unless asked to change them.
- Add comments only where they clarify non-obvious decisions.
- Do not silence tooling. Fix the cause or report the blocker.

Before finishing:

- Run the most relevant checks.
- Report exactly what changed and which checks passed or failed.
- If a check fails because of unrelated existing issues, name the files and errors briefly.

## What We Can Improve Next

These are recommended upgrades that make the standards more enforceable:

- Add Stylelint with `stylelint-config-standard-scss` so SCSS rules are machine-checked, not only
  documented.
- Add import-boundary rules so shared code cannot import feature code and route files stay thin.
- Add environment validation with a schema library so invalid production config fails fast.
- Add a CODEOWNERS file once real domain and platform teams exist.
- Add PR checklist items for metadata, accessibility, security headers, logging redaction, and
  environment changes.
- Add architecture tests for forbidden imports and casing-sensitive paths.
- Add a generated starter summary that tells adopters which defaults are included and which files
  they must replace.
