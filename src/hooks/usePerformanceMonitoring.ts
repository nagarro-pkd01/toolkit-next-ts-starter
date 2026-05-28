"use client";

import { useEffect, useRef } from "react";

import { PERFORMANCE_FLAGS } from "@/constants/performanceConfig";
import { usePerformanceStore } from "@/store/performanceStore";
import { PerformanceMonitor } from "@/utils/performance/performanceMonitor";

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
