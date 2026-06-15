# Rendering Example Services

This folder supports the demonstration of Next.js static, dynamic, ISR, streaming, and client
rendering strategies.

## Contents

- `fetch-examples-posts.ts` applies the cache policy associated with each strategy.
- `rendering-examples.ts` defines the examples displayed by the rendering hub.

## How to use

Use these functions from rendering example routes and views only. When adding a strategy, update its
typed identifier, route, descriptive metadata, and cache behavior together.

See `docs/RENDERING_STRATEGIES.md` for the architectural explanation and verification steps.
