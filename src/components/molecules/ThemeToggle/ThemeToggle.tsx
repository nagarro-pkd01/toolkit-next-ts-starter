"use client";

import { Button } from "@/components/atoms/button/Button";
import { useThemeContext } from "@/components/organisms/ThemeProvider/ThemeProvider";
import type { ThemePreference } from "@/constants/themeConstants";

import styles from "./ThemeToggle.module.scss";

const PREFERENCE_LABELS: Record<ThemePreference, string> = {
  dark: "Dark",
  light: "Light",
  system: "System",
};

export const ThemeToggle = () => {
  const { preference, resolvedTheme, setPreference, toggleTheme } = useThemeContext();

  return (
    <div className={styles.toggle}>
      <Button
        aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
        className={styles.iconButton}
        onClick={toggleTheme}
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
            onClick={() => setPreference(option)}
            type="button"
          >
            {PREFERENCE_LABELS[option]}
          </button>
        ))}
      </fieldset>
    </div>
  );
};
