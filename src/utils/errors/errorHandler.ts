import { logger } from "@/utils/logger/logger";

import { AppError } from "./AppError";

export const errorHandler = (error: unknown, context: Record<string, unknown> = {}): AppError => {
  if (error instanceof AppError) {
    logger.error(error.message, { ...context, ...error.context, code: error.code });
    return error;
  }

  if (error instanceof Error) {
    const normalized = new AppError(error.message, {
      code: "UNEXPECTED_ERROR",
      context: { ...context, name: error.name },
    });
    logger.error(normalized.message, normalized.context);
    return normalized;
  }

  const normalized = new AppError("Unknown failure", {
    code: "UNKNOWN_ERROR",
    context: { ...context, error },
  });
  logger.error(normalized.message, normalized.context);
  return normalized;
};
