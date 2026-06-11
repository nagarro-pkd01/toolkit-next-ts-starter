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
    logger.info("i", { a: 1 });
    logger.warn("w", { b: 2 });
    logger.error("e", { c: 3 });

    const { transports } = await import("@/utils/logger/transports");
    expect(transports.console).toHaveBeenCalledTimes(3);
    expect(transports.console).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ level: "INFO", message: "i", context: { a: 1 } }),
    );
    expect(transports.console).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ level: "WARN", message: "w", context: { b: 2 } }),
    );
    expect(transports.console).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ level: "ERROR", message: "e", context: { c: 3 } }),
    );
  });
});
