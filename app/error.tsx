"use client";

import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-6" />
        <h1 className="text-2xl font-semibold text-muted-dark mb-2">Something went wrong</h1>
        <p className="text-muted text-sm mb-6">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <Button variant="primary" onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
