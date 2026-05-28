import { createHttpClient } from "@/services/http/client";

export const vtexClient = createHttpClient({
  baseUrl: process.env.NEXT_PUBLIC_VTEX_URL ?? "https://vtex.example.com/api",
});
