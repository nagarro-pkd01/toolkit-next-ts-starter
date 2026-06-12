import pino from "pino";

type LogPayload = {
  context: Record<string, unknown>;
  error?: {
    message: string;
    name: string;
    stack?: string;
  };
  event: string;
  level: "ERROR" | "INFO" | "WARN";
  message: string;
  source: "client" | "server";
  timestamp: string;
};

type Transport = (payload: LogPayload) => void;

const pinoLogger = pino({
  base: null,
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  messageKey: "message",
  timestamp: false,
});

const consoleTransport: Transport = ({ level, ...payload }) => {
  const pinoLevel = level.toLowerCase() as "error" | "info" | "warn";
  pinoLogger[pinoLevel](payload);
};

export const transports: Record<"console", Transport> = {
  console: consoleTransport,
};
