# GitHub Automation

This folder contains GitHub-specific collaboration and automation files.

## Contents

- `pull_request_template.md` standardizes pull request descriptions.
- `workflows/ci.yml` runs the main quality checks.
- `workflows/lighthouse-ci.yml` checks web performance.
- `workflows/release.yml` publishes releases from the configured release branch.

## How to use

Update workflows when a repository-wide CI or release requirement changes. Keep application logic
inside `src/` and reusable command logic inside `scripts/`; workflows should mainly orchestrate npm
scripts and provide secrets or environment variables.

Test the equivalent npm command locally before changing a workflow. Never commit credentials; use
GitHub Actions secrets.
