"use client";

import { useThemeContext } from "@/providers/ThemeProvider";

export const useTheme = () => {
  const { preference, resolvedTheme, setPreference, toggleTheme } = useThemeContext();

  return {
    preference,
    resolvedTheme,
    setPreference,
    setTheme: setPreference,
    theme: resolvedTheme,
    toggleTheme,
  };
};
