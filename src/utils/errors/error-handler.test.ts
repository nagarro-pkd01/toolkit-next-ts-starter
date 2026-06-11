import { beforeEach, describe, expect, it, vi } from "vitest";

import { AppError } from "@/utils/errors/app-error";
import { errorHandler } from "@/utils/errors/error-handler";

vi.mock("@/utils/logger/transports", () => {
  return {
    transports: {
      console: vi.fn(),
      datadog: vi.fn(),
      sentry: vi.fn(),
    },
  };
});

describe("errorHandler", () => {
  beforeEach(async () => {
    const { transports } = await import("@/utils/logger/transports");
    vi.mocked(transports.console).mockClear();
  });

  it("logs and returns the same AppError", async () => {
    const err = new AppError("bad", { code: "BAD", context: { a: 1 } });

    const result = errorHandler(err, { reqId: "r1" });

    expect(result).toBe(err);

    const { transports } = await import("@/utils/logger/transports");
    expect(transports.console).toHaveBeenCalledTimes(1);
    expect(transports.console).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "ERROR",
        message: "bad",
        context: expect.objectContaining({ reqId: "r1", a: 1, code: "BAD" }),
      }),
    );
  });

  it("normalizes a native Error into AppError with UNEXPECTED_ERROR", async () => {
    const result = errorHandler(new TypeError("nope"), { page: "x" });

    expect(result).toBeInstanceOf(AppError);
    expect(result.code).toBe("UNEXPECTED_ERROR");
    expect(result.context).toEqual({ page: "x", name: "TypeError" });

    const { transports } = await import("@/utils/logger/transports");
    expect(transports.console).toHaveBeenCalledTimes(1);
  });

  it("normalizes non-Error values into AppError with UNKNOWN_ERROR", async () => {
    const result = errorHandler("wat", { op: "y" });

    expect(result).toBeInstanceOf(AppError);
    expect(result.code).toBe("UNKNOWN_ERROR");
    expect(result.context).toEqual({ op: "y", error: "wat" });

    const { transports } = await import("@/utils/logger/transports");
    expect(transports.console).toHaveBeenCalledTimes(1);
  });
});
