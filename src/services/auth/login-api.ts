import { authClient } from "@/services/api-clients/auth-client";
import type { AuthUser } from "@/services/auth/auth-types";

type LoginPayload = {
  email: string;
  password: string;
};

export const loginApi = async (payload: LoginPayload): Promise<AuthUser> => {
  return authClient.post<AuthUser>("/login", payload);
};
