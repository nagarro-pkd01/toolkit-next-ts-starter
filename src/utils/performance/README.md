# Performance Utilities

This folder measures, rates, reports, and explains client performance signals.

## Responsibilities

- Observe Core Web Vitals and selected browser health signals.
- Compare measurements with configured thresholds.
- Create alerts and recommendations.
- Report metrics to the telemetry route when enabled.

## How to use

The performance provider and hook initialize these utilities; feature code should not start
duplicate observers. Change thresholds and feature flags in `src/constants/performanceConfig.ts`.

Keep measurement code lightweight and avoid collecting sensitive application content. See
`docs/PERFORMANCE_MONITORING.md` for configuration and behavior.
