import { authClient } from "@/services/api-clients/authClient";
import type { AuthUser } from "@/services/auth/authTypes";

type LoginPayload = {
  email: string;
  password: string;
};

export const loginApi = async (payload: LoginPayload): Promise<AuthUser> => {
  return authClient.post<AuthUser>("/login", payload);
};
