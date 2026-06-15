# Project Adoption TODO

Use this checklist after creating an application from the toolkit. It identifies starter values that
must be replaced, optional capabilities that must be configured or removed, and the files where each
decision belongs.

Do not treat the fallback values as production configuration. Complete all **Required** items before
the first production release.

## 1. Application Identity

- [ ] **Required:** Rename the package and update its description, keywords, license, publishing
      access, and CLI name in `package.json`.
- [ ] **Required:** Set the project name and metadata in `.projenrc.js`, then run `npm run projen`.
- [ ] **Required:** Replace "Toolkit Next TS Starter" and toolkit-specific setup instructions in
      `README.md`.
- [ ] **Required:** Replace the fallback application name in `src/constants/envConfig.ts` and the
      `NEXT_PUBLIC_APP_NAME` example in `.env.example`.
- [ ] **Required:** Replace navigation branding and copyright text in
      `src/constants/layoutConfig.ts`.
- [ ] **Required:** Change `THEME_STORAGE_KEY` in `src/constants/themeConstants.ts` so applications
      on the same domain do not share the toolkit's browser storage key.
- [ ] Replace or remove starter favicon and public assets in `src/app/favicon.ico` and `public/`.

**Done when:** The package, browser title, navigation, footer, storage keys, and documentation use
the real product and company names.

## 2. URLs and Environment Configuration

- [ ] **Required:** Copy `.env.example` to the environment management system used by the application.
- [ ] **Required:** Set `NEXT_PUBLIC_BASE_URL` to the public HTTPS origin. It controls canonical and
      other absolute metadata URLs.
- [ ] **Required:** Set `NEXT_PUBLIC_AUTH_API_URL` to the real authentication service.
- [ ] Configure or remove `NEXT_PUBLIC_STRAPI_URL` and `NEXT_PUBLIC_VTEX_URL`, depending on which
      integrations the application uses.
- [ ] Replace `NEXT_PUBLIC_PLACEHOLDER_API_URL` and remove the JSONPlaceholder client when demo post
      data is no longer required.
- [ ] Review every browser-exposed `NEXT_PUBLIC_*` variable. Never place tokens, private keys, or
      server-only credentials in these variables.
- [ ] Add environment validation so production fails fast when a required value is missing. The
      current fallbacks in `src/constants/envConfig.ts` and `src/services/api-clients/` are intended
      for local starter use.
- [ ] Update the environment declarations in `src/types/global.d.ts` when variables are added,
      renamed, or removed.

**Files:** `.env.example`, `src/constants/envConfig.ts`, `src/types/global.d.ts`,
`src/services/api-clients/`

**Done when:** Local, test, staging, and production environments each have validated configuration
without production code relying on localhost or `example.com`.

## 3. SEO and Discoverability

- [ ] **Required:** Replace the starter title and description in `src/app/layout.tsx`.
- [ ] **Required:** Verify `metadataBase` and the canonical URL against the production domain.
- [ ] Add product-specific Open Graph and social sharing images using Next.js metadata files.
- [ ] Add route-specific metadata where pages need unique titles, descriptions, or canonical URLs.
- [ ] Add real `robots.ts` and `sitemap.ts` files under `src/app/` when the application is public.
- [ ] Keep `robots.index` and `robots.follow` set to `false` for internal applications, preview
      deployments, and non-production environments.
- [ ] Set indexing to `true` only after canonical URLs, access control, sitemap content, and public
      launch approval have been verified.
- [ ] Replace `lang="en"` in `src/app/layout.tsx` if the product uses another default locale.

**Done when:** Search crawlers receive the intended indexing policy and every public route emits the
correct production URL and product metadata.

## 4. APIs, Authentication, and Demo Data

- [ ] **Required:** Replace the example login request and response contract in
      `src/services/auth/`.
- [ ] **Required:** Implement the real session strategy: secure cookies, token refresh, logout,
      authorization checks, and protected-route behavior.
- [ ] **Required:** Review error normalization and sensitive-data redaction before connecting real
      APIs.
- [ ] Replace or remove `src/services/posts/`, `src/services/rendering/`, and
      `src/services/api-clients/placeholder-client.ts` if JSONPlaceholder demos are not part of the
      product.
- [ ] Replace sample shop products and prices in `src/features/shop/ShopPage.tsx`.
- [ ] Replace sample dashboard copy in `src/features/dashboard/DashboardPage.tsx`.
- [ ] Remove `/rendering` routes and `/api/rendering/sample-posts` if rendering demonstrations
      should not ship.
- [ ] Replace the service name returned by `src/app/api/health/route.ts`.
- [ ] Decide whether health responses need dependency readiness checks and whether detailed status
      must be restricted to internal infrastructure.

