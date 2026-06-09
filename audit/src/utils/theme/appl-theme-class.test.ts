import { afterEach, describe, expect, it } from "vitest";

import { THEME_CLASS } from "@/constants/themeConstants";
import { applyThemeClass } from "@/utils/theme/apply-theme-class";

describe("applyThemeClass", () => {
  afterEach(() => {
    document.documentElement.classList.remove(THEME_CLASS);
  });

  it("adds the dark theme class for dark mode", () => {
    applyThemeClass("dark");

    expect(document.documentElement).toHaveClass(THEME_CLASS);
  });

  it("removes the dark theme class for light mode", () => {
    document.documentElement.classList.add(THEME_CLASS);

    applyThemeClass("light");

    expect(document.documentElement).not.toHaveClass(THEME_CLASS);
  });
});
