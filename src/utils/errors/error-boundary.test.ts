import { describe, expect, it, vi } from "vitest";

import { AppError } from "@/utils/errors/app-error";
import { withErrorBoundary } from "@/utils/errors/error-boundary";

vi.mock("@/utils/errors/error-handler", () => {
  return {
    errorHandler: vi.fn(() => new AppError("wrapped", { code: "WRAPPED" })),
  };
});

describe("withErrorBoundary", () => {
  it("returns action result when successful", async () => {
    await expect(withErrorBoundary(async () => 123, { reqId: "r1" })).resolves.toBe(123);
  });

  it("throws AppError when action rejects", async () => {
    await expect(
      withErrorBoundary(
        async () => {
          throw new Error("boom");
        },
        { reqId: "r1" },
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});
