"use client";

import { useThemeContext } from "@/components/organisms/theme-provider/ThemeProvider";

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
