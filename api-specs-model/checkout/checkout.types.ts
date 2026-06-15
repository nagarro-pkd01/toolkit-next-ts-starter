// AUTO-GENERATED — DO NOT EDIT MANUALLY

import type { paths } from "../schema";

export type GetCheckoutResponse =
  paths["/api/v1/checkout/cart"]["get"]["responses"][200]["content"]["application/json"];

export type PostCheckoutRequest = {
  body: paths["/api/v1/checkout/cart/add-items"]["post"]["requestBody"]["content"]["application/json"];
};

export type PostCheckoutResponse =
  paths["/api/v1/checkout/cart/add-items"]["post"]["responses"][200]["content"]["application/json"];
