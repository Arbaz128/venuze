"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUser } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";
import type { LoginRequest } from "@/types/auth";

export function useLogin() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (data: LoginRequest) => loginUser(data),
    onSuccess: (response) => {
      login({
        email: "eve.holt@reqres.in",
        token: response.token,
      });
      toast.success("Welcome back! You've been logged in successfully.");
      router.push("/dashboard");
    },
    onError: (error: unknown) => {
      const err = error as { message?: string };
      toast.error(err?.message || "Login failed. Please check your credentials.");
    },
  });
}
