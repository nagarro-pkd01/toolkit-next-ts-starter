#!/usr/bin/env node

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");

function hasSnykCredentials() {
  if (process.env.SNYK_TOKEN) {
    return true;
  }

  const configPaths = [
    path.join(homedir(), ".config", "configstore", "snyk.json"),
    path.join(homedir(), ".local", "share", "configstore", "snyk.json"),
    path.join(process.env.APPDATA ?? "", "config", "configstore", "snyk.json"),
  ];

  return configPaths.some((configPath) => existsSync(configPath));
}

if (process.env.SKIP_SNYK === "1") {
  console.info("Snyk pre-push skipped (SKIP_SNYK=1).");
  process.exit(0);
}

if (!hasSnykCredentials()) {
  console.info(
    "Snyk pre-push skipped (set SNYK_TOKEN or run `snyk auth`). CI still scans when SNYK_TOKEN is configured.",
  );
  process.exit(0);
}

execSync("npm run security:snyk", {
  cwd: projectRoot,
  stdio: "inherit",
  env: process.env,
});
