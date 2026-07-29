"use client";

import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const { user, token, isAuthenticated } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
  };
}
