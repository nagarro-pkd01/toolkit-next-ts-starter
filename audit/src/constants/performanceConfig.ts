/** Google Core Web Vitals thresholds (milliseconds unless noted). */
export const PERFORMANCE_THRESHOLDS = {
  CLS: 0.1,
  FCP_MS: 1800,
  INP_MS: 200,
  LCP_MS: 2500,
  LONG_TASK_MS: 50,
  MEMORY_GROWTH_PERCENT: 30,
  MEMORY_LEAK_SAMPLE_COUNT: 5,
  MEMORY_SAMPLE_INTERVAL_MS: 30_000,
  TTFB_MS: 800,
} as const;

export const PERFORMANCE_FLAGS = {
  /** Master switch for client monitoring. */
  enabled: process.env.NEXT_PUBLIC_PERFORMANCE_MONITORING !== "false",
  /** POST metrics to /api/telemetry/performance. */
  reportToApi: process.env.NEXT_PUBLIC_PERFORMANCE_REPORT_API !== "false",
  /** Show in-app improvement panel when thresholds are exceeded. */
  showInAppPanel: process.env.NEXT_PUBLIC_PERFORMANCE_IN_APP_PANEL !== "false",
  /** Request browser Notification permission and alert on violations. */
  notifyBrowser: process.env.NEXT_PUBLIC_PERFORMANCE_NOTIFY === "true",
} as const;
