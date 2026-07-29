import type { Metadata } from "next";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Login | Venuze",
  description: "Sign in to your Venuze account.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
