# HTTP Service

This folder provides the shared fetch-based HTTP foundation.

## Contents

- `client.ts` creates typed clients with a base URL, headers, and HTTP methods.
- `interceptors.ts` records request outcomes and timing through the shared logger.

## How to use

Create backend-specific instances in `src/services/api-clients/`, then call those clients from
feature API modules. Let errors propagate as `AppError` so the UI or server boundary can decide how
to present them.

Add cross-cutting transport behavior here only when it should apply broadly. Do not log request
bodies, query secrets, tokens, or sensitive response data.
