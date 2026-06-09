import { type ResolvedTheme, THEME_CLASS } from "@/constants/themeConstants";

export const applyThemeClass = (resolved: ResolvedTheme): void => {
  document.documentElement.classList.toggle(THEME_CLASS, resolved === "dark");
};
