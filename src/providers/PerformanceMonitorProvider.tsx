"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import { usePerformanceMonitoring } from "@/hooks/usePerformanceMonitoring";
import { usePerformanceStore } from "@/store/performance-store";

const PerformancePanel = dynamic(
  () =>
    import("@/components/Performance/performance-panel/PerformancePanel").then(
      (module) => module.PerformancePanel,
    ),
  { ssr: false },
);

type PerformanceMonitorProviderProps = {
  children: ReactNode;
};

export const PerformanceMonitorProvider = ({ children }: PerformanceMonitorProviderProps) => {
  usePerformanceMonitoring();
  const hasAlerts = usePerformanceStore((state) => state.alerts.length > 0);

  return (
    <>
      {children}
      {hasAlerts ? <PerformancePanel /> : null}
    </>
  );
};
