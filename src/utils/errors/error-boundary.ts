import { errorHandler } from "@/utils/errors/error-handler";

export const withErrorBoundary = async <T>(
  action: () => Promise<T>,
  context: Record<string, unknown>,
): Promise<T> => {
  try {
    return await action();
  } catch (error) {
    throw errorHandler(error, context);
  }
};
