#!/usr/bin/env node

import { execSync } from "node:child_process";

/**
 * Allowed branch patterns:
 * - feature/ABC-123-some-kebab-description
 * - bugfix/ABC-123-some-kebab-description
 * - hotfix/ABC-123-some-kebab-description
 * - chore/ABC-123-some-kebab-description
 * - release/ABC-123-some-kebab-description
 *
 * Notes:
 * - The ticket key is intentionally generic to support any org (AEEE-123, CORE-9, etc.)
 * - The description must be present (kebab-case recommended).
 */
const BRANCH_REGEX =
  /^(feat|fix|hotfix|chore|release)\/([A-Z][A-Z0-9]*-\d+-[a-z0-9]+(?:-[a-z0-9]+)*)$/;

const REFERENCE_DOC = "docs/BRANCHING_STRATEGY.md";

const getCurrentBranch = () => {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
};

const branch = getCurrentBranch();

// Detached HEAD or unable to resolve branch: don't block.
if (!branch || branch === "HEAD") {
  process.exit(0);
}

if (!BRANCH_REGEX.test(branch)) {
  console.error(
    `\nERROR: Invalid branch name "${branch}".\n\n` +
      "Expected:\n" +
      "  feat/ABC-123-some-kebab-description\n" +
      "  fix/ABC-123-some-kebab-description\n" +
      "  hotfix/ABC-123-some-kebab-description\n" +
      "  chore/ABC-123-some-kebab-description\n" +
      "  release/ABC-123-some-kebab-description\n\n" +
      `See ${REFERENCE_DOC}\n`,
  );
  process.exit(1);
}
