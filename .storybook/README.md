# Storybook Configuration

This folder configures Storybook, the isolated UI component workshop.

## Contents

- `main.ts` controls story discovery, addons, and the Next.js builder.
- `preview.tsx` defines global decorators, styles, and preview parameters.

## How to use

Run `npm run storybook` and open `http://localhost:6006`. Add stories next to components as
`ComponentName.stories.tsx`; change this folder only when behavior should apply to every story.

Use Storybook for visual states and accessibility checks. Keep business logic tests in Vitest and
full user journeys in `e2e/`.
