import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "card" | "image" | "avatar" | "circular";
}

export function Skeleton({ className, variant = "text", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200",
        variant === "text" && "h-4 w-full rounded",
        variant === "card" && "h-48 w-full rounded-[20px]",
        variant === "image" && "aspect-[4/3] w-full rounded-[20px]",
        variant === "avatar" && "h-12 w-12 rounded-full",
        variant === "circular" && "h-10 w-10 rounded-full",
        className
      )}
      {...props}
    />
  );
}

export function VenueCardSkeleton() {
  return (
    <div className="min-w-[280px] flex-shrink-0">
      <Skeleton variant="image" className="h-52" />
      <div className="mt-3 space-y-2 p-1">
        <div className="flex items-center gap-2">
          <Skeleton variant="text" className="h-5 w-16" />
          <Skeleton variant="text" className="h-5 w-20" />
        </div>
        <Skeleton variant="text" className="h-6 w-3/4" />
        <div className="flex gap-2">
          <Skeleton variant="text" className="h-6 w-16 rounded-full" />
          <Skeleton variant="text" className="h-6 w-20 rounded-full" />
          <Skeleton variant="text" className="h-6 w-14 rounded-full" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton variant="text" className="h-5 w-20" />
          <Skeleton variant="text" className="h-5 w-24" />
        </div>
      </div>
    </div>
  );
}
