import { loginApi } from "@/services/auth/loginApi";

export const authService = {
  login(email: string, password: string) {
    return loginApi({ email, password });
  },
};
