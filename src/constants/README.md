# Constants

This folder contains stable application configuration and named values shared across features.

## Contents

- Environment-derived configuration
- Typed route paths
- Layout and navigation configuration
- Theme keys and performance thresholds

## How to use

Use `UPPER_SNAKE_CASE` for exported constant objects and keep related values in focused files.
Export broadly shared values through `index.ts`.

Do not place mutable state, request results, or secrets here. Browser-visible variables prefixed
with `NEXT_PUBLIC_` are bundled into client code and must never contain credentials.
