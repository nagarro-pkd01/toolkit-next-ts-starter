import { PERFORMANCE_FLAGS } from "@/constants/performanceConfig";
import type { PerformanceAlert } from "@/types/performance-types";
import { logger } from "@/utils/logger";

const requestBrowserNotification = async (alert: PerformanceAlert): Promise<void> => {
  if (!PERFORMANCE_FLAGS.notifyBrowser || typeof window === "undefined") {
    return;
  }

  if (!("Notification" in window)) {
    return;
  }

  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }

  if (Notification.permission !== "granted") {
    return;
  }

  const title = `${alert.metric} exceeded threshold`;
  const body = alert.recommendations[0] ?? `Measured ${alert.value}${alert.unit}`;

  new Notification(title, { body, tag: alert.id });
};

export const notifyPerformanceIssue = (alert: PerformanceAlert): void => {
  logger.warn("performance.threshold_exceeded", "Performance threshold exceeded", {
    metric: alert.metric,
    rating: alert.rating,
    recommendations: alert.recommendations,
    value: alert.value,
  });

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("performance-threshold-exceeded", {
        detail: { alert },
      }),
    );
  }

  void requestBrowserNotification(alert);
};
