import { describe, expect, it } from "vitest";

import { THEME_CLASS, THEME_STORAGE_KEY } from "@/constants/themeConstants";
import { themeInitScript } from "@/utils/theme/theme-init-script";

describe("themeInitScript", () => {
  it("includes the storage key and theme class", () => {
    expect(themeInitScript).toContain(THEME_STORAGE_KEY);
    expect(themeInitScript).toContain(THEME_CLASS);
  });
});
