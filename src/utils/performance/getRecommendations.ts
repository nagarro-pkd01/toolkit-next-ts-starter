import type { MetricRating, PerformanceMetricName } from "@/types/performanceTypes";

type RecommendationMap = Record<
  PerformanceMetricName,
  Partial<Record<Exclude<MetricRating, "good">, string[]>>
>;

const RECOMMENDATIONS: RecommendationMap = {
  CLS: {
    poor: [
      "Reserve space for images and ads with explicit width/height to avoid layout shifts.",
      "Avoid inserting content above existing content unless triggered by user interaction.",
      "Use CSS transform animations instead of properties that trigger layout (top, height).",
    ],
    "needs-improvement": [
      "Audit fonts and late-loading banners that push content down after paint.",
      "Preload critical fonts and use font-display: optional where acceptable.",
    ],
  },
  FCP: {
    poor: [
      "Reduce render-blocking CSS and JavaScript on the critical path.",
      "Inline critical CSS or split styles so above-the-fold content paints sooner.",
      "Use SSR/SSG so HTML arrives with meaningful content instead of a blank shell.",
    ],
    "needs-improvement": [
      "Defer non-critical scripts and load third-party tags after first paint.",
      "Compress and prioritize hero images; prefer next/image with priority.",
    ],
  },
  INP: {
    poor: [
      "Break up long JavaScript tasks (>50ms) with scheduling (requestIdleCallback, setTimeout).",
      "Reduce main-thread work in event handlers; debounce input and virtualize long lists.",
      "Audit third-party scripts that run on every click or keypress.",
    ],
    "needs-improvement": [
      "Move heavy computation to Web Workers where possible.",
      "Split large Client Components and lazy-load below-the-fold interactivity.",
    ],
  },
  LCP: {
    poor: [
      "Optimize the LCP element (usually hero image or heading block): compress, preload, use CDN.",
      "Remove render-blocking resources delaying the largest paint.",
      "Ensure the LCP image uses fetchpriority=high and explicit dimensions.",
    ],
    "needs-improvement": [
      "Serve modern image formats (WebP/AVIF) and responsive srcset.",
      "Reduce server response time (TTFB) for the document and LCP resource.",
    ],
  },
  LONG_TASK: {
    poor: [
      "Profile the main thread in Chrome DevTools Performance panel to find blocking scripts.",
      "Code-split routes and heavy components with dynamic import.",
      "Defer analytics and non-essential SDKs until after user interaction.",
    ],
    "needs-improvement": [
      "Cache expensive computations and avoid synchronous JSON.parse on large payloads.",
    ],
  },
  MEMORY_LEAK: {
    poor: [
      "Check for listeners, intervals, and subscriptions not cleaned up in useEffect return.",
      "Avoid retaining large objects in module-level caches or global stores without bounds.",
      "Use React DevTools Profiler and heap snapshots to find detached DOM nodes.",
    ],
    "needs-improvement": [
      "Review Client Components that append to document without teardown on unmount.",
      "Cap cache sizes in Zustand or in-memory maps; clear on route change if needed.",
    ],
  },
  TTFB: {
    poor: [
      "Improve server response: database queries, upstream APIs, and cold starts.",
      "Use ISR or static generation for pages that do not need per-request data.",
      "Enable CDN caching for HTML where personalization is not required.",
    ],
    "needs-improvement": [
      "Co-locate data fetching with the route and parallelize independent requests.",
      "Add caching headers or revalidate intervals for semi-static content.",
    ],
  },
};

export const getRecommendations = (
  metric: PerformanceMetricName,
  rating: Exclude<MetricRating, "good">,
): string[] => {
  const items = RECOMMENDATIONS[metric][rating];

  if (items && items.length > 0) {
    return items;
  }

  return [`Investigate ${metric} regressions using browser DevTools and production RUM data.`];
};
