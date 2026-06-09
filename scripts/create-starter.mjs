#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const parseArgs = (argv) => {
  const args = [];
  const flags = new Set();

  for (const token of argv) {
    if (token.startsWith("--")) {
      flags.add(token);
      continue;
    }
    args.push(token);
  }

  return {
    args,
    flags,
  };
};

const isDirectoryEmpty = (dirPath) => readdirSync(dirPath).length === 0;

const shouldSkipEntry = (entryName) => {
  const blocked = new Set([
    ".git",
    ".next",
    "node_modules",
    "package-lock.json",
    "scripts",
    ".cursorignore",
    ".DS_Store",
  ]);

  return blocked.has(entryName);
};

const updateTemplatePackageJson = (targetDir) => {
  const packageJsonPath = path.join(targetDir, "package.json");

  if (!existsSync(packageJsonPath)) {
    return;
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  const projectName = path.basename(targetDir);

  packageJson.name = projectName.replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase();
  packageJson.private = true;
  delete packageJson.bin;
  delete packageJson.files;
  delete packageJson.publishConfig;

  if (packageJson.scripts) {
    delete packageJson.scripts["create:starter"];
    delete packageJson.scripts.prepublishOnly;
  }

  writeFileSync(`${packageJsonPath}`, `${JSON.stringify(packageJson, null, 2)}\n`);
};

const run = () => {
  const { args, flags } = parseArgs(process.argv.slice(2));
  const targetInput = args[0] ?? "toolkit-next-app";
  const targetDir = path.resolve(process.cwd(), targetInput);
  const force = flags.has("--force");

  if (existsSync(targetDir) && !isDirectoryEmpty(targetDir) && !force) {
    console.error(
      `Target directory "${targetInput}" is not empty. Re-run with --force or choose a different path.`,
    );
    process.exit(1);
  }

  mkdirSync(targetDir, { recursive: true });

  const currentFilePath = fileURLToPath(import.meta.url);
  const packageRoot = path.resolve(path.dirname(currentFilePath), "..");
  const entries = readdirSync(packageRoot);

  for (const entry of entries) {
    if (shouldSkipEntry(entry)) {
      continue;
    }

    const sourcePath = path.join(packageRoot, entry);
    const destinationPath = path.join(targetDir, entry);

    cpSync(sourcePath, destinationPath, {
      recursive: true,
    });
  }

  updateTemplatePackageJson(targetDir);

  console.info("Starter project created successfully.");
  console.info(`Next steps:\n  cd ${targetInput}\n  npm install\n  npm run dev`);
};

run();
