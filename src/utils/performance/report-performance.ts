import { PERFORMANCE_FLAGS } from "@/constants/performanceConfig";
import type { PerformanceReportPayload } from "@/types/performance-types";
import { logger } from "@/utils/logger";

export const reportPerformance = async (payload: PerformanceReportPayload): Promise<void> => {
  logger.info("performance.report", "Performance report created", {
    alertCount: payload.alerts.length,
    metricCount: payload.metrics.length,
    path: payload.path,
  });

  if (!PERFORMANCE_FLAGS.reportToApi || typeof window === "undefined") {
    return;
  }

  try {
    await fetch("/api/telemetry/performance", {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      method: "POST",
    });
  } catch (error) {
    logger.error("performance.report_failed", "Performance report failed", error, {
      endpoint: "/api/telemetry/performance",
    });
  }
};
