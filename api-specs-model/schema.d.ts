// AUTO-GENERATED — DO NOT EDIT MANUALLY

export interface paths {
  "/health": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Health check endpoint */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              success?: boolean;
              data?: {
                /** @enum {string} */
                status?: "ok" | "degraded" | "down";
                uptime?: number;
                timestamp?: string;
                version?: string;
              };
              error?: null | Record<string, never>;
              meta?: {
                requestId?: string;
                timestamp?: string;
              };
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/auth/classic-signin": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description Authenticate a user with email and password via VTEX ID */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          "application/json": {
            username: string;
            password: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              success?: boolean;
              data?: {
                authStatus?: string;
              };
              error?: null | Record<string, never>;
              meta?: {
                requestId?: string;
                timestamp?: string;
              };
            };
          };
        };
        /** @description Missing or invalid request fields */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @example false */
              success?: boolean;
              data?: null | Record<string, never>;
              error?: {
                /** @example AUTH_INVALID_EMAIL */
                code?: string;
                /** @example Invalid email address */
                message?: string;
              };
              meta?: {
                requestId?: string;
                timestamp?: string;
              };
            };
          };
        };
        /** @description Unauthorized responses */
        401: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
        /** @description Account is blocked or usage limits exceeded */
        403: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @example false */
              success?: boolean;
              data?: null;
              error?: {
                /** @example AUTH_ACCOUNT_LOCKED */
                code?: string;
                /** @example Account is blocked */
                message?: string;
              };
              meta?: {
                requestId?: string;
                timestamp?: string;
              };
            };
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/auth/logout": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Log out the current user and clear VTEX ID session cookies */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        204: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/checkout/cart": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Retrieve the current user's cart */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              success?: boolean;
              data?: {
                itemCount?: number;
                cartId?: string;
                locale?: string;
                items?: {
                  id?: string;
                  seller?: string;
                  quantity?: number;
                  price?: number;
                }[];
              };
              error?: null | Record<string, never>;
              meta?: {
                requestId?: string;
                timestamp?: string;
              };
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/checkout/cart/add-items": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** @description Add one or more items to the current user's cart */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          "application/json": {
            skuId: string;
            sellerId: string;
            quantity: number;
          }[];
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              success?: boolean;
              data?: {
                itemCount?: number;
                cartId?: string;
                locale?: string;
                items?: {
                  id?: string;
                  seller?: string;
                  quantity?: number;
                  price?: number;
                }[];
              };
              error?: null | Record<string, never>;
              meta?: {
                requestId?: string;
                timestamp?: string;
              };
            };
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/product/{productId}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Get product details with variations and SKU context */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          productId: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              success?: boolean;
              data?: {
                product?: {
                  [key: string]: unknown;
                };
                variations?: {
                  [key: string]: unknown;
                };
              } & {
                [key: string]: unknown;
              };
              error?: null | Record<string, never>;
              meta?: {
                requestId?: string;
                timestamp?: string;
              } & {
                [key: string]: unknown;
              };
            } & {
              [key: string]: unknown;
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: never;
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
