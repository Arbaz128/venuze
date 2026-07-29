"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";
import type { AppError } from "@/lib/errors";
import type { LoginRequest, LoginResponse } from "@/types/auth";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation<LoginResponse, AppError, LoginRequest>({
    mutationFn: authService.login,
    retry: false,
    onSuccess: (data, variables) => {
      const mockUser = {
        id: "1",
        email: variables.email,
        name: variables.email.split("@")[0],
      };
      setAuth(mockUser, data.token);
      const redirectTo = searchParams.get("redirect") || "/dashboard";
      router.push(redirectTo);
    },
  });
}
