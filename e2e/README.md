# End-to-End Tests

This folder contains Playwright tests that exercise the running application through a browser.

## What belongs here

- Critical user journeys such as sign-in and navigation
- Route-level rendering and integration behavior
- Browser behavior that unit tests cannot represent reliably

## How to use

Run all tests with `npm run test:e2e` or use `npm run test:e2e:ui` while developing. Add files as
`feature.spec.ts`, navigate through public behavior, and prefer accessible selectors such as roles,
labels, and visible names.

Keep narrow function and component behavior in colocated Vitest files. E2E tests should cover
valuable workflows rather than every internal branch.
