import { transports } from "@/utils/logger/transports";

type LogContext = Record<string, unknown>;

const serializeError = (error: unknown) => {
  if (!(error instanceof Error)) {
    return undefined;
  }

  return {
    message: error.message,
    name: error.name,
    stack: error.stack,
  };
};

const push = (
  level: "ERROR" | "INFO" | "WARN",
  event: string,
  message: string,
  context: LogContext,
  error?: unknown,
) => {
  try {
    transports.console({
      context,
      error: serializeError(error),
      event,
      level,
      message,
      source: typeof window === "undefined" ? "server" : "client",
      timestamp: new Date().toISOString(),
    });
  } catch {
    // Logging must never interrupt application behavior.
  }
};

export const logger = {
  error(event: string, message: string, error: unknown, context: LogContext = {}) {
    push("ERROR", event, message, context, error);
  },
  info(event: string, message: string, context: LogContext = {}) {
    push("INFO", event, message, context);
  },
  warn(event: string, message: string, context: LogContext = {}) {
    push("WARN", event, message, context);
  },
};
