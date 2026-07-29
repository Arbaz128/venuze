import Image from "next/image";
import type { ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-[#1A0A08] dark:via-dark-bg dark:to-[#1A0A08] px-4 py-8">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex justify-center mb-4">
            <Image src="/images/logo.svg" alt="Venuze" width={140} height={25} className="h-6 w-auto" />
          </a>
          <h1 className="text-[24px] font-[600] text-black dark:text-dark-text">Welcome back</h1>
          <p className="text-[14px] font-[400] text-neutral-text-muted mt-1">
            Sign in to your Venuze account
          </p>
        </div>
        <div className="bg-white dark:bg-dark-card rounded-[20px] shadow-sm border border-neutral-border dark:border-neutral-300 p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
