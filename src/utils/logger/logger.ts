import { transports } from "@/utils/logger/transports";

type LogContext = Record<string, unknown>;

const push = (level: "ERROR" | "INFO" | "WARN", message: string, context: LogContext) => {
  transports.console({ context, level, message });
};

export const logger = {
  error(message: string, context: LogContext = {}) {
    push("ERROR", message, context);
  },
  info(message: string, context: LogContext = {}) {
    push("INFO", message, context);
  },
  warn(message: string, context: LogContext = {}) {
    push("WARN", message, context);
  },
};
