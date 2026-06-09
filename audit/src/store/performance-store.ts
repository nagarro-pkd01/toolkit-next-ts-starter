import { create } from "zustand";

import type { PerformanceAlert } from "@/types/performance-types";

type PerformanceState = {
  alerts: PerformanceAlert[];
  addAlert: (alert: PerformanceAlert) => void;
  clearAlerts: () => void;
  dismissAlert: (id: string) => void;
  isPanelOpen: boolean;
  setPanelOpen: (isOpen: boolean) => void;
};

export const usePerformanceStore = create<PerformanceState>((set) => ({
  alerts: [],
  addAlert: (alert) =>
    set((state) => ({
      alerts: state.alerts.some((item) => item.id === alert.id)
        ? state.alerts
        : [...state.alerts, alert],
      isPanelOpen: true,
    })),
  clearAlerts: () => set({ alerts: [] }),
  dismissAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    })),
  isPanelOpen: false,
  setPanelOpen: (isPanelOpen) => set({ isPanelOpen }),
}));
