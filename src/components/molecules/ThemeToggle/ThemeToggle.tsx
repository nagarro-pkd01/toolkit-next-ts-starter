"use client";

import { Button } from "@/components/atoms/Button/Button";
import type { ThemePreference } from "@/constants/themeConstants";
import { useThemeContext } from "@/providers/ThemeProvider";
import { trackEvent } from "@/services/analytics/google-analytics";

import styles from "./ThemeToggle.module.scss";

const PREFERENCE_LABELS: Record<ThemePreference, string> = {
  dark: "Dark",
  light: "Light",
  system: "System",
};

export const ThemeToggle = () => {
  const { preference, resolvedTheme, setPreference, toggleTheme } = useThemeContext();

  const handleThemeToggle = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

    toggleTheme();
    trackEvent("theme_changed", {
      source: "quick-toggle",
      theme: nextTheme,
    });
  };

  const handlePreferenceChange = (nextPreference: ThemePreference) => {
    setPreference(nextPreference);
    trackEvent("theme_changed", {
      source: "preference-selector",
      theme: nextPreference,
    });
  };

  return (
    <div className={styles.toggle}>
      <Button
        aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
        className={styles.iconButton}
        onClick={handleThemeToggle}
        title="Toggle light / dark"
        type="button"
      >
        {resolvedTheme === "dark" ? "☀️" : "🌙"}
      </Button>
      <fieldset aria-label="Theme preference" className={styles.segmented}>
        {(["light", "dark", "system"] as const).map((option) => (
          <button
            aria-pressed={preference === option}
            className={preference === option ? styles.active : styles.option}
            key={option}
            onClick={() => handlePreferenceChange(option)}
            type="button"
          >
            {PREFERENCE_LABELS[option]}
          </button>
        ))}
      </fieldset>
    </div>
  );
};
