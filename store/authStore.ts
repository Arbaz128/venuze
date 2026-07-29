/*
 * Zustand persist handles client-side rehydration (instant correct UI on refresh).
 * A separate cookie is set in parallel because Next.js Edge Middleware runs on
 * the server and cannot read localStorage — the cookie is the single source of
 * truth for route protection in proxy.ts.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import type { User } from "@/types/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        Cookies.set("auth_token", token, { expires: 1, sameSite: "lax" });
        set({ user, token, isAuthenticated: true });
      },
      clearAuth: () => {
        Cookies.remove("auth_token");
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    { name: "auth-storage" }
  )
);
