"use client";

import type { ReactNode } from "react";

import { PerformancePanel } from "@/components/organisms/PerformancePanel/PerformancePanel";
import { usePerformanceMonitoring } from "@/hooks/usePerformanceMonitoring";

type PerformanceMonitorProviderProps = {
  children: ReactNode;
};

export const PerformanceMonitorProvider = ({ children }: PerformanceMonitorProviderProps) => {
  usePerformanceMonitoring();

  return (
    <>
      {children}
      <PerformancePanel />
    </>
  );
};
