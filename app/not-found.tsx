import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SearchX } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Venuze",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-dark-bg">
      <div className="text-center max-w-md">
        <SearchX className="h-16 w-16 text-muted dark:text-neutral-text-muted mx-auto mb-6" />
        <h1 className="text-2xl font-semibold text-muted-dark dark:text-dark-text mb-2">Page not found</h1>
        <p className="text-muted dark:text-neutral-text-muted text-sm mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
