import { logger } from "@/utils/logger";

type FetchLike = typeof fetch;

export const withInterceptors = (fetcher: FetchLike): FetchLike => {
  return async (input, init) => {
    const method = init?.method ?? "GET";
    const start = Date.now();
    const endpoint = String(input).split("?")[0] ?? String(input);

    try {
      const response = await fetcher(input, init);

      if (!response.ok) {
        logger.error(
          "api.request_failed",
          "HTTP request returned an error response",
          new Error(`HTTP ${response.status}`),
          {
            durationMs: Date.now() - start,
            endpoint,
            method,
            statusCode: response.status,
          },
        );
      } else {
        logger.info("api.request_completed", "HTTP request completed", {
          durationMs: Date.now() - start,
          endpoint,
          method,
          statusCode: response.status,
        });
      }

      return response;
    } catch (error) {
      logger.error("api.request_failed", "HTTP request failed", error, {
        durationMs: Date.now() - start,
        endpoint,
        method,
      });
      throw error;
    }
  };
};
