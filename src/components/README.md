# Components

This folder contains reusable presentation and interaction building blocks organized by scope and
business responsibility.

## Structure

- `atoms/` are the smallest reusable controls and visual primitives.
- `molecules/` combine a few atoms into one focused interaction.
- `layout/` contains shared navigation and shell components.
- `shop/`, `posts/`, and `performance/` contain domain-specific reusable components.
- `templates/` define page structure and placement without owning route behavior.

## How to use

Place generic primitives in `atoms/` or `molecules/`. Place larger components in the folder owned by
their domain instead of classifying them by visual size.

Keep `ComponentName.tsx`, `ComponentName.module.scss`, tests, stories, and component documentation
together inside a kebab-case folder. Use direct component imports so unrelated components and styles
do not enter the same route bundle. Page orchestration belongs in `src/features/`, and application-wide
contexts belong in `src/providers/`.
