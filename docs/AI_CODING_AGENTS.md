# AI Coding Agents

This document explains how AI coding tools discover project instructions in this repository and
which files they should read before making changes.

## Source of Truth

The canonical project rules are:

1. `AGENTS.md` - repository entrypoint for AI agents.
2. `docs/ENGINEERING_RULES.md` - TypeScript, ESLint, React, Next.js, SCSS, testing, and agent
   workflow rules.
3. `.cursor/rules/karpathy-guidelines.mdc` - behavioral guardrails for AI agents: think before
   coding, keep changes simple, edit surgically, and verify against a goal.
4. `docs/NAMING_CONVENTIONS.md` - naming rules for variables, functions, components, hooks, types,
   files, folders, and SCSS modules.
5. The nearest folder `README.md` - local ownership and usage rules.
6. `node_modules/next/dist/docs/` - installed Next.js 16 documentation for routing, App Router,
   metadata, caching, layouts, server components, and route handlers.

Every agent-specific file in this repository should point back to those same sources. Do not copy
the full rules into each tool file; duplicated rules drift quickly.

## Agent Support Matrix

| Agent or tool                                   | File it reads                     | Status in this repo | What it does                                                              |
| ----------------------------------------------- | --------------------------------- | ------------------- | ------------------------------------------------------------------------- |
| Codex / OpenAI coding agents                    | `AGENTS.md`                       | Covered             | Directs agents to Next.js docs, engineering rules, and naming conventions |
| Cursor                                          | `.cursor/rules/*.mdc`             | Covered             | Always-applied `.mdc` rule points to the canonical docs                   |
| Claude Code / Claude project context            | `CLAUDE.md`                       | Covered             | Points Claude to the canonical docs plus behavioral guidelines            |
| GitHub Copilot coding agent / Copilot Chat      | `.github/copilot-instructions.md` | Covered             | Points Copilot to project rules before editing                            |
| Gemini CLI / Gemini coding agents               | `GEMINI.md`                       | Covered             | Points Gemini to project rules before editing                             |
| Windsurf                                        | `.windsurfrules`                  | Covered             | Points Windsurf to project rules before editing                           |
| Cline-compatible agents                         | `.clinerules`                     | Covered             | Points Cline-style tools to project rules before editing                  |
| Roo-compatible agents                           | `.roo/rules/*.md`                 | Covered             | Points Roo-style tools to project rules before editing                    |
| Generic agents without repo instruction support | Manual prompt or attached files   | Manual              | Ask the tool to read the source-of-truth files above before changing code |

## Required Reading Order for Agents

Before editing code, an agent should read:

1. `AGENTS.md`
2. `docs/AI_CODING_AGENTS.md`
3. `.cursor/rules/karpathy-guidelines.mdc`
4. `docs/ENGINEERING_RULES.md`
5. `docs/NAMING_CONVENTIONS.md`
6. The closest folder `README.md`
7. Relevant Next.js docs from `node_modules/next/dist/docs/` when touching framework behavior

For example:

- Editing `src/app/layout.tsx`: read App Router and metadata docs in `node_modules/next/dist/docs/`.
- Editing SCSS: read `docs/ENGINEERING_RULES.md` and `src/styles/README.md`.
- Editing a component: read `docs/NAMING_CONVENTIONS.md`, `src/components/README.md`, and the
  component folder README if it exists.
- Editing CI or release: read `.github/README.md`, `docs/BRANCHING_STRATEGY.md`, and
  `docs/NPM_PUBLISHING.md`.

## Rules for Maintaining Agent Files

- Keep `docs/ENGINEERING_RULES.md` as the detailed source of truth.
- Keep agent-specific files short. They should redirect the agent to the canonical docs.
- Update this document whenever a new AI tool is added.
- Include new agent instruction files in `package.json` if generated toolkit projects should
  receive them.
- Avoid tool-specific rules that contradict the shared engineering rules.
- If a tool cannot automatically read repo files, add the required reading list to the prompt or
  attach the files explicitly.

## How to Check Coverage

Run this command to list instruction files:

```bash
find . -maxdepth 4 -type f \( \
  -name 'AGENTS.md' \
  -o -name 'CLAUDE.md' \
  -o -name 'GEMINI.md' \
  -o -name 'CONVENTIONS.md' \
  -o -name '.windsurfrules' \
  -o -name '.clinerules' \
  -o -name '*.mdc' \
  -o -path './.github/copilot-instructions.md' \
  -o -path './.roo/rules/*.md' \
\) | sort
```

Run this command before publishing to confirm the files are included in the starter package:

```bash
npm_config_cache=/tmp/toolkit-npm-cache npm pack --dry-run --ignore-scripts --json
```

Check that the package output includes:

- `AGENTS.md`
- `CLAUDE.md`
- `GEMINI.md`
- `CONVENTIONS.md`
- `.cursor/rules/karpathy-guidelines.mdc`
- `.cursor/rules/project-engineering-standards.mdc`
- `.github/copilot-instructions.md`
- `.windsurfrules`
- `.clinerules`
- `.roo/rules/project-engineering-standards.md`
- `docs/AI_CODING_AGENTS.md`
- `docs/ENGINEERING_RULES.md`

## Known Limitations

- Some hosted AI tools do not automatically read repository instruction files. They need the rules
  pasted into the prompt, attached as context, or configured in the tool UI.
- Some tools read only the top-level instruction file and do not follow links unless asked. The
  adapter files therefore explicitly list the canonical files to read.
- Agent behavior changes over time. Treat this document as a project convention, not a guarantee
  from every vendor.
- Tooling rules do not replace executable gates. CI must still run linting, typechecking, tests, and
  builds.

## What We Can Improve Next

- Add a small CI script that fails if an agent adapter file stops referencing
  `docs/ENGINEERING_RULES.md`.
- Add import-boundary lint rules so architecture rules are enforced by tooling.
- Add Stylelint so SCSS rules are enforced by tooling.
- Add CODEOWNERS so agent-generated PRs request the right reviewers automatically.
- Add a PR checklist item asking whether AI-generated changes followed this document.
