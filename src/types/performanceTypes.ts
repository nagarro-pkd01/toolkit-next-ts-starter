export type MetricRating = "good" | "needs-improvement" | "poor";

export type PerformanceMetricName =
  | "CLS"
  | "FCP"
  | "INP"
  | "LCP"
  | "LONG_TASK"
  | "MEMORY_LEAK"
  | "TTFB";

export type PerformanceAlert = {
  detectedAt: string;
  id: string;
  metric: PerformanceMetricName;
  rating: Exclude<MetricRating, "good">;
  recommendations: string[];
  unit: string;
  value: number;
};

export type PerformanceReportPayload = {
  alerts: PerformanceAlert[];
  metrics: PerformanceMetricSnapshot[];
  path: string;
  reportedAt: string;
  userAgent: string;
};

export type PerformanceMetricSnapshot = {
  metric: PerformanceMetricName;
  rating: MetricRating;
  value: number;
};

export type PerformanceThresholdEventDetail = {
  alert: PerformanceAlert;
};

declare global {
  interface Performance {
    memory?: {
      jsHeapSizeLimit: number;
      totalJSHeapSize: number;
      usedJSHeapSize: number;
    };
  }

  interface WindowEventMap {
    "performance-threshold-exceeded": CustomEvent<PerformanceThresholdEventDetail>;
  }
}
