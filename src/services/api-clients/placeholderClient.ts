import { ENV } from "@/constants/config";
import { createHttpClient } from "@/services/http/client";

export const placeholderClient = createHttpClient({
  baseUrl: ENV.placeholderApiUrl,
});
