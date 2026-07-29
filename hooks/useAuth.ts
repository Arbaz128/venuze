"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { user, isAuthenticated, logout, hydrate } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const requireAuth = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return false;
    }
    return true;
  };

  const signOut = () => {
    logout();
    router.push("/login");
  };

  return {
    user,
    isAuthenticated,
    requireAuth,
    signOut,
  };
}
