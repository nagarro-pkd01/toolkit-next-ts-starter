import { describe, expect, it, vi } from "vitest";

import { transports } from "@/utils/logger/transports";

describe("transports.console", () => {
  it("logs ERROR via console.error", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    transports.console({ level: "ERROR", message: "m", context: { a: 1 } });

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it("logs WARN via console.warn", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    transports.console({ level: "WARN", message: "m", context: { a: 1 } });

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it("logs INFO via console.info", () => {
    const spy = vi.spyOn(console, "info").mockImplementation(() => undefined);

    transports.console({ level: "INFO", message: "m", context: { a: 1 } });

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
