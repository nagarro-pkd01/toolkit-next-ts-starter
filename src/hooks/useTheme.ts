"use client";

import { useThemeContext } from "@/components/organisms/ThemeProvider/ThemeProvider";

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
