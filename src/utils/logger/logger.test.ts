import { describe, expect, it, vi } from "vitest";

import { logger } from "@/utils/logger/logger";

vi.mock("@/utils/logger/transports", () => {
  return {
    transports: {
      console: vi.fn(),
      datadog: vi.fn(),
      sentry: vi.fn(),
    },
  };
});

describe("logger", () => {
  it("emits info/warn/error to console transport with level", async () => {
    const error = new Error("failed");

    logger.info("test.info", "i", { a: 1 });
    logger.warn("test.warn", "w", { b: 2 });
    logger.error("test.error", "e", error, { c: 3 });

    const { transports } = await import("@/utils/logger/transports");
    expect(transports.console).toHaveBeenCalledTimes(3);
    expect(transports.console).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        context: { a: 1 },
        event: "test.info",
        level: "INFO",
        message: "i",
      }),
    );
    expect(transports.console).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        context: { b: 2 },
        event: "test.warn",
        level: "WARN",
        message: "w",
      }),
    );
    expect(transports.console).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        context: { c: 3 },
        error: expect.objectContaining({ message: "failed" }),
        event: "test.error",
        level: "ERROR",
        message: "e",
      }),
    );
  });
});
