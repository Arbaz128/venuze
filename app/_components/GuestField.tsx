"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Users, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuestFieldProps {
  value: string;
  onChange: (value: string) => void;
  variant?: "hero" | "compact";
}

export function GuestField({ value, onChange, variant = "hero" }: GuestFieldProps) {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(value ? parseInt(value, 10) || 1 : 1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (open && triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 6, left: r.left, width: Math.max(r.width, 240) });
    }
  }, [open]);

  const handleApply = () => {
    onChange(`${count} Guest${count !== 1 ? "s" : ""}`);
    setOpen(false);
  };

  const handleOverlayClick = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => { setCount(value ? parseInt(value, 10) || 1 : 1); setOpen(true); }}
        className={cn(
          "flex items-center gap-3 text-left w-full",
          variant === "hero" ? "px-4 py-3" : "px-4 py-2.5"
        )}
      >
        <Users className={cn("flex-shrink-0", variant === "hero" ? "h-5 w-5 text-[#767676]" : "h-4 w-4 text-[#767676]")} />
        <div className="flex-1 min-w-0">
          <span className={cn("block font-[600]", variant === "hero" ? "text-[11px]" : "text-[10px]", "text-[#767676]")}>Guest</span>
          <span className={cn("block truncate", value ? "text-black dark:text-dark-text font-[500]" : "text-[#A0A0A0]", variant === "hero" ? "text-[14px]" : "text-[12px]")}>
            {value || (variant === "hero" ? "Add guests" : "10-20 Guests")}
          </span>
        </div>
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-[100]" onClick={handleOverlayClick}>
          <div
            className="absolute bg-white dark:bg-dark-card rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.18)] border border-neutral-200 dark:border-neutral-300 p-5"
            style={{ top: pos.top, left: pos.left, width: pos.width }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-[14px] font-[500] text-black dark:text-dark-text">Guests</span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setCount((c) => Math.max(1, c - 1))}
                  disabled={count <= 1}
                  className="h-8 w-8 flex items-center justify-center rounded-full border border-neutral-300 text-black dark:text-dark-text hover:bg-neutral-50 dark:hover:bg-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Decrease guests"
                >
                  <Minus size={14} />
                </button>
                <span className="text-[16px] font-[600] text-black dark:text-dark-text min-w-[24px] text-center">{count}</span>
                <button
                  type="button"
                  onClick={() => setCount((c) => Math.min(500, c + 1))}
                  disabled={count >= 500}
                  className="h-8 w-8 flex items-center justify-center rounded-full border border-neutral-300 text-black dark:text-dark-text hover:bg-neutral-50 dark:hover:bg-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Increase guests"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={handleApply}
              className="w-full bg-brand text-white rounded-[10px] py-2.5 text-[13px] font-[500] hover:opacity-90 transition-opacity"
            >
              Apply
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
