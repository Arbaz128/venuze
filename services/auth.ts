import { api } from "./api";
import { normalizeAxiosError } from "@/lib/errors";
import type { LoginRequest, LoginResponse } from "@/types/auth";

const DEMO_EMAIL = "eve.holt@reqres.in";
const DEMO_PASSWORD = "cityslicka";

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const res = await api.post<LoginResponse>("/login", data);
      return res.data;
    } catch (error) {
      const appError = normalizeAxiosError(error);

      const fallbackEnabled =
        process.env.NEXT_PUBLIC_ENABLE_DEMO_FALLBACK === "true";
      const isTransient =
        appError.kind === "TIMEOUT" || appError.kind === "NETWORK";
      const isDemoCredentials =
        data.email === DEMO_EMAIL && data.password === DEMO_PASSWORD;

      if (fallbackEnabled && isTransient && isDemoCredentials) {
        console.warn(
          "[DEMO FALLBACK] reqres.in unreachable — using local mock auth response"
        );
        return { token: "demo-fallback-token" };
      }

      throw appError;
    }
  },
};
