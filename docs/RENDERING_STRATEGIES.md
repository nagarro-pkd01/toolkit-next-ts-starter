# Rendering Strategies in This Starter

This project demonstrates the main Next.js App Router rendering models with working routes under `/rendering`. Each example is intentionally small so you can compare behavior in dev tools, build output, and the UI.

## Quick map

| Route | Strategy | Config / mechanism | Why we use it here |
|-------|----------|-------------------|-------------------|
| `/rendering` | Static hub | Default static page | Navigation only; no request-time data |
| `/rendering/static` | **SSG** (static) | `dynamic = 'force-static'` + `fetch(..., { cache: 'force-cache' })` | Marketing/legal pages, docs, anything identical for all users |
| `/rendering/dynamic` | **SSR** (dynamic) | `dynamic = 'force-dynamic'` + `cache: 'no-store'` | Personalized or real-time data (cart, session, live API) |
| `/rendering/isr` | **ISR** | `revalidate = 60` + `fetch` with `next: { revalidate: 60 }` | Product catalogs, blogs, dashboards that can be slightly stale |
| `/rendering/streaming` | **Streaming** | `<Suspense>` + slow async Server Component | Faster first paint while slow sections load |
| `/rendering/client` | **CSR** (client) | `"use client"` + `useEffect` fetch | Browser-only APIs, user interactions, client polling |
| `/` (shop) | Dynamic SSR | `force-dynamic` on route | Health check must reflect current server state |
| `/dashboard` | Dynamic SSR | `force-dynamic` | Posts list always fetched on the server per request |
| `/sign-in` | Static | No dynamic APIs | Form shell; auth handled client-side later |

Build output symbols (from `next build`):

- **○** — static (prerendered)
- **ƒ** — dynamic (server-rendered on demand)

## 1. Static (SSG)

**What:** HTML is generated at build time (or prerendered once) and reused.

**In this repo:** `app/(rendering)/rendering/static/page.tsx` exports `dynamic = 'force-static'`. Data is loaded with `fetch(..., { cache: 'force-cache' })`.

**When to choose:** Content is the same for every user and changes only on deploy (or via on-demand revalidation).

**Trade-off:** Fast CDN delivery; not suitable for cookies, headers, or per-user data without extra patterns.

## 2. Dynamic (SSR)

**What:** The server renders HTML on each request (or when the route is first hit after cache miss).

**In this repo:** Shop home, dashboard, and `/rendering/dynamic` use `force-dynamic` and/or `cache: 'no-store'`.

**When to choose:** Request-specific data (auth, geo, A/B), frequently changing data, or you must never serve a stale page.

**Trade-off:** Higher TTFB and server load than static/ISR; always fresh.

## 3. ISR (Incremental Static Regeneration)

**What:** A static page is served from cache, then regenerated in the background after `revalidate` seconds.

**In this repo:** `/rendering/isr` sets `export const revalidate = 60`. The sample `fetch` also uses `next: { revalidate: 60 }`.

**When to choose:** High traffic pages that can be stale for a short window (e.g. 60s–1h).

**Trade-off:** Great performance with fresher data than pure SSG; not real-time.

## 4. Streaming

**What:** The server sends HTML in chunks. Fast shell first; slow parts stream in when ready.

**In this repo:** `/rendering/streaming` wraps a delayed async component in `<Suspense>`. `loading.tsx` shows the route-level fallback.

**When to choose:** Pages with slow third-party or DB sections where the header/layout should appear immediately.

**Trade-off:** More moving parts; design good fallbacks (skeletons).

## 5. Client-side rendering (CSR)

**What:** The browser downloads JS and fetches data after hydration.

**In this repo:** `/rendering/client` uses `ClientPostsPanel` calling `/api/rendering/sample-posts`.

**When to choose:** Heavy interactivity, browser APIs, or data that must not run on the server.

**Trade-off:** Slower meaningful paint; SEO needs extra care unless paired with server HTML.

## 6. Our HTTP client vs `fetch` caching

`services/http/client.ts` uses plain `fetch` without Next cache options. Rendering examples use **native `fetch` with explicit cache options** in `services/rendering/fetchExamplePosts.ts` so Next can apply static/ISR/dynamic behavior.

Feature code can follow the same pattern or extend the shared client when you standardize cache defaults.

## 7. Layout shell config (related)

Header/footer visibility is **not** a rendering strategy; it is configured in `constants/layoutConfig.ts` per layout (`shop`, `dashboard`, `auth`). See README for `?client=` overrides.

## How to verify

```bash
npm run build
# Check route table for ○ vs ƒ

npm run dev
# Open /rendering and each sub-route; note "Fetched at" timestamps
# Refresh /rendering/isr within 60s — timestamp may stay stable, then update
```

## Further reading

- Next.js docs in `node_modules/next/dist/docs/` (this starter targets Next.js 16)
- [Caching guide](https://nextjs.org/docs/app/guides/caching) on nextjs.org
