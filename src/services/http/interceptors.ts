import { logger } from "@/lib/logger/logger";

type FetchLike = typeof fetch;

export const withInterceptors = (fetcher: FetchLike): FetchLike => {
  return async (input, init) => {
    const method = init?.method ?? "GET";
    const start = Date.now();
    const response = await fetcher(input, init);

    logger.info("HTTP request completed", {
      durationMs: Date.now() - start,
      method,
      status: response.status,
      url: String(input),
    });

    return response;
  };
};
