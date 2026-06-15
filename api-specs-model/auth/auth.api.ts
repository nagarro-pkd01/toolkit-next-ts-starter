// AUTO-GENERATED — DO NOT EDIT MANUALLY

import type { PostAuthRequest, PostAuthResponse, GetAuthResponse } from "./auth.types";

export async function postAuth(p: PostAuthRequest): Promise<PostAuthResponse> {
  const res = await fetch("/api/v1/auth/classic-signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(p.body),
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export async function getAuth(): Promise<GetAuthResponse> {
  const res = await fetch("/api/v1/auth/logout", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}
