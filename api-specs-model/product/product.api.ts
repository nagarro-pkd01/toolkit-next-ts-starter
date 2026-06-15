// AUTO-GENERATED — DO NOT EDIT MANUALLY

import type { GetProductByIdRequest, GetProductByIdResponse } from "./product.types";

export async function getProductById(p: GetProductByIdRequest): Promise<GetProductByIdResponse> {
  const res = await fetch(`/api/v1/product/${p.path.productId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}
