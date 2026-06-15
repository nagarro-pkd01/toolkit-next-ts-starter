# Application Source

This folder contains the application code shipped by Next.js.

## Architecture

- `app/` defines routes, layouts, route handlers, and framework entrypoints.
- `views/` assembles page-level interfaces.
- `components/` contains generic primitives, templates, and domain-owned reusable UI.
- `providers/` owns application-wide React contexts and third-party providers.
- `services/` handles APIs, integrations, and feature operations.
- `hooks/` contains shared React hooks.
- `store/` contains shared Zustand client state.
- `constants/`, `types/`, and `utils/` contain shared foundations.
- `styles/` and `assets/` contain visual foundations and imported assets.

## Dependency direction

Routes should stay thin and delegate UI to views. Views compose components and call hooks or
services. Services may use API clients and utilities, but should not import page UI.

Use the `@/` path alias for imports rooted at `src/`. Follow `docs/NAMING_CONVENTIONS.md` when adding
files and folders.
