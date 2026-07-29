"use client";

import { type ReactNode } from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/Toaster";
import { EnvCheck } from "@/providers/EnvCheck";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        {children}
        <Toaster />
        <EnvCheck />
      </ThemeProvider>
    </QueryProvider>
  );
}
