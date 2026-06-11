import type { Instrumentation } from "next";

import { logger } from "@/utils/logger";

export const onRequestError: Instrumentation.onRequestError = (error, request, context) => {
  logger.error("server.request_error", "Unhandled Next.js server error", error, {
    method: request.method,
    requestPath: request.path,
    route: context.routePath,
    routeType: context.routeType,
  });
};
