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
});
