# Client State Store

This folder contains shared client-side Zustand stores.

## Current stores

- `cart-store.ts` holds cart items.
- `user-store.ts` holds the active user profile.
- `ui-store.ts` holds shared interface state.
- `performance-store.ts` holds performance alerts and panel state.

## How to use

Import a store hook from `@/store` and select only the state or action a component needs. Keep store
state serializable where practical and put actions beside the state they modify.

Use local React state for component-only behavior and React Query for remote server state. Add a
Zustand store when multiple unrelated components need the same client-owned state.
