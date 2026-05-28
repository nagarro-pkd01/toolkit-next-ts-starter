export const env = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "Toolkit Commerce",
  authApiUrl: process.env.NEXT_PUBLIC_AUTH_API_URL ?? "http://localhost:3000/api/auth",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
} as const;
