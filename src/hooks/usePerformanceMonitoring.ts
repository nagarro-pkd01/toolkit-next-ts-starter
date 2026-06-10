"use client";

import { useEffect, useRef } from "react";

import { PERFORMANCE_FLAGS } from "@/constants/performanceConfig";
import { usePerformanceStore } from "@/store/performance-store";
import { PerformanceMonitor } from "@/utils/performance/performance-monitor";

export const usePerformanceMonitoring = (): void => {
  const addAlert = usePerformanceStore((state) => state.addAlert);
  const monitorRef = useRef<PerformanceMonitor | null>(null);

  useEffect(() => {
    if (!PERFORMANCE_FLAGS.enabled) {
      return;
    }

    const monitor = new PerformanceMonitor({ onAlert: addAlert });
    monitorRef.current = monitor;
    monitor.start();

    return () => {
      monitor.dispose();
      monitorRef.current = null;
    };
  }, [addAlert]);
};
