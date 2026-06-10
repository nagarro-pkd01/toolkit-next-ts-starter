import { PERFORMANCE_THRESHOLDS } from "@/constants/performanceConfig";
import type { MetricRating, PerformanceMetricName } from "@/types/performance-types";

const rateByThresholds = (value: number, goodMax: number, poorMin: number): MetricRating => {
  if (value <= goodMax) {
    return "good";
  }

  if (value >= poorMin) {
    return "poor";
  }

  return "needs-improvement";
};

export const rateMetric = (metric: PerformanceMetricName, value: number): MetricRating => {
  switch (metric) {
    case "CLS":
      return rateByThresholds(value, PERFORMANCE_THRESHOLDS.CLS, 0.25);
    case "FCP":
      return rateByThresholds(value, PERFORMANCE_THRESHOLDS.FCP_MS, 3000);
    case "INP":
      return rateByThresholds(value, PERFORMANCE_THRESHOLDS.INP_MS, 500);
    case "LCP":
      return rateByThresholds(value, PERFORMANCE_THRESHOLDS.LCP_MS, 4000);
    case "TTFB":
      return rateByThresholds(value, PERFORMANCE_THRESHOLDS.TTFB_MS, 1800);
    case "LONG_TASK":
      return value >= PERFORMANCE_THRESHOLDS.LONG_TASK_MS * 4
        ? "poor"
        : value >= PERFORMANCE_THRESHOLDS.LONG_TASK_MS
          ? "needs-improvement"
          : "good";
    case "MEMORY_LEAK":
      return value >= PERFORMANCE_THRESHOLDS.MEMORY_GROWTH_PERCENT * 1.5
        ? "poor"
        : value >= PERFORMANCE_THRESHOLDS.MEMORY_GROWTH_PERCENT
          ? "needs-improvement"
          : "good";
    default:
      return "good";
  }
};
