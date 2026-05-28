export class AppError extends Error {
  readonly code: string;
  readonly context: Record<string, unknown>;
  readonly statusCode: number;

  constructor(
    message: string,
    options: {
      code?: string;
      context?: Record<string, unknown>;
      statusCode?: number;
    } = {},
  ) {
    super(message);
    this.name = "AppError";
    this.code = options.code ?? "APP_ERROR";
    this.context = options.context ?? {};
    this.statusCode = options.statusCode ?? 500;
  }
}
