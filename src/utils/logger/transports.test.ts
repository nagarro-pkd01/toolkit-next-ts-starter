import { describe, expect, it } from "vitest";

import { transports } from "@/utils/logger/transports";

describe("transports.console", () => {
  it.each(["ERROR", "INFO", "WARN"] as const)("accepts a %s payload", (level) => {
    expect(() =>
      transports.console({
        context: { a: 1 },
        event: "test.transport",
        level,
        message: "m",
        source: "server",
        timestamp: "2026-06-15T00:00:00.000Z",
      }),
    ).not.toThrow();
  });
});
