"use client";

import type { ReactNode } from "react";

import { PerformanceMonitorProvider } from "@/components/organisms/performance-monitor/PerformanceMonitorProvider";

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return <PerformanceMonitorProvider>{children}</PerformanceMonitorProvider>;
};
