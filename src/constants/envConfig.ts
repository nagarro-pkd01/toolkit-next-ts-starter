export const ENV = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "Toolkit Commerce",
  authApiUrl: process.env.NEXT_PUBLIC_AUTH_API_URL ?? "http://localhost:3000/api/auth",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
  placeholderApiUrl:
    process.env.NEXT_PUBLIC_PLACEHOLDER_API_URL ?? "https://jsonplaceholder.typicode.com",
} as const;
