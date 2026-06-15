import { describe, expect, it, vi } from "vitest";

import { delay } from "@/utils/rendering/delay";

describe("delay", () => {
  it("resolves after the requested time", async () => {
    vi.useFakeTimers();

    const promise = delay(50);

    await vi.advanceTimersByTimeAsync(49);
    const settledEarly = await Promise.race([promise.then(() => true), Promise.resolve(false)]);
    expect(settledEarly).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    await expect(promise).resolves.toBeUndefined();

    vi.useRealTimers();
  });
});
