import type { AuthUser } from "@/modules/auth/types";
import { authClient } from "@/services/api-clients/auth.client";

type LoginPayload = {
  email: string;
  password: string;
};

export const loginApi = async (payload: LoginPayload): Promise<AuthUser> => {
  return authClient.post<AuthUser>("/login", payload);
};
