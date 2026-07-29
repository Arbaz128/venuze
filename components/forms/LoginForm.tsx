"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { useLogin } from "@/hooks/useLogin";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-muted-dark mb-1.5">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...register("email")}
            className={cn(
              "w-full h-11 pl-10 pr-4 rounded-[10px] border text-sm outline-none transition-colors",
              "focus:border-primary focus:ring-2 focus:ring-primary/20",
              errors.email ? "border-red-400" : "border-border"
            )}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </div>
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-red-500" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-muted-dark mb-1.5">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            {...register("password")}
            className={cn(
              "w-full h-11 pl-10 pr-10 rounded-[10px] border text-sm outline-none transition-colors",
              "focus:border-primary focus:ring-2 focus:ring-primary/20",
              errors.password ? "border-red-400" : "border-border"
            )}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-muted-dark"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <p id="password-error" className="mt-1 text-xs text-red-500" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        loading={loginMutation.isPending || isSubmitting}
        disabled={loginMutation.isPending || isSubmitting}
      >
        Sign In
      </Button>

      <p className="text-xs text-center text-muted mt-4">
        Demo: eve.holt@reqres.in / cityslicka
      </p>
    </form>
  );
}
