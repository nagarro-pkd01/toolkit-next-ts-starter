import { AppError } from "@/lib/errors/AppError";
import { withInterceptors } from "@/services/http/interceptors";

type HttpClientConfig = {
  baseUrl: string;
  defaultHeaders?: HeadersInit;
};

const requestWith = (config: HttpClientConfig) => {
  const interceptedFetch = withInterceptors(fetch);

  return {
    async get<T>(path: string, init?: RequestInit): Promise<T> {
      const response = await interceptedFetch(`${config.baseUrl}${path}`, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...config.defaultHeaders,
          ...init?.headers,
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new AppError("HTTP GET failed", {
          code: "HTTP_GET_FAILED",
          context: { path, status: response.status },
          statusCode: response.status,
        });
      }

      return (await response.json()) as T;
    },
    async post<T>(path: string, body: unknown, init?: RequestInit): Promise<T> {
      const response = await interceptedFetch(`${config.baseUrl}${path}`, {
        ...init,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          ...config.defaultHeaders,
          ...init?.headers,
        },
        method: "POST",
      });

      if (!response.ok) {
        throw new AppError("HTTP POST failed", {
          code: "HTTP_POST_FAILED",
          context: { path, status: response.status },
          statusCode: response.status,
        });
      }

      return (await response.json()) as T;
    },
  };
};

export const createHttpClient = (config: HttpClientConfig) => requestWith(config);
