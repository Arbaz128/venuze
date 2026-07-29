import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  bgColor: string;
  textColor: "white" | "black";
}

export function StatCard({ value, label, bgColor, textColor }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-[20px]",
        "w-full h-[124px] px-5 py-[30px] gap-[10px]",
        bgColor
      )}
    >
      <span
        className={cn(
          "font-[700] text-[34px] leading-[30px] tracking-[-0.03em] text-center",
          textColor === "white" ? "text-white" : "text-black"
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "font-[400] text-[16px] leading-[24px] tracking-[-0.03em] text-center",
          textColor === "white" ? "text-white" : "text-black"
        )}
      >
        {label}
      </span>
    </div>
  );
}
