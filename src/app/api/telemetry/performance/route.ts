import type { PerformanceReportPayload } from "@/types/performance-types";
import { logger } from "@/utils/logger";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const payload = (await request.json()) as PerformanceReportPayload;

  logger.info("performance.telemetry_received", {
    alertCount: payload.alerts.length,
    metrics: payload.metrics.map((metric) => ({
      metric: metric.metric,
      rating: metric.rating,
      value: metric.value,
    })),
    path: payload.path,
    reportedAt: payload.reportedAt,
  });

  for (const alert of payload.alerts) {
    logger.warn("performance.telemetry_alert", {
      metric: alert.metric,
      rating: alert.rating,
      recommendations: alert.recommendations,
      value: alert.value,
    });
  }

  return Response.json({ ok: true });
}
