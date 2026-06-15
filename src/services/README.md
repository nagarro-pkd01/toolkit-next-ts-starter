# Services

This folder contains external integrations, API access, and feature-level operations that should
remain separate from presentation code.

## Layers

- `api-clients/` configures backend-specific HTTP clients.
- `http/` provides shared transport and interception behavior.
- Feature folders such as `auth/` and `posts/` contain API calls, business operations, and query
  hooks.
- `analytics/` integrates user-behavior analytics.
- `rendering/` supports the rendering-strategy examples.

## How to use

UI calls a feature hook or service. A feature service calls its API function, which uses a configured
API client. This keeps URLs, transport behavior, business rules, and UI concerns separate.

Do not import React components into services. Avoid returning raw provider-specific shapes beyond
the service boundary when a stable application type can be used instead.
