import { loginApi } from "@/modules/auth/api/login.api";

export const authService = {
  login(email: string, password: string) {
    return loginApi({ email, password });
  },
};
