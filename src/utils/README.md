# Utilities

This folder contains framework-light helpers and cross-cutting technical utilities.

## Areas

- `errors/` standardizes application errors and handling.
- `logger/` provides structured logging through Pino.
- `performance/` measures and reports browser performance.
- `theme/`, `layout/`, and `rendering/` contain focused helper functions.
- `cn.ts` combines conditional class names.

## How to use

Utilities should be small, deterministic where possible, and independent of page presentation.
Export commonly used helpers through `index.ts`.

If code owns a business workflow or external integration, place it in `src/services/` instead. If
it owns React lifecycle or state composition, it is usually a hook or provider.
