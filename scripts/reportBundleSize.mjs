#!/usr/bin/env node

import { execSync } from "node:child_process";
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const nextDir = path.join(projectRoot, ".next");
const logsDir = path.join(projectRoot, "logs", "bundle-size");
const latestPath = path.join(logsDir, "latest.json");
const historyPath = path.join(logsDir, "history.jsonl");
const reportLogPath = path.join(logsDir, "report.log");

const args = new Set(process.argv.slice(2));
const shouldBuild = args.has("--build");
const isCi = args.has("--ci");

const formatBytes = (bytes) => {
  if (bytes === 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** index;

  return `${value.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
};

const formatDelta = (current, previous) => {
  if (previous === undefined || previous === null) {
    return "n/a (first run)";
  }

  return formatSignedDelta(current - previous);
};

const formatSignedDelta = (delta) => {
  if (delta === undefined || delta === null) {
    return "n/a (first run)";
  }

  if (delta === 0) {
    return "±0 B";
  }

  const sign = delta > 0 ? "+" : "-";
  return `${sign}${formatBytes(Math.abs(delta))}`;
};

const sumFileSizes = (directory, extension) => {
  if (!existsSync(directory)) {
    return { bytes: 0, files: 0 };
  }

  let bytes = 0;
  let files = 0;

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(extension)) {
      continue;
    }

    const filePath = path.join(directory, entry.name);
    bytes += statSync(filePath).size;
    files += 1;
  }

  return { bytes, files };
};

const getGitCommit = () => {
  try {
    const sha = execSync("git rev-parse HEAD", {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    const shortSha = execSync("git rev-parse --short HEAD", {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    const subject = execSync("git log -1 --pretty=%s", {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    return { sha, shortSha, subject };
  } catch {
    return { sha: "unknown", shortSha: "unknown", subject: "unknown" };
  }
};

const collectBundleMetrics = () => {
  const chunksDir = path.join(nextDir, "static", "chunks");
  const cssDir = path.join(nextDir, "static");

  const clientJs = sumFileSizes(chunksDir, ".js");
  let clientCssBytes = 0;
  let clientCssFiles = 0;

  if (existsSync(cssDir)) {
    for (const entry of readdirSync(cssDir, { withFileTypes: true })) {
      if (!entry.isFile() || !entry.name.endsWith(".css")) {
        continue;
      }

      clientCssBytes += statSync(path.join(cssDir, entry.name)).size;
      clientCssFiles += 1;
    }

    if (existsSync(chunksDir)) {
      for (const entry of readdirSync(chunksDir, { withFileTypes: true })) {
        if (!entry.isFile() || !entry.name.endsWith(".css")) {
          continue;
        }

        clientCssBytes += statSync(path.join(chunksDir, entry.name)).size;
        clientCssFiles += 1;
      }
    }
  }

  const totalClientBytes = clientJs.bytes + clientCssBytes;

  return {
    clientCssBytes,
    clientCssFiles,
    clientJsBytes: clientJs.bytes,
    clientJsFiles: clientJs.files,
    totalClientBytes,
  };
};

const loadPreviousSnapshot = () => {
  if (!existsSync(latestPath)) {
    return null;
  }

  try {
    return JSON.parse(readFileSync(latestPath, "utf8"));
  } catch {
    return null;
  }
};

const printReport = (snapshot, previous) => {
  const lines = [
    "",
    "══════════════════════════════════════════════════════════",
    `Bundle size report — commit ${snapshot.commit.shortSha}`,
    snapshot.commit.subject,
    "══════════════════════════════════════════════════════════",
    `  Client JS:     ${formatBytes(snapshot.metrics.clientJsBytes).padStart(10)} (${snapshot.metrics.clientJsFiles} files)  ${formatDelta(snapshot.metrics.clientJsBytes, previous?.metrics.clientJsBytes)}`,
    `  Client CSS:    ${formatBytes(snapshot.metrics.clientCssBytes).padStart(10)} (${snapshot.metrics.clientCssFiles} files)  ${formatDelta(snapshot.metrics.clientCssBytes, previous?.metrics.clientCssBytes)}`,
    `  Client total:  ${formatBytes(snapshot.metrics.totalClientBytes).padStart(10)}               ${formatDelta(snapshot.metrics.totalClientBytes, previous?.metrics.totalClientBytes)}`,
    "──────────────────────────────────────────────────────────",
    `  Logs: ${path.relative(projectRoot, logsDir)}/`,
    `    latest.json   — baseline for next diff`,
    `    history.jsonl — append-only history`,
    `    report.log    — human-readable log`,
    "══════════════════════════════════════════════════════════",
    "",
  ];

  const output = lines.join("\n");
  console.info(output);
  return output;
};

const writeLogs = (snapshot, consoleReport) => {
  mkdirSync(logsDir, { recursive: true });

  writeFileSync(latestPath, `${JSON.stringify(snapshot, null, 2)}\n`);

  appendFileSync(historyPath, `${JSON.stringify(snapshot)}\n`);

  const logEntry = [
    `[${snapshot.recordedAt}] commit ${snapshot.commit.shortSha} — ${snapshot.commit.subject}`,
    `  clientJs=${formatBytes(snapshot.metrics.clientJsBytes)} (${formatSignedDelta(snapshot.diff?.clientJsBytes)})`,
    `  clientCss=${formatBytes(snapshot.metrics.clientCssBytes)} (${formatSignedDelta(snapshot.diff?.clientCssBytes)})`,
    `  clientTotal=${formatBytes(snapshot.metrics.totalClientBytes)} (${formatSignedDelta(snapshot.diff?.totalClientBytes)})`,
    "",
  ].join("\n");

  appendFileSync(reportLogPath, `${logEntry}\n`);

  if (isCi && process.env.GITHUB_STEP_SUMMARY) {
    const md = [
      "## Bundle size",
      "",
      `**Commit:** \`${snapshot.commit.shortSha}\` — ${snapshot.commit.subject}`,
      "",
      "| Metric | Size | Δ vs previous |",
      "|--------|------|---------------|",
      `| Client JS | ${formatBytes(snapshot.metrics.clientJsBytes)} | ${formatSignedDelta(snapshot.diff?.clientJsBytes)} |`,
      `| Client CSS | ${formatBytes(snapshot.metrics.clientCssBytes)} | ${formatSignedDelta(snapshot.diff?.clientCssBytes)} |`,
      `| Client total | ${formatBytes(snapshot.metrics.totalClientBytes)} | ${formatSignedDelta(snapshot.diff?.totalClientBytes)} |`,
      "",
    ].join("\n");

    appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
  }

  return consoleReport;
};

const run = () => {
  if (process.env.SKIP_BUNDLE_SIZE === "1") {
    console.info("Bundle size report skipped (SKIP_BUNDLE_SIZE=1).");
    return;
  }

  if (shouldBuild) {
    console.info("Running production build before bundle analysis...");
    execSync("npm run build", { cwd: projectRoot, stdio: "inherit" });
  }

  if (!existsSync(nextDir)) {
    console.error('No .next directory found. Run "npm run build" or use --build.');
    process.exit(1);
  }

  const previous = loadPreviousSnapshot();
  const metrics = collectBundleMetrics();
  const commit = getGitCommit();
  const recordedAt = new Date().toISOString();

  const diff = previous
    ? {
        clientCssBytes: metrics.clientCssBytes - previous.metrics.clientCssBytes,
        clientJsBytes: metrics.clientJsBytes - previous.metrics.clientJsBytes,
        totalClientBytes: metrics.totalClientBytes - previous.metrics.totalClientBytes,
      }
    : null;

  const snapshot = {
    commit,
    diff,
    metrics,
    previousCommit: previous?.commit?.shortSha ?? null,
    recordedAt,
  };

  const consoleReport = printReport(snapshot, previous);
  writeLogs(snapshot, consoleReport);
};

run();
