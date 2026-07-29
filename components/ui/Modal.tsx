"use client";

import { useEffect, useCallback, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  mobileSheet?: boolean;
  className?: string;
}

export function Modal({ open, onClose, children, mobileSheet, className }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 md:items-center"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative w-full bg-white shadow-xl overflow-y-auto",
          mobileSheet
            ? "max-h-[92vh] rounded-t-2xl animate-in slide-in-from-bottom"
            : "max-w-[500px] rounded-2xl max-h-[90vh] m-4",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-border bg-white px-6 py-4">
      <h2 className="text-[18px] font-[600] text-black">{children}</h2>
      <button
        onClick={onClose}
        aria-label="Close modal"
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
}
