type LogPayload = {
  context: Record<string, unknown>;
  level: "ERROR" | "INFO" | "WARN";
  message: string;
};

type Transport = (payload: LogPayload) => void;

const consoleTransport: Transport = ({ context, level, message }) => {
  const line = `[${new Date().toISOString()}] [${level}] ${message}`;
  if (level === "ERROR") {
    console.error(line, context);
    return;
  }
  if (level === "WARN") {
    console.warn(line, context);
    return;
  }
  console.info(line, context);
};

export const transports: Record<"console" | "datadog" | "sentry", Transport> = {
  console: consoleTransport,
  datadog: consoleTransport,
  sentry: consoleTransport,
};
