import { describe, expect, it } from "vitest";

import { getClientKey } from "@/utils/layout/getClientKey";

describe("getClientKey", () => {
  it("returns a non-empty client query value", () => {
    expect(getClientKey({ client: "acme" })).toBe("acme");
  });

  it("ignores missing, empty, and array values", () => {
    expect(getClientKey({})).toBeUndefined();
    expect(getClientKey({ client: "" })).toBeUndefined();
    expect(getClientKey({ client: ["acme", "globex"] })).toBeUndefined();
  });
});
