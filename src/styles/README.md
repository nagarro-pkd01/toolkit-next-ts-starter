# Styles

This folder contains application-wide styling foundations.

## Contents

- `globals.scss` contains app-wide styles imported by `app/layout.tsx`.
- `mixins.scss`, `breakpoints.scss`, and `animations.scss` are shared SCSS utilities.
- `design-system/` contains tokens, theme variables, and TypeScript token exports.

## How to use

Use global styles for document defaults and truly global behavior. Keep component styles in a
colocated `ComponentName.module.scss` file to avoid accidental cross-component rules.

Use design-system tokens instead of repeating raw colors, spacing, typography, or radius values.
