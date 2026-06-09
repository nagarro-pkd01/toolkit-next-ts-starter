# Performance Monitoring

Client-side monitoring for Core Web Vitals, main-thread performance, and suspected memory growth. Wired globally through `PerformanceMonitorProvider` in `app/providers.tsx`.

## What is measured

| Signal | Source | Threshold basis |
|--------|--------|-----------------|
| **LCP** | `web-vitals` | Google CWV (≤2.5s good) |
| **INP** | `web-vitals` | Google CWV (≤200ms good) |
| **CLS** | `web-vitals` | Google CWV (≤0.1 good) |
| **FCP** | `web-vitals` | Common lab target (≤1.8s good) |
| **TTFB** | `web-vitals` | Server latency (≤800ms good) |
| **Long tasks** | `PerformanceObserver` (`longtask`) | >50ms needs attention |
| **Memory growth** | `performance.memory` (Chromium) | >30% growth over 5 samples (~2.5 min) |

Ratings: `good`, `needs-improvement`, `poor` (see `utils/performance/rateMetric.ts`).

## Notifications

When a metric is **not good**:

1. **Console** — structured `logger.warn` (`performance.threshold_exceeded`)
2. **In-app panel** — bottom-right “Room for improvement” with actionable tips (`PerformancePanel`)
3. **Browser notification** — optional if `NEXT_PUBLIC_PERFORMANCE_NOTIFY=true` and permission granted
4. **API report** — `POST /api/telemetry/performance` on tab hide (if reporting enabled)

## Configuration

`src/constants/performanceConfig.ts` and environment variables:

```bash
# .env.local
NEXT_PUBLIC_PERFORMANCE_MONITORING=true
NEXT_PUBLIC_PERFORMANCE_IN_APP_PANEL=true
NEXT_PUBLIC_PERFORMANCE_REPORT_API=true
NEXT_PUBLIC_PERFORMANCE_NOTIFY=false
```

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_PERFORMANCE_MONITORING` | on (`!== false`) | Master switch |
| `NEXT_PUBLIC_PERFORMANCE_IN_APP_PANEL` | on | Show improvement panel |
| `NEXT_PUBLIC_PERFORMANCE_REPORT_API` | on | POST batch to telemetry API |
| `NEXT_PUBLIC_PERFORMANCE_NOTIFY` | off | Desktop notifications |

Tune thresholds in `PERFORMANCE_THRESHOLDS` (same file).

## Memory leak detection (heuristic)

Not a substitute for heap profiling. The monitor samples `usedJSHeapSize` every 30s; if usage grows more than 30% across 5 consecutive samples without a full navigation reset, it emits a `MEMORY_LEAK` alert with cleanup recommendations.

Works only where `performance.memory` exists (mainly Chromium). Other browsers skip memory sampling.

## Extending

- **Production RUM**: forward `reportPerformance` payload to Datadog, Sentry, or your analytics endpoint.
- **Recommendations**: edit `utils/performance/getRecommendations.ts`.
- **Per-route budgets**: instantiate `PerformanceMonitor` with custom thresholds on specific pages.

## Verify locally

1. `npm run dev`
2. Open any page; open DevTools Console — look for `performance.report` / threshold warnings
3. Throttle CPU (Performance tab) and interact — long-task or INP alerts may appear
4. Set `NEXT_PUBLIC_PERFORMANCE_NOTIFY=true`, allow notifications, trigger a poor metric

## Related docs

- `docs/RENDERING_STRATEGIES.md` — how rendering choices affect LCP/TTFB
- `docs/LOGGING.md` — log event naming
