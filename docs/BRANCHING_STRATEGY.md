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

## Protected branches

**Do not push directly to `main`.** All changes land via pull request merge.

| Layer | What it does |
|-------|----------------|
| Local hook | Lefthook `pre-push` blocks `git push` to `origin/main` (see `scripts/blockProtectedBranchPush.mjs`) |
| GitHub (required) | Branch protection / ruleset on `main` so the remote rejects direct pushes even with `--no-verify` |

### GitHub branch protection (set on each repo)

In **Settings → Branches** (or **Rules → Rulesets**), protect `main`:

1. **Require a pull request before merging** (no direct pushes)
2. **Require status checks to pass** — include CI jobs from `.github/workflows/ci.yml`
3. **Require branches to be up to date** before merge
4. **Do not allow bypassing** the above settings (except a documented break-glass admin role)
5. Optionally **restrict who can push** to release automation only

Hooks can be skipped with `git push --no-verify`; branch protection on GitHub is the enforcement that matters in production.

Emergency local bypass: `ALLOW_PROTECTED_PUSH=1 git push origin main` (use only for break-glass; still blocked if GitHub protection is enabled).
