# Application Providers

This folder contains application-wide React providers and their closely related contexts.

## Current providers

- `ThemeProvider.tsx` owns theme preference and resolved theme state.
- `GoogleAnalyticsProvider.tsx` loads Google Analytics when it is enabled and configured.

## How to use

Mount global providers from `src/app/providers.tsx` or the root layout when script placement
requires it. Keep providers focused on context, lifecycle, and integration setup; move reusable
business operations into `src/services/`.

A provider is infrastructure, not an atomic-design organism. Add one here when state or setup must
be available across unrelated parts of the application.
