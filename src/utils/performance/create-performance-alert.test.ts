import { describe, expect, it, vi } from "vitest";

import { createPerformanceAlert } from "@/utils/performance/create-performance-alert";

describe("createPerformanceAlert", () => {
  it("creates a stable alert shape", () => {
    vi.setSystemTime(new Date("2026-01-01T00:00:00.000Z"));
    vi.spyOn(Date, "now").mockReturnValue(123);

    const alert = createPerformanceAlert({
      metric: "LCP",
      rating: "needs-improvement",
      unit: "ms",
      value: 3200,
    });

    expect(alert.detectedAt).toBe("2026-01-01T00:00:00.000Z");
    expect(alert.id).toBe("LCP-needs-improvement-123");
    expect(alert.metric).toBe("LCP");
    expect(alert.rating).toBe("needs-improvement");
    expect(alert.unit).toBe("ms");
    expect(alert.value).toBe(3200);
    expect(Array.isArray(alert.recommendations)).toBe(true);
  });
});
