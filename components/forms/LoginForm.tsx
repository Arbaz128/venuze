"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, AlertCircle, RefreshCw } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { loginSchema, type LoginFormValues } from "@/lib/validations";
import { useLogin } from "@/hooks/useLogin";
import { cn } from "@/lib/utils";
import type { AppError } from "@/lib/errors";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
  const slowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastValuesRef = useRef<LoginFormValues | null>(null);

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const isPending = loginMutation.isPending;
  const error = loginMutation.error as AppError | null;

  useEffect(() => {
    if (isPending) {
      slowTimerRef.current = setTimeout(() => setIsSlow(true), 3000);
    } else {
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
      setIsSlow(false);
    }
    return () => {
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    };
  }, [isPending]);

  const handleTryAgain = () => {
    if (lastValuesRef.current) {
      loginMutation.reset();
      loginMutation.mutate(lastValuesRef.current);
    }
  };

  const showRetry = error && (error.kind === "TIMEOUT" || error.kind === "NETWORK" || error.kind === "SERVER");

  return (
    <form
      onSubmit={handleSubmit((data) => {
        lastValuesRef.current = data;
        loginMutation.mutate(data);
      })}
      noValidate
    >
      {error && (
        <div
          className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-[10px] px-4 py-3 mb-5"
          role="alert"
        >
          <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-[400] text-red-600">{error.message}</p>
            {showRetry && (
              <button
                type="button"
                onClick={handleTryAgain}
                className="inline-flex items-center gap-1 mt-2 text-[12px] font-[500] text-red-700 hover:text-red-800 underline transition-colors"
              >
                <RefreshCw size={12} />
                Try Again
              </button>
            )}
          </div>
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

      {isSlow && (
        <p className="text-[11px] font-[400] text-amber-600 text-center mt-2 animate-pulse">
          This is taking longer than usual — the demo server can be slow.
        </p>
      )}

      <p className="text-[11px] text-center text-neutral-text-muted mt-3">
        Demo: eve.holt@reqres.in / cityslicka
      </p>
    </form>
  );
}
