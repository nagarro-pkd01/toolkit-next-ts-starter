import { createHttpClient } from "@/services/http/client";

export const authClient = createHttpClient({
  baseUrl: process.env.NEXT_PUBLIC_AUTH_API_URL ?? "http://localhost:3000/api/auth",
});
