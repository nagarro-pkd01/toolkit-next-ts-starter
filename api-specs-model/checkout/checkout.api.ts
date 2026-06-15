// AUTO-GENERATED — DO NOT EDIT MANUALLY

import type {
  GetCheckoutResponse,
  PostCheckoutRequest,
  PostCheckoutResponse,
} from "./checkout.types";

export async function getCheckout(): Promise<GetCheckoutResponse> {
  const res = await fetch("/api/v1/checkout/cart", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export async function postCheckout(p: PostCheckoutRequest): Promise<PostCheckoutResponse> {
  const res = await fetch("/api/v1/checkout/cart/add-items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(p.body),
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}
