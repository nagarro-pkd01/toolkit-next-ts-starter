import { ENV } from "@/constants/envConfig";
import { createHttpClient } from "@/services/http/client";

export const placeholderClient = createHttpClient({
  baseUrl: ENV.placeholderApiUrl,
});
