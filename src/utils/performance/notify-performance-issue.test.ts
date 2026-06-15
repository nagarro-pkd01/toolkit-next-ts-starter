import { describe, expect, it, vi } from "vitest";

import type { PerformanceAlert } from "@/types/performance-types";

vi.mock("@/utils/logger", () => {
  return {
    logger: {
      warn: vi.fn(),
    },
  };
});

describe("notifyPerformanceIssue", () => {
  it("logs a warning and dispatches browser event when window exists", async () => {
    const { notifyPerformanceIssue } = await import("@/utils/performance/notify-performance-issue");
    const alert: PerformanceAlert = {
      detectedAt: "t",
      id: "id",
      metric: "LCP",
      rating: "poor",
      recommendations: ["r1"],
      unit: "ms",
      value: 5000,
    };

    const dispatchSpy = vi.spyOn(window, "dispatchEvent");

    notifyPerformanceIssue(alert);

    const { logger } = await import("@/utils/logger");
    expect(logger.warn).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });

  it("does not throw when Notification is unavailable", async () => {
    const { notifyPerformanceIssue } = await import("@/utils/performance/notify-performance-issue");
    const alert: PerformanceAlert = {
      detectedAt: "t",
      id: "id",
      metric: "LCP",
      rating: "poor",
      recommendations: [],
      unit: "ms",
      value: 5000,
    };

    notifyPerformanceIssue(alert);
  });

  it("requests permission and sends Notification when enabled and granted", async () => {
    const previous = process.env.NEXT_PUBLIC_PERFORMANCE_NOTIFY;
    process.env.NEXT_PUBLIC_PERFORMANCE_NOTIFY = "true";
    vi.resetModules();

    const requestPermission = vi.fn(async () => {
      NotificationMock.permission = "granted";
      return "granted";
    });
    const notificationCtor = vi.fn();

    class NotificationMock {
      static permission: NotificationPermission = "default";
      static requestPermission = requestPermission;
      constructor(title: string, options: NotificationOptions) {
        notificationCtor(title, options);
      }
    }

    // @ts-expect-error test stub
    globalThis.Notification = NotificationMock;

    const { notifyPerformanceIssue } = await import("@/utils/performance/notify-performance-issue");
    const alert: PerformanceAlert = {
      detectedAt: "t",
      id: "id",
      metric: "LCP",
      rating: "poor",
      recommendations: [],
      unit: "ms",
      value: 5000,
    };

    notifyPerformanceIssue(alert);

    // wait for the internal async permission flow to settle
    await Promise.resolve();
    await Promise.resolve();

    expect(requestPermission).toHaveBeenCalledTimes(1);
    expect(notificationCtor).toHaveBeenCalledTimes(1);

    process.env.NEXT_PUBLIC_PERFORMANCE_NOTIFY = previous;
    // @ts-expect-error test cleanup
    delete globalThis.Notification;
  });
});
