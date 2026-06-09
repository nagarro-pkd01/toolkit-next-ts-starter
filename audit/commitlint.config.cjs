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
  rules: {
    "type-enum": [2, "always", ALLOWED_TYPES],
    "scope-case": [2, "always", "kebab-case"],
    "scope-max-length": [2, "always", 32],
    "subject-case": [2, "never", ["sentence-case", "start-case", "pascal-case", "upper-case"]],
    "subject-full-stop": [2, "never", "."],
    "subject-max-length": [2, "always", 72],
    "header-max-length": [2, "always", 100],
    "body-max-line-length": [2, "always", 100],
    "footer-max-line-length": [2, "always", 100],
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [2, "always"],
  },
};
