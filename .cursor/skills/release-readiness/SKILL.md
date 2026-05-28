# Release Readiness Skill

## Goal

Keep pull requests release-ready by enforcing quality gates and release prerequisites.

## Checklist

1. Run `npm run lint`.
2. Run `npm run typecheck`.
3. Run `npm run build`.
4. Confirm commit messages follow conventional commits.
5. Verify release-critical files changed intentionally:
   - `.releaserc.json`
   - `.github/workflows/release.yml`
   - `package.json`

## Output

- `status`: pass | fail
- `blockingIssues`: array of blockers
- `notes`: short human-readable summary
