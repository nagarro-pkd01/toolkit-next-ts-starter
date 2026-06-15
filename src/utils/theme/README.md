# Theme Utilities

This folder contains framework-light theme resolution, persistence, DOM application, and
pre-hydration initialization helpers.

## How to use

`ThemeProvider` calls these helpers to resolve `light`, `dark`, or `system`, persist the preference,
and apply the CSS class. `theme-init-script.ts` runs before hydration to prevent an incorrect-theme
flash.

Keep theme constants in `src/constants/themeConstants.ts` and theme styles in
`src/styles/design-system/theme/`. Test changes against stored preferences and operating-system
theme changes.
