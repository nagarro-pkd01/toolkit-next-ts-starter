import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";

import { PERFORMANCE_THRESHOLDS } from "@/constants/performanceConfig";
import type {
  PerformanceAlert,
  PerformanceMetricName,
  PerformanceMetricSnapshot,
  PerformanceReportPayload,
} from "@/types/performance-types";
import { createPerformanceAlert } from "@/utils/performance/create-performance-alert";
import { notifyPerformanceIssue } from "@/utils/performance/notify-performance-issue";
import { rateMetric } from "@/utils/performance/rate-metric";
import { reportPerformance } from "@/utils/performance/report-performance";

type MonitorOptions = {
  onAlert?: (alert: PerformanceAlert) => void;
};

const metricUnit: Record<PerformanceMetricName, string> = {
  CLS: "",
  FCP: "ms",
  INP: "ms",
  LCP: "ms",
  LONG_TASK: "ms",
  MEMORY_LEAK: "%",
  TTFB: "ms",
};

export class PerformanceMonitor {
  private alerts: PerformanceAlert[] = [];
  private disposed = false;
  private readonly handlePageHide = () => {
    void this.flushReport();
  };
  private readonly handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      void this.flushReport();
    }
  };
  private longTaskObserver: PerformanceObserver | undefined;
  private memorySamples: number[] = [];
  private memoryTimer: ReturnType<typeof setInterval> | undefined;
  private metrics: PerformanceMetricSnapshot[] = [];
  private onAlert?: (alert: PerformanceAlert) => void;
  private reportedWebVitals = new Set<PerformanceMetricName>();
  private started = false;
  private thresholdAlerted = new Set<PerformanceMetricName>();

  constructor(options?: MonitorOptions) {
    this.onAlert = options?.onAlert;
  }

  start(): void {
    if (this.disposed || this.started || typeof window === "undefined") {
      return;
    }

    this.started = true;
    this.registerWebVitals();
    this.registerLongTasks();
    this.registerMemorySampling();
    this.registerPageUnloadReport();
  }

  dispose(): void {
    if (this.disposed) {
      return;
    }

    this.disposed = true;
    this.longTaskObserver?.disconnect();
    this.longTaskObserver = undefined;

    if (this.memoryTimer !== undefined) {
      clearInterval(this.memoryTimer);
      this.memoryTimer = undefined;
    }

    if (typeof window !== "undefined") {
      document.removeEventListener("visibilitychange", this.handleVisibilityChange);
      window.removeEventListener("pagehide", this.handlePageHide);
    }

    this.onAlert = undefined;
  }

  getAlerts(): PerformanceAlert[] {
    return [...this.alerts];
  }

  private registerWebVitals(): void {
    const handleVital = (metricName: PerformanceMetricName, value: number) => {
      if (this.reportedWebVitals.has(metricName)) {
        return;
      }

      this.reportedWebVitals.add(metricName);
      this.recordMetric(metricName, value);
    };

    onLCP((metric) => handleVital("LCP", metric.value));
    onINP((metric) => handleVital("INP", metric.value));
    onCLS((metric) => handleVital("CLS", metric.value));
    onFCP((metric) => handleVital("FCP", metric.value));
    onTTFB((metric) => handleVital("TTFB", metric.value));
  }

  private registerLongTasks(): void {
    if (typeof PerformanceObserver === "undefined") {
      return;
    }

    try {
      this.longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric("LONG_TASK", entry.duration);
        }
      });
      this.longTaskObserver.observe({ buffered: true, type: "longtask" });
    } catch {
      // longtask not supported in all browsers
    }
  }

  private registerMemorySampling(): void {
    if (!performance.memory) {
      return;
    }

    const sample = () => {
      this.memorySamples.push(performance.memory?.usedJSHeapSize ?? 0);

      if (this.memorySamples.length > PERFORMANCE_THRESHOLDS.MEMORY_LEAK_SAMPLE_COUNT) {
        this.memorySamples.shift();
      }

      if (this.memorySamples.length < PERFORMANCE_THRESHOLDS.MEMORY_LEAK_SAMPLE_COUNT) {
        return;
      }

      const first = this.memorySamples[0] ?? 0;
      const last = this.memorySamples.at(-1) ?? 0;

      if (first <= 0) {
        return;
      }

      const growthPercent = ((last - first) / first) * 100;

      if (growthPercent > 0) {
        this.recordMetric("MEMORY_LEAK", Math.round(growthPercent));
      }
    };

    sample();
    this.memoryTimer = setInterval(sample, PERFORMANCE_THRESHOLDS.MEMORY_SAMPLE_INTERVAL_MS);
  }

  private registerPageUnloadReport(): void {
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    window.addEventListener("pagehide", this.handlePageHide);
  }

  private recordMetric(metric: PerformanceMetricName, value: number): void {
    // web-vitals v5 does not expose unsubscribe functions, so callbacks may outlive this instance.
    if (this.disposed) {
      return;
    }

    const roundedValue = metric === "CLS" ? Number(value.toFixed(3)) : Math.round(value);
    const rating = rateMetric(metric, roundedValue);

    this.metrics.push({ metric, rating, value: roundedValue });

    if (rating === "good" || this.thresholdAlerted.has(metric)) {
      return;
    }

    this.thresholdAlerted.add(metric);

    const alert = createPerformanceAlert({
      metric,
      rating,
      unit: metricUnit[metric],
      value: roundedValue,
    });

    this.alerts.push(alert);
    this.onAlert?.(alert);
    notifyPerformanceIssue(alert);
  }

  private async flushReport(): Promise<void> {
    if (this.metrics.length === 0) {
      return;
    }

    const payload: PerformanceReportPayload = {
      alerts: this.alerts,
      metrics: this.metrics,
      path: window.location.pathname,
      reportedAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };

    await reportPerformance(payload);
  }
}
