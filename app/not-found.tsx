import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SearchX } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Venuze",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <SearchX className="h-16 w-16 text-muted mx-auto mb-6" />
        <h1 className="text-2xl font-semibold text-muted-dark mb-2">Page not found</h1>
        <p className="text-muted text-sm mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
