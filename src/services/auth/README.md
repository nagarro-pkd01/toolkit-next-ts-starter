# Authentication Service

This folder owns the authentication feature's types, API calls, service facade, and React Query
mutation hook.

## Request flow

`useLogin` calls `loginApi`, which sends the request through `authClient`. `authService` provides a
framework-independent facade for callers that do not need React Query.

## How to use

Use `useLogin()` in client components and call `mutate` or `mutateAsync` with credentials. Use
`authService` from non-React application logic.

Add related authentication operations in separate API and hook files. Never log passwords, tokens,
session cookies, or full authorization headers.
