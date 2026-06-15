# Components

This folder contains reusable presentation and interaction building blocks organized with atomic
design.

## Layers

- `atoms/` are the smallest reusable controls and visual primitives.
- `molecules/` combine a few atoms into one focused interaction.
- `organisms/` form substantial reusable interface sections.
- `templates/` define page structure and placement without owning route behavior.

## How to use

Place a component in the lowest layer that accurately describes its responsibility. Components may
depend on lower layers, but lower layers should not depend on higher layers.

Keep `ComponentName.tsx`, `ComponentName.module.scss`, tests, stories, and component documentation
together. Page-specific orchestration belongs in `src/views/`, and application-wide contexts belong
in `src/providers/`.
