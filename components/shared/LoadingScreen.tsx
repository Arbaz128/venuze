"use client";

import Image from "next/image";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-dark-bg">
      <Image
        src="/images/logo.svg"
        alt="Venuze"
        width={120}
        height={22}
        className="h-5 w-auto mb-6"
        priority
      />
      <div className="h-10 w-10 rounded-full border-2 border-brand border-t-transparent animate-spin" />
    </div>
  );
}
