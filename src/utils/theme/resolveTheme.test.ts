import { afterEach, describe, expect, it } from "vitest";

import { THEME_STORAGE_KEY } from "@/constants/themeConstants";
import { persistTheme, readStoredTheme, resolveTheme } from "@/utils/theme/resolveTheme";

describe("resolveTheme", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("returns explicit light and dark preferences", () => {
    expect(resolveTheme("light")).toBe("light");
    expect(resolveTheme("dark")).toBe("dark");
  });

  it("resolves system preference from matchMedia", () => {
    expect(resolveTheme("system")).toBe("light");
  });
});

describe("readStoredTheme", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("returns stored valid theme preferences", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");

    expect(readStoredTheme()).toBe("dark");
  });

  it("falls back to system for invalid stored values", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "sepia");

    expect(readStoredTheme()).toBe("system");
  });
});

describe("persistTheme", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("stores the theme preference", () => {
    persistTheme("light");

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
  });
});