**Done when:** No production workflow depends on mock credentials, sample products, placeholder
content, or demonstration endpoints.

## 5. Analytics, Consent, and Privacy

- [ ] Decide whether Google Analytics is approved for the product and jurisdiction.
- [ ] If enabled, set `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` to the real `G-...` measurement ID.
- [ ] Keep `NEXT_PUBLIC_GOOGLE_ANALYTICS_ENABLED=false` until consent and production configuration
      are ready.
- [ ] Integrate the analytics provider with the organization's cookie-consent or consent-management
      platform before loading tracking scripts where required.
- [ ] Replace starter events and parameters with the approved measurement plan in
      `src/services/analytics/`.
- [ ] Document prohibited personal or sensitive data and verify that it is never included in event
      parameters.
- [ ] Remove the analytics provider, service, tests, environment variables, and ADR if analytics is
      not used.

**Files:** `.env.example`, `src/providers/GoogleAnalyticsProvider.tsx`,
`src/services/analytics/`, `docs/adr/0001-google-analytics-event-wrapper.md`

**Done when:** Analytics is either removed or covered by consent, privacy review, a named owner, and
an approved event schema.

## 6. Logging, Errors, and Observability

- [ ] Choose the production log destination and collection agent.
- [ ] Configure production log level, service name, environment, release version, and correlation or
      request IDs.
- [ ] Connect client errors, error boundaries, API failures, and server errors to the same searchable
      operational workflow.
- [ ] Verify redaction for passwords, authorization headers, cookies, tokens, personal information,
      and provider payloads.
- [ ] Decide retention, access control, alert ownership, and escalation paths.
- [ ] Replace or remove example telemetry endpoints and in-app performance panels.
- [ ] Configure `NEXT_PUBLIC_PERFORMANCE_*` values for each environment.
- [ ] Forward Web Vitals and performance alerts to an approved monitoring backend if production RUM
      is required.
- [ ] Fix and enable all logging tests before release.

**Files:** `src/utils/logger/`, `src/services/logging/`, `src/utils/errors/`,
`src/app/error.tsx`, `src/instrumentation.ts`, `src/instrumentation-client.ts`,
`src/providers/PerformanceMonitorProvider.tsx`, `docs/LOGGING.md`,
`docs/PERFORMANCE_MONITORING.md`

**Done when:** A test client failure and a test server/API failure can be found using their
environment, release, source, and correlation ID without exposing secrets.

## 7. Security and Browser Policy

- [ ] **Required:** Replace the report-only CSP in `next.config.ts` with an application-specific
      policy.
- [ ] Add only approved script, image, font, frame, and connection origins required by production
      integrations.
- [ ] Configure a CSP reporting endpoint before enforcing the policy.
- [ ] Move from `Content-Security-Policy-Report-Only` to `Content-Security-Policy` after violations
      have been reviewed.
- [ ] Review whether `'unsafe-inline'` remains necessary.
- [ ] Review HSTS ownership at the CDN or ingress and avoid enabling it on domains that are not fully
      HTTPS-ready.
- [ ] Adjust `Permissions-Policy`, cross-origin policies, and framing rules for actual product
      requirements.
- [ ] Run `npm run security:critical` and resolve accepted risk through the organization's security
      process.
- [ ] Configure dependency updates and secret scanning in the hosting platform.

**Files:** `next.config.ts`, `package.json`, `.github/workflows/`

**Done when:** Security headers are tested against the deployed application and no required
integration is accidentally blocked or unnecessarily allowed.

## 8. Architecture and Ownership

- [ ] Agree on whether the project uses the documented `app`, `features`, shared component, provider,
      and service boundaries.
- [ ] Update `src/README.md` if the adopted architecture differs from the toolkit.
- [ ] Remove demo domains and create real bounded-context folders under `src/features/`.
- [ ] Create `.github/CODEOWNERS` with real GitHub users or teams. Do not copy placeholder owners.
- [ ] Assign domain owners and a platform owner for shared folders, CI, dependencies, security, and
      toolkit upgrades.
- [ ] Record significant deviations or technology choices as ADRs under `docs/adr/`.
- [ ] Update `docs/NAMING_CONVENTIONS.md` only after the team agrees on enforceable conventions.

**Done when:** Every production folder has an unambiguous purpose and reviewer, and contributors can
decide where new code belongs without relying on tribal knowledge.

## 9. Design System and Product UI

- [ ] Replace starter colors, typography, spacing, radii, and themes under
      `src/styles/design-system/`.
- [ ] Replace generic shell, navigation, footer, and layout configuration with approved product UI.
- [ ] Replace the placeholder icon implementation with the selected icon system.
- [ ] Audit accessibility: keyboard navigation, focus states, labels, landmarks, contrast, zoom,
      motion preferences, and screen-reader behavior.
