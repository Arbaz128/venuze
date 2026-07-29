import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface IconCircleProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  className?: string;
  iconClassName?: string;
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

const iconSizeMap = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-7 w-7",
};

export function IconCircle({ icon: Icon, size = "md", className, iconClassName }: IconCircleProps) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm",
        sizeMap[size],
        className
      )}
    >
      <Icon className={cn("text-white", iconSizeMap[size], iconClassName)} />
    </div>
  );
}
