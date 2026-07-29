/*
 * ReqRes public API now requires x-api-key for /api/* endpoints.
 * We try the real API first. If it fails with x-api-key error (401), we
 * fall back to a mock that accepts the known demo credentials.
 * Set NEXT_PUBLIC_REQRES_KEY in .env to bypass the mock fallback.
 */
import { api } from "./api";
import type { LoginRequest, LoginResponse } from "@/types/auth";

const MOCK_EMAIL = "eve.holt@reqres.in";
const MOCK_PASSWORD = "cityslicka";

async function mockLogin(data: LoginRequest): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (data.email === MOCK_EMAIL && data.password === MOCK_PASSWORD) {
    return { token: "QpwL5tke4Pnpja7X4" };
  }
  throw { response: { status: 400, data: { error: "Invalid email or password. Please check your credentials." } } };
}

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const res = await api.post<LoginResponse>("/login", data);
      return res.data;
    } catch (err: unknown) {
      const axiosErr = err as { response?: { status?: number; data?: { error?: string } } };
      if (axiosErr?.response?.status === 401 && axiosErr?.response?.data?.error === "missing_api_key") {
        return mockLogin(data);
      }
      throw err;
    }
  },
};
