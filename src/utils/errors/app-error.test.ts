import { describe, expect, it } from "vitest";

import { AppError } from "@/utils/errors/app-error";

describe("AppError", () => {
  it("uses defaults when options not provided", () => {
    const err = new AppError("boom");

    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe("AppError");
    expect(err.message).toBe("boom");
    expect(err.code).toBe("APP_ERROR");
    expect(err.statusCode).toBe(500);
    expect(err.context).toEqual({});
  });

  it("supports custom code, statusCode and context", () => {
    const err = new AppError("nope", {
      code: "VALIDATION_ERROR",
      statusCode: 400,
      context: { field: "email" },
    });

    expect(err.code).toBe("VALIDATION_ERROR");
    expect(err.statusCode).toBe(400);
    expect(err.context).toEqual({ field: "email" });
  });
});
