import { createHttpClient } from "@/services/http/client";

export const internalClient = createHttpClient({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
});
