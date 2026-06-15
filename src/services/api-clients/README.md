# API Clients

This folder creates named HTTP clients for external systems and backend domains.

## Current clients

- `auth-client.ts` targets authentication endpoints.
- `internal-client.ts` targets this application's own API.
- `placeholder-client.ts` supports example post data.
- `strapi-client.ts` and `vtex-client.ts` are integration examples.

## How to use

Configure base URLs and default headers here using `createHttpClient`. Consume a client from a
feature API module instead of directly from UI code.

Do not embed credentials in client-side configuration. Server-only authentication and secret
headers must remain in server-only modules or Route Handlers.
