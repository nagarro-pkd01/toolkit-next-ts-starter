"use client";

import { PERFORMANCE_FLAGS } from "@/constants/performanceConfig";
import { usePerformanceStore } from "@/store/performance-store";

import styles from "./PerformancePanel.module.scss";

export const PerformancePanel = () => {
  const alerts = usePerformanceStore((state) => state.alerts);
  const dismissAlert = usePerformanceStore((state) => state.dismissAlert);
  const isPanelOpen = usePerformanceStore((state) => state.isPanelOpen);
  const setPanelOpen = usePerformanceStore((state) => state.setPanelOpen);
  const clearAlerts = usePerformanceStore((state) => state.clearAlerts);

  if (!PERFORMANCE_FLAGS.showInAppPanel || alerts.length === 0) {
    return null;
  }

  return (
    <aside
      aria-label="Performance improvements"
      className={isPanelOpen ? styles.panelOpen : styles.panelCollapsed}
    >
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Performance</p>
          <h2 className={styles.title}>Room for improvement</h2>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.iconButton}
            onClick={() => setPanelOpen(!isPanelOpen)}
            type="button"
          >
            {isPanelOpen ? "−" : "+"}
          </button>
          <button className={styles.iconButton} onClick={clearAlerts} type="button">
            Clear
          </button>
        </div>
      </header>
      {isPanelOpen ? (
        <ul className={styles.list}>
          {alerts.map((alert) => (
            <li key={alert.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.badge} data-rating={alert.rating}>
                  {alert.metric}
                </span>
                <span className={styles.value}>
                  {alert.value}
                  {alert.unit}
                </span>
                <button
                  aria-label={`Dismiss ${alert.metric} alert`}
                  className={styles.dismiss}
                  onClick={() => dismissAlert(alert.id)}
                  type="button"
                >
                  ×
                </button>
              </div>
              <ul className={styles.recommendations}>
                {alert.recommendations.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
};
