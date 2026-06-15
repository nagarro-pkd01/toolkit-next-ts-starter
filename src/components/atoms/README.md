# Atoms

Atoms are small, reusable UI primitives such as buttons, inputs, icons, and badges.

## How to use

Atoms should have a narrow API, accessible HTML semantics, and no page-specific business logic.
Style them with colocated SCSS modules and expose commonly used atoms through `index.ts`.

Create a new atom when the same primitive and behavior will be reused across multiple interfaces.
Compose existing atoms in `molecules/` instead of adding feature workflows here.
