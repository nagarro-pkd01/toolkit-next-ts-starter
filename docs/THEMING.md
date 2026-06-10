# Theming (light / dark)

## How it works

1. **Tokens** — Default (light) CSS variables are defined in `src/styles/design-system/theme/variables.scss` and loaded via `light.scss`.
2. **Dark palette** — `dark.scss` overrides those variables when `html` has the `theme-dark` class.
3. **No flash** — `themeInitScript` runs before React hydrates (see `app/layout.tsx`) and reads `localStorage` key `toolkit-theme`.
4. **Runtime** — `ThemeProvider` keeps preference in sync (`light` | `dark` | `system`) and updates the document class.
5. **UI** — `ThemeToggle` in the navbar; full demo at [`/theme`](/theme).

## Usage in components

Prefer design tokens in SCSS modules:

```scss
.card {
  background: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
```

In client components:

```tsx
import { useTheme } from "@/hooks/useTheme";

const { preference, resolvedTheme, setPreference, toggleTheme } = useTheme();
```

## Files

| Path | Role |
|------|------|
| `constants/themeConstants.ts` | Storage key, class name, types |
| `utils/theme/resolveTheme.ts` | Resolve `system` → light/dark |
| `components/organisms/theme-provider/ThemeProvider.tsx` | Context + persistence |
| `components/molecules/theme-toggle/ThemeToggle.tsx` | Navbar / demo controls |
