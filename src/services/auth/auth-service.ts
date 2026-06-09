import { loginApi } from "@/services/auth/login-api";

export const authService = {
  login(email: string, password: string) {
    return loginApi({ email, password });
  },
};
