"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

interface DateFieldProps {
  value: string;
  onChange: (value: string) => void;
  variant?: "hero" | "compact";
}

export function DateField({ value, onChange, variant = "hero" }: DateFieldProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selected, setSelected] = useState<Date | null>(null);

  useEffect(() => {
    if (open && triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 6, left: r.left, width: Math.max(r.width, 320) });
    }
  }, [open]);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const handleSelect = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    setSelected(d);
    const formatted = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    onChange(formatted);
    setOpen(false);
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else { setViewMonth((m) => m - 1); }
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else { setViewMonth((m) => m + 1); }
  };

  const displayValue = value || (variant === "hero" ? "Select date" : "Anytime");

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center gap-3 text-left w-full",
          variant === "hero" ? "px-4 py-3" : "px-4 py-2.5"
        )}
      >
        <Calendar className={cn("flex-shrink-0", variant === "hero" ? "h-5 w-5 text-[#767676]" : "h-4 w-4 text-[#767676]")} />
        <div className="flex-1 min-w-0">
          <span className={cn("block font-[600]", variant === "hero" ? "text-[11px]" : "text-[10px]", "text-[#767676]")}>When</span>
          <span className={cn("block truncate", value ? "text-black font-[500]" : "text-[#A0A0A0]", variant === "hero" ? "text-[14px]" : "text-[12px]")}>
            {displayValue}
          </span>
        </div>
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-[100]" onClick={() => setOpen(false)}>
          <div
            className="absolute bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.18)] border border-neutral-200 p-5"
            style={{ top: pos.top, left: pos.left, width: pos.width }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => { onChange(""); setSelected(null); setOpen(false); }}
              className="text-[13px] font-[500] text-brand mb-3 hover:underline"
            >
              Anytime
            </button>

            <div className="flex items-center justify-between mb-4">
              <button type="button" onClick={prevMonth} className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-neutral-100">
                <ChevronLeft size={16} />
              </button>
              <span className="text-[14px] font-[600]">{MONTHS[viewMonth]} {viewYear}</span>
              <button type="button" onClick={nextMonth} className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-neutral-100">
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-1">
              {DAYS.map((d) => (
                <span key={d} className="text-[11px] font-[500] text-[#A0A0A0] py-1">{d}</span>
              ))}
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isSelected = selected && selected.getDate() === day && selected.getMonth() === viewMonth && selected.getFullYear() === viewYear;
                const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleSelect(day)}
                    className={cn(
                      "h-9 w-9 flex items-center justify-center rounded-full text-[13px] transition-colors",
                      isSelected ? "bg-brand text-white font-[600]" : "hover:bg-neutral-100 text-black",
                      isToday && !isSelected ? "border border-brand text-brand font-[500]" : ""
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
