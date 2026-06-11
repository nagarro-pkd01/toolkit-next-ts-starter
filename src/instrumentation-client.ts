import { logger } from "@/utils/logger";

window.addEventListener("error", (event) => {
  logger.error(
    "ui.unhandled_error",
    "Unhandled browser error",
    event.error ?? new Error(event.message),
    {
      columnNumber: event.colno,
      fileName: event.filename,
      lineNumber: event.lineno,
      route: window.location.pathname,
    },
  );
});

window.addEventListener("unhandledrejection", (event) => {
  logger.error("ui.promise_rejection", "Unhandled promise rejection", event.reason, {
    route: window.location.pathname,
  });
});