- [ ] Update Storybook branding, stories, accessibility rules, and deployment settings.
- [ ] Remove starter components, templates, stories, and tests that the product does not use.

**Files:** `src/styles/`, `src/components/`, `src/constants/layoutConfig.ts`, `.storybook/`

**Done when:** The UI reflects the approved design system and critical workflows pass accessibility
checks.

## 10. Testing and Quality Gates

- [ ] Replace sample unit and E2E tests with product-critical workflows while retaining useful
      toolkit coverage.
- [ ] Update Playwright's `PLAYWRIGHT_BASE_URL` and test environment configuration.
- [ ] Fix all existing TypeScript, Vitest, Storybook, and import-casing failures.
- [ ] Set realistic coverage expectations and decide whether coverage is a CI gate.
- [ ] Update Lighthouse routes and budgets in `.lighthouserc.js`.
- [ ] Establish bundle-size budgets and baseline behavior in `scripts/reportBundleSize.mjs`.
- [ ] Ensure `npm run validate` passes from a clean clone using the supported Node.js version.
- [ ] Test error, loading, empty, unauthorized, forbidden, rate-limited, and server-failure states.

**Files:** `vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts`, `e2e/`,
`.lighthouserc.js`, `scripts/reportBundleSize.mjs`, `.github/workflows/ci.yml`

**Done when:** The clean-clone validation pipeline passes and protects the workflows that matter to
the product.

## 11. Git, CI, and Deployment

- [ ] **Required:** Update CI trigger branches in `.github/workflows/ci.yml` and
      `.github/workflows/lighthouse-ci.yml`.
- [ ] **Required:** Update protected branch names in `lefthook.yml` and
      `scripts/blockProtectedBranchPush.mjs`.
- [ ] Configure repository branch protection, required reviews, required checks, and merge strategy.
- [ ] Set the supported Node.js version consistently in `package.json`, CI, deployment, and local
      tooling.
- [ ] Add build-time and runtime environment variables to the deployment platform.
- [ ] Configure preview, staging, and production deployment environments.
- [ ] Add caching, artifact retention, concurrency, timeout, and least-privilege permissions to
      workflows as required.
- [ ] Review the pull request template and branching documentation for the team's process.
- [ ] Decide whether generated Lighthouse reports, bundle logs, TypeScript build info, and security
      reports should be committed or ignored.

**Files:** `.github/`, `lefthook.yml`, `scripts/`, `package.json`, `.gitignore`,
`docs/BRANCHING_STRATEGY.md`

**Done when:** A pull request exercises the required checks and only approved merges can reach a
deployed environment.

## 12. Release and Package Publishing

- [ ] Decide whether the application should remain an installable public starter package.
- [ ] If it is a normal application, set `"private": true` and remove the CLI `bin`, starter
      creation command, npm publishing files, and release workflow.
- [ ] If publishing is retained, verify package ownership, package name, registry, access level,
      provenance, included files, license, and documentation.
- [ ] Update semantic-release branches and plugins in `.releaserc.json`.
- [ ] Configure `NPM_TOKEN` only if token-based publishing is intentionally retained; prefer the
      organization's approved trusted publishing approach where available.
- [ ] Review `scripts/create-starter.mjs` so generated applications receive the intended files and
      do not inherit toolkit-only metadata.
- [ ] Run `npm pack --dry-run` and inspect every published file.

**Files:** `package.json`, `.releaserc.json`, `.github/workflows/release.yml`,
`scripts/create-starter.mjs`, `docs/NPM_PUBLISHING.md`

**Done when:** The repository either cannot be accidentally published or has a verified,
organization-owned release process.

## 13. Documentation Cleanup

- [ ] Update the root `README.md` with real prerequisites, local setup, architecture, deployment,
      support, and troubleshooting information.
- [ ] Update or remove toolkit-only documents under `docs/`.
- [ ] Keep folder READMEs aligned whenever responsibilities move.
- [ ] Replace example URLs, commands, team names, screenshots, and product terminology.
- [ ] Add operational runbooks for deployment rollback, incidents, secrets, data migrations, and
      dependency upgrades where applicable.
- [ ] Keep this `TODO.md` in the generated project until every required item is complete; then remove
      completed starter instructions or convert remaining work into tracked backlog issues.

## Final Production Checklist

- [ ] No production file relies on `localhost`, `example.com`, `G-XXXXXXXX`, toolkit branding, or
      placeholder APIs.
- [ ] SEO indexing and canonical URLs match the intended exposure.
- [ ] Authentication, authorization, privacy, logging, and security have named approvers.
- [ ] `npm run validate` passes from a clean clone.
- [ ] CI, branch protection, CODEOWNERS, deployment, alerts, and rollback are operational.
- [ ] Unused starter demos and publishing automation have been removed.
