# Analytics Service

This folder defines typed user-behavior analytics events and provider-specific delivery.

## Contents

- `analytics-types.ts` maps event names to their allowed parameters.
- `google-analytics.ts` validates configuration and sends events through `gtag`.
- Tests verify disabled, invalid, and configured behavior.

## How to use

Add an event and its parameter type to `AnalyticsEventMap`, then call `trackEvent` at the user action
that represents the event. Use stable `snake_case` event names and avoid personal data, tokens, or
free-form sensitive text.

Analytics describes user behavior. Operational errors and diagnostics belong in the logger, not in
analytics events.
