import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Sign In — Venuze",
  description: "Sign in to your Venuze account to manage venues and bookings.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <h1 className="text-2xl font-semibold text-muted-dark">Welcome back</h1>
          <p className="text-sm text-muted mt-1">Sign in to your Venuze account</p>
        </div>

        <div className="bg-white rounded-[20px] shadow-sm border border-border p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
