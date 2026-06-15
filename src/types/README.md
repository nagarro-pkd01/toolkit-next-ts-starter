# Shared Types

This folder contains TypeScript contracts shared across multiple features or architectural layers.

## Contents

- Domain models such as products, posts, carts, and users
- API response contracts
- Performance and rendering contracts
- `global.d.ts` for controlled global and environment type augmentation

## How to use

Use PascalCase type names and import them with `import type`. Keep a type beside its feature when it
is not reused outside that feature; move it here only when it becomes broadly shared.

Types describe contracts but do not validate runtime input. Validate untrusted API or user data at
the boundary when correctness or security depends on it.
