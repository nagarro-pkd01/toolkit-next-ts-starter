# ADR 0001: Google Analytics Event Wrapper

- Status: Accepted for proof of concept
- Date: 2026-06-10

## Context

The application needs product analytics without scattering direct `gtag()` calls across UI
components. Direct vendor calls make event names inconsistent, are difficult to test, and make a
future move to Google Tag Manager or another analytics provider more expensive.

Google Analytics 4 models interactions as events. Google recommends using its standard events where
they fit and custom events only when no recommended event represents the interaction. Analytics
payloads must not include personally identifiable information (PII), secrets, authentication tokens,
or uncontrolled user-entered text.

## Decision

Introduce a small, provider-neutral application API:

```ts
trackEvent("theme_changed", {
  source: "quick-toggle",
  theme: "dark",
});
```

The implementation:

1. Defines event names and parameter contracts in `analytics-types.ts`.
2. Sends events through a Google Analytics adapter in `google-analytics.ts`.
3. Loads `gtag.js` once from the root layout using Next.js `Script`.
4. Enables collection only when both environment variables are configured:
   - `NEXT_PUBLIC_GOOGLE_ANALYTICS_ENABLED=true`
   - `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX`
5. Relies on GA4 enhanced measurement for App Router page views. Manual page-view events are not sent
   to avoid duplicates.
6. Uses `theme_changed` as the POC event and sends only controlled enum-like values.

## Consequences

### Benefits

- Centralized, typed event taxonomy catches invalid names and parameters during development.
- Components do not depend directly on the Google API.
- Analytics becomes easy to mock or disable in tests and local environments.
- Missing or invalid configuration results in a safe no-op.
- The adapter can later route events to GTM, another vendor, or multiple destinations.
- Central review makes PII and naming-policy violations easier to detect.

### Costs and risks

- The wrapper and event map require ongoing ownership as product tracking evolves.
- A narrow wrapper may lag behind advanced GA features unless deliberately extended.
- `gtag.js` adds a third-party network request and client-side execution cost.
- Ad blockers and browser privacy controls mean analytics is never a complete source of truth.
- Incorrect event semantics can still produce misleading reports despite strong TypeScript types.
- Enabling the POC without a consent-management design may violate regional privacy requirements.

## Privacy and consent

This POC defaults to disabled. Before production enablement, the owning team must determine consent
requirements with privacy/legal stakeholders and connect the provider to the chosen consent
management platform where required.

Never send:

- email addresses, names, phone numbers, postal addresses, or other PII;
- access tokens, session IDs, passwords, or internal security identifiers;
- raw search text, form values, URLs containing personal data, or unrestricted error messages.

Prefer stable product identifiers, bounded enums, boolean flags, and coarse numeric values.

## Alternatives considered

### Direct `gtag()` calls

Rejected because they couple every component to Google and allow inconsistent event payloads.

### `@next/third-parties/google`

Not selected for this POC because the local Next.js documentation marks the package experimental.
The built-in `next/script` component provides the required loading behavior without another package.

### Google Tag Manager

Deferred. GTM is useful when non-engineering teams need to manage tags or multiple destinations, but
it adds container governance and debugging complexity. The wrapper can later swap its adapter to GTM
without changing component call sites.

### First-party analytics endpoint

Deferred. A server-side collection service offers more control and provider independence but adds
infrastructure, identity, retry, retention, and compliance responsibilities.

## Verification

1. Configure the two public environment variables in `.env.local`.
2. Start the app and use the theme toggle.
3. Confirm `theme_changed` in GA4 Realtime or DebugView.
4. Verify that no analytics request is made when the enabled flag is absent or false.

## References

- Google Analytics event setup:
  https://developers.google.com/analytics/devguides/collection/ga4/events
- Google Analytics recommended event reference:
  https://developers.google.com/tag-platform/gtagjs/reference/events
- Google consent mode:
  https://developers.google.com/tag-platform/security/guides/consent
- Google guidance for avoiding PII:
  https://support.google.com/analytics/answer/6366371
