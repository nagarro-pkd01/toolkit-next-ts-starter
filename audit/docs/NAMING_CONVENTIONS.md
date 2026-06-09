# Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `clientKey`, `postList` |
| Functions | verb + camelCase | `getClientKey`, `fetchPosts` |
| Components | PascalCase | `LoginPanel`, `ShellLayout` |
| Hooks | `use` + PascalCase | `useAuth`, `useCartStore` |
| Files (utils/hooks/services) | camelCase or feature-based | `getClientKey.ts`, `postsApi.ts` |
| Component files | PascalCase | `Button.tsx` |
| SCSS modules | `Component.module.scss` | `Button.module.scss` |
| Folders | kebab-case | `form-field`, `api-clients` |
| Types / interfaces | PascalCase | `Post`, `HeaderConfig` |
| Constants | UPPER_SNAKE_CASE | `APP_ROUTES`, `HEADER_CONFIG`, `ENV` |

## Next.js exceptions

These filenames are required by the App Router and are not renamed:

- `app/**/page.tsx`, `layout.tsx`, `route.ts`
- `app/error.tsx`, `app/not-found.tsx`

Co-locate styles as `ComponentName.module.scss` (for example `GlobalError.module.scss` imported from `error.tsx`).
