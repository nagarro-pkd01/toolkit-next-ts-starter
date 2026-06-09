"use client";

import { useState } from "react";

import type { AuthUser } from "@/services/auth/auth-types";

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);

  return { setUser, user };
};
