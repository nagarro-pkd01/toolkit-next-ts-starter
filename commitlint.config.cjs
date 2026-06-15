/** Conventional Commits — aligned with @commitlint/config-conventional and semantic-release. */
const ALLOWED_TYPES = [
  "build",
  "chore",
  "ci",
  "docs",
  "feat",
  "fix",
  "perf",
  "refactor",
  "revert",
  "style",
  "test",
];

/** @type {import("@commitlint/types").UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  helpUrl: "https://www.conventionalcommits.org/en/v1.0.0/ — see docs/COMMIT_MESSAGES.md",
  defaultIgnores: true,
  ignores: [
    /**
     * Allow platform-generated commits that don't follow Conventional Commits.
     * - Merge commits from GitHub/UI merges
     * - Default `git revert` messages (quoted subject)
     */
    (message) => message.startsWith("Merge "),
    (message) => message.startsWith('Revert "'),
  ],
  rules: {
    "type-enum": [2, "always", ALLOWED_TYPES],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "scope-case": [2, "always", "kebab-case"],
    "scope-max-length": [2, "always", 32],
    "subject-case": [2, "never", ["sentence-case", "start-case", "pascal-case", "upper-case"]],
    "subject-empty": [2, "never"],
    "subject-min-length": [2, "always", 3],
    "subject-full-stop": [2, "never", "."],
    "subject-max-length": [2, "always", 72],
    "header-max-length": [2, "always", 100],
    "body-max-line-length": [2, "always", 100],
    "footer-max-line-length": [2, "always", 100],
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [2, "always"],
  },
};
