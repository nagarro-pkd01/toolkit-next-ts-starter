import { afterEach, describe, expect, it, vi } from "vitest";

import { getGoogleAnalyticsId, trackEvent } from "@/services/analytics/google-analytics";

type GoogleAnalyticsWindow = Window & {
  gtag?: ReturnType<typeof vi.fn>;
};

afterEach(() => {
  vi.unstubAllEnvs();
  delete (globalThis as unknown as GoogleAnalyticsWindow).gtag;
});

describe("Google Analytics", () => {
  it("is disabled unless explicitly enabled", () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ANALYTICS_ID", "G-TEST123");

    expect(getGoogleAnalyticsId()).toBeUndefined();
  });

  it("rejects invalid measurement IDs", () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ANALYTICS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ANALYTICS_ID", "invalid-id");

    expect(getGoogleAnalyticsId()).toBeUndefined();
  });

  it("sends typed events through gtag when configured", () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ANALYTICS_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ANALYTICS_ID", "G-TEST123");

    const gtag = vi.fn();
    (globalThis as unknown as GoogleAnalyticsWindow).gtag = gtag;

    trackEvent("theme_changed", {
      source: "quick-toggle",
      theme: "dark",
    });

    expect(gtag).toHaveBeenCalledWith("event", "theme_changed", {
      source: "quick-toggle",
      theme: "dark",
    });
  });
});
