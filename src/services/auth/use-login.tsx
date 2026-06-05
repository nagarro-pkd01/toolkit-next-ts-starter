"use client";

import { useMutation } from "@tanstack/react-query";
import type { AuthUser } from "@/services/auth/auth-types";
import { loginApi } from "@/services/auth/login-api";

type LoginPayload = {
  email: string;
  password: string;
};

export const useLogin = () => {
  return useMutation<AuthUser, Error, LoginPayload>({
    mutationFn: (payload: LoginPayload) => loginApi(payload),
  });
};
