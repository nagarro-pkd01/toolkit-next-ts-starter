declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_NAME?: string;
      NEXT_PUBLIC_AUTH_API_URL?: string;
      NEXT_PUBLIC_BASE_URL?: string;
      NEXT_PUBLIC_STRAPI_URL?: string;
      NEXT_PUBLIC_VTEX_URL?: string;
    }
  }
}

export {};
