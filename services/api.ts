import axios, { type AxiosError } from "axios";
import axiosRetry from "axios-retry";
import { useAuthStore } from "@/store/authStore";

const REQUEST_TIMEOUT_MS = 10_000;

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://reqres.in/api",
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_REQRES_API_KEY ?? "",
  },
});

axiosRetry(api, {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error: AxiosError) => {
    const isTimeoutOrNetwork = error.code === "ECONNABORTED" || !error.response;
    const isServerError = !!error.response && error.response.status >= 500;
    return isTimeoutOrNetwork || isServerError;
  },
  onRetry: (retryCount, error, requestConfig) => {
    console.warn(
      `[api] Retry attempt ${retryCount} for ${requestConfig.url} after: ${error.message}`
    );
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const isLoginRequest = error.config?.url?.includes("/login");
      if (!isLoginRequest) {
        useAuthStore.getState().clearAuth();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);
