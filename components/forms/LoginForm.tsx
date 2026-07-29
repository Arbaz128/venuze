"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useState } from "react";
import { loginSchema, type LoginFormValues } from "@/lib/validations";
import { useLogin } from "@/hooks/useLogin";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const apiError =
    loginMutation.isError && !loginMutation.isPending
      ? (loginMutation.error as { response?: { data?: { error?: string } } })
          ?.response?.data?.error
      : null;

  return (
    <form onSubmit={handleSubmit((data) => loginMutation.mutate(data))} noValidate>
      {apiError && (
        <div
          className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-[10px] px-4 py-3 mb-5"
          role="alert"
        >
          <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-[13px] font-[400] text-red-600">{apiError}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-[13px] font-[500] text-neutral-text-muted2 mb-1.5">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-text-muted pointer-events-none" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              {...register("email")}
              className={cn(
                "w-full h-11 pl-10 pr-4 rounded-[10px] border text-[13px] outline-none transition-colors",
                "focus:border-brand focus:ring-2 focus:ring-brand/20",
                errors.email ? "border-red-400" : "border-neutral-border"
              )}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="mt-1 text-[11px] text-red-500" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-[13px] font-[500] text-neutral-text-muted2 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-text-muted pointer-events-none" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              {...register("password")}
              className={cn(
                "w-full h-11 pl-10 pr-10 rounded-[10px] border text-[13px] outline-none transition-colors",
                "focus:border-brand focus:ring-2 focus:ring-brand/20",
                errors.password ? "border-red-400" : "border-neutral-border"
              )}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-text-muted hover:text-black transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="mt-1 text-[11px] text-red-500" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full mt-6 h-12 bg-brand text-white rounded-[10px] font-[600] text-[14px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {loginMutation.isPending ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Logging in...
          </>
        ) : (
          "Log in"
        )}
      </button>

      <p className="text-[11px] text-center text-neutral-text-muted mt-5">
        Demo: eve.holt@reqres.in / cityslicka
      </p>
    </form>
  );
}
