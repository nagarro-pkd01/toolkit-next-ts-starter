# Commit Message Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) so history stays readable and [semantic-release](https://github.com/semantic-release/semantic-release) can version from `main`.

Rules are enforced by **commitlint** (Lefthook `commit-msg` hook and CI on pull requests).

## Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

- **Header** (first line): required; max **100** characters total.
- **Subject**: imperative, lowercase, no trailing period; max **72** characters.
- **Scope**: optional; **kebab-case** when present; max **32** characters.
- **Body / footer**: wrap lines at **100** characters; leave a blank line before body and before footer.

## Types

| Type | When to use | Release impact |
|------|-------------|----------------|
| `feat` | New user-facing behavior | Minor |
| `fix` | Bug fix | Patch |
| `docs` | Documentation only | None |
| `style` | Formatting, no logic change | None |
| `refactor` | Code change, not feat/fix | None |
| `perf` | Performance improvement | Patch |
| `test` | Tests only | None |
| `build` | Build system or dependencies | None |
| `ci` | CI configuration | None |
| `chore` | Maintenance (tooling, meta) | None |
| `revert` | Reverts a prior commit | Depends on revert |

## Scopes (optional)

Use a short area name in **kebab-case**, for example:

- `auth`, `cart`, `checkout`
- `api`, `hooks`, `store`
- `ci`, `deps`, `docs`

Omit scope when the change spans many areas or scope is unclear.

## Breaking changes

Trigger a **major** release by either:

1. `!` after type/scope: `feat(api)!: remove legacy token endpoint`
2. Footer: `BREAKING CHANGE: describe what broke and how to migrate`

## Examples

**Valid**

```
feat(auth): add password reset flow
fix(cart): prevent duplicate line items
docs: document commit message conventions
chore(deps): bump next to 16.2.6
feat(api)!: drop v1 routes

BREAKING CHANGE: clients must use /api/v2 only.
```

**Invalid**

```
Fixed cart bug                    # missing type/scope format
feat: Added login                 # subject not imperative / wrong case
fix(cart).                        # trailing period
FEAT(auth): add oauth              # type must be lowercase
feat(Auth): add oauth              # scope must be kebab-case
```

## Local checks

```bash
# Validate the latest commit (after commit)
npm run lint:commits

# Validate a message before committing
echo "feat(auth): add login" | npx commitlint
```

Hooks run automatically via Lefthook after `npm install` (`prepare` script). Bypass only when necessary: `git commit --no-verify`.

## Automation

- **Hook**: `commit-msg` → `commitlint --edit`
- **CI**: all commits in a PR are linted against the target branch
- **Release**: semantic-release on `main` reads these messages for version and changelog
