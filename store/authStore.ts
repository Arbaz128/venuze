import { create } from "zustand";
import type { AuthState } from "@/types/auth";

const AUTH_KEY = "venuze-auth";

function getStoredAuth() {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed?.state?.user ?? null;
    }
  } catch {
    // ignore
  }
  return null;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user) => {
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_KEY);
    }
    set({ user: null, isAuthenticated: false });
  },

  hydrate: () => {
    const user = getStoredAuth();
    if (user) {
      set({ user, isAuthenticated: true });
    }
  },
}));
