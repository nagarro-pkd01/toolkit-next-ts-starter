import { createHttpClient } from "@/services/http/client";

export const strapiClient = createHttpClient({
  baseUrl: process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://strapi.example.com/api",
});
