import { describe, expect, it } from "vitest";

import { rateMetric } from "@/utils/performance/rateMetric";

describe("rateMetric", () => {
  it("rates LCP as good within threshold", () => {
    expect(rateMetric("LCP", 2000)).toBe("good");
  });

  it("rates LCP as poor above threshold", () => {
    expect(rateMetric("LCP", 5000)).toBe("poor");
  });

  it("rates CLS as needs-improvement between thresholds", () => {
    expect(rateMetric("CLS", 0.15)).toBe("needs-improvement");
  });

  it.each([
    ["FCP", 1800, 3000],
    ["INP", 200, 500],
    ["TTFB", 800, 1800],
  ] as const)("rates %s by standard thresholds", (metric, goodValue, poorValue) => {
    expect(rateMetric(metric, goodValue)).toBe("good");
    expect(rateMetric(metric, (goodValue + poorValue) / 2)).toBe("needs-improvement");
    expect(rateMetric(metric, poorValue)).toBe("poor");
  });

  it("rates long tasks by configured duration bands", () => {
    expect(rateMetric("LONG_TASK", 49)).toBe("good");
    expect(rateMetric("LONG_TASK", 50)).toBe("needs-improvement");
    expect(rateMetric("LONG_TASK", 200)).toBe("poor");
  });

  it("rates memory growth by configured percentage bands", () => {
    expect(rateMetric("MEMORY_LEAK", 29)).toBe("good");
    expect(rateMetric("MEMORY_LEAK", 30)).toBe("needs-improvement");
    expect(rateMetric("MEMORY_LEAK", 45)).toBe("poor");
  });
});
