# App Router

This folder is the Next.js App Router entrypoint. Its filesystem structure defines URLs, layouts,
loading states, error boundaries, and server route handlers.

## Structure

- Route groups such as `(auth)` organize routes without changing their URL.
- `api/` contains server-side Route Handlers.
- `layout.tsx` owns the root document and global providers.
- `providers.tsx` composes client providers required by the application.
- `error.tsx` and `not-found.tsx` handle framework error states.

## How to use

Keep `page.tsx` files thin: import and render the matching page from `src/views/`. Use `route.ts` for
HTTP endpoints and keep reusable business or integration logic in `src/services/`.

Server Components are the default. Add `"use client"` only when a file needs browser APIs, state,
effects, event handlers, or a client-only library. Framework filenames keep their required names
even when they differ from general naming conventions.
