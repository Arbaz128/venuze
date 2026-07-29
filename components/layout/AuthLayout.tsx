import type { ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 px-4 py-8">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-brand mb-4">
            <span className="text-white font-[700] text-[22px]">V</span>
          </a>
          <h1 className="text-[24px] font-[600] text-black">Welcome back</h1>
          <p className="text-[14px] font-[400] text-neutral-text-muted mt-1">
            Sign in to your Venuze account
          </p>
        </div>
        <div className="bg-white rounded-[20px] shadow-sm border border-neutral-border p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
