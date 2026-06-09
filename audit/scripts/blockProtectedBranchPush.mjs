#!/usr/bin/env node

import { createInterface } from "node:readline";

/** Remote refs that must only receive changes via pull request merge. */
const PROTECTED_REFS = new Set(["refs/heads/main"]);

if (process.env.ALLOW_PROTECTED_PUSH === "1") {
  process.exit(0);
}

const rl = createInterface({ input: process.stdin, terminal: false });
let blockedRef = null;

rl.on("line", (line) => {
  const trimmed = line.trim();
  if (!trimmed) {
    return;
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length < 4) {
    return;
  }

  const remoteRef = parts[2];
  if (PROTECTED_REFS.has(remoteRef)) {
    blockedRef = remoteRef;
  }
});

rl.on("close", () => {
  if (!blockedRef) {
    return;
  }

  const branch = blockedRef.replace("refs/heads/", "");
  console.error(
    `\nDirect push to "${branch}" is not allowed.\n` +
      "  Use a feature branch and open a pull request.\n" +
      "  See docs/BRANCHING_STRATEGY.md\n" +
      "  Emergency bypass: ALLOW_PROTECTED_PUSH=1 git push ...\n",
  );
  process.exit(1);
});
