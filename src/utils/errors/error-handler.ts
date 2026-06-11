import { logger } from "@/utils/logger/logger";

import { AppError } from "./app-error";

export const errorHandler = (error: unknown, context: Record<string, unknown> = {}): AppError => {
  if (error instanceof AppError) {
    logger.error("application.error", error.message, error, {
      ...context,
      ...error.context,
      code: error.code,
    });
    return error;
  }

  if (error instanceof Error) {
    const normalized = new AppError(error.message, {
      code: "UNEXPECTED_ERROR",
      context: { ...context, name: error.name },
    });
    logger.error("application.unexpected_error", normalized.message, error, normalized.context);
    return normalized;
  }

  const normalized = new AppError("Unknown failure", {
    code: "UNKNOWN_ERROR",
    context: { ...context, error },
  });
  logger.error("application.unknown_error", normalized.message, error, normalized.context);
  return normalized;
};
