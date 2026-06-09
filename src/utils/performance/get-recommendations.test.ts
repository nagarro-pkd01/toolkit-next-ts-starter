import { describe, expect, it } from "vitest";

import { getRecommendations } from "@/utils/performance/get-recommendations";

describe("getRecommendations", () => {
  it("returns metric-specific recommendations", () => {
    const recommendations = getRecommendations("LCP", "poor");

    expect(recommendations).toContain(
      "Optimize the LCP element (usually hero image or heading block): compress, preload, use CDN.",
    );
  });

  it("returns recommendations for needs-improvement ratings", () => {
    expect(getRecommendations("LONG_TASK", "needs-improvement")).toEqual([
      "Cache expensive computations and avoid synchronous JSON.parse on large payloads.",
    ]);
  });
});
