# Repository Scripts

This folder contains Node.js commands used by npm scripts, git hooks, CI, publishing, and starter
generation.

## Contents

- `create-starter.mjs` creates a new project from this starter.
- `reportBundleSize.mjs` builds or inspects bundle-size reports.
- `blockProtectedBranchPush.mjs` prevents direct pushes to protected branches.

## How to use

Run scripts through their named `package.json` commands whenever possible. Add a script here when a
workflow requires reusable procedural logic that would be awkward inside `package.json` or YAML.

Scripts must be non-interactive when used by CI, return a non-zero exit code on failure, and avoid
changing application source unless that behavior is their explicit purpose.
