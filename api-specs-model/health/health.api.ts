// AUTO-GENERATED — DO NOT EDIT MANUALLY

import type { GetHealthResponse } from "./health.types";

export async function getHealth(): Promise<GetHealthResponse> {
  const res = await fetch("/health", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}
