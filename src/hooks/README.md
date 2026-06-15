# Hooks

This folder contains reusable React hooks shared across views and components.

## How to use

Hooks should begin with `use`, follow React's hook rules, and provide a focused reusable behavior.
They may compose browser APIs, providers, stores, and services.

Keep API-specific query and mutation hooks beside their feature in `src/services/`, such as
`services/auth/use-login.tsx`. Keep provider context access close to the provider when it is not
meaningful independently.

Use this folder for genuinely cross-feature hooks such as debouncing, theme access, logging, and
performance monitoring.
