# Enterprise Adoption Checklist

Use this checklist when rolling out the starter across teams.

## Governance

- Define ownership for starter upgrades and dependency policy
- Enforce branch protection and required status checks
- Require conventional commits in all repos initialized from this starter (`docs/COMMIT_MESSAGES.md`, commitlint + CI)
- Enable GitHub branch protection on `main` per `docs/BRANCHING_STRATEGY.md` (hooks alone are not sufficient)

## Security and Compliance

- Add secret scanning and code scanning workflows
- Configure npm org access and package provenance verification
- Pin critical runtime versions (`node`, package manager)

## Standardization

- Keep architecture boundaries:
  - `app/` routing only
  - `modules/` business features
  - `services/` external communication
  - `lib/` shared primitives
- Keep design token ownership under `design-system/`
- Keep domain contracts in `types/`

## Rollout Process

1. Publish starter changes via semantic release
2. Announce version and migration notes
3. Teams scaffold new apps from the latest tag
4. Track adoption and open issues in a central platform board

## Ongoing Maintenance

- Run dependency updates on a fixed cadence
- Track lint/type/build drift in template CI
- Maintain release notes for breaking changes
