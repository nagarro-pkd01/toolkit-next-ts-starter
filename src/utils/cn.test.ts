import { describe, expect, it } from "vitest";

import { cn } from "@/utils/cn";

describe("cn", () => {
  it("joins truthy class names", () => {
    expect(cn("button", "buttonPrimary")).toBe("button buttonPrimary");
  });

  it("omits falsey class names", () => {
    expect(cn("button", false, null, undefined, "isActive")).toBe("button isActive");
  });
});
