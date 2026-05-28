"use client";

import type { ReactNode } from "react";

import { PerformanceMonitorProvider } from "@/components/organisms/performance-monitor/PerformanceMonitorProvider";
import { ThemeProvider } from "@/components/organisms/theme-provider/ThemeProvider";

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider>
      <PerformanceMonitorProvider>{children}</PerformanceMonitorProvider>
    </ThemeProvider>
  );
};
