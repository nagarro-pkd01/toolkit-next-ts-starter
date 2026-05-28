"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("theme-dark");
      return;
    }
    document.documentElement.classList.remove("theme-dark");
  }, [theme]);

  return { setTheme, theme };
};
