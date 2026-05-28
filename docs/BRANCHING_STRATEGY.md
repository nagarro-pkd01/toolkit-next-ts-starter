# Branching Strategy

## Default Branches

- `main`: production-ready, release-eligible branch
- `develop`: integration branch for upcoming release work

## Supporting Branches

- `feature/<ticket-or-scope>` for new functionality
- `fix/<ticket-or-scope>` for regular bug fixes
- `hotfix/<ticket-or-scope>` for urgent production fixes from `main`
- `release/<version>` for stabilization before merge to `main`

## Merge Policy

- Open pull requests to `develop` for normal work
- Merge `release/*` into `main` and back to `develop`
- Keep pull requests small and independently testable
- Require CI green and at least one reviewer for merge
