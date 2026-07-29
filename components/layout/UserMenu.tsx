"use client";

import { useState, useRef, useEffect } from "react";
import { LogOut, ChevronDown, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useLogout } from "@/hooks/useLogout";

export function UserMenu() {
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = user?.name?.slice(0, 2).toUpperCase() ?? "V";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-300 bg-white dark:bg-dark-card px-3 py-1.5 hover:shadow-sm transition-shadow"
        aria-label="User menu"
        aria-expanded={open}
      >
        <div className="h-7 w-7 rounded-full bg-brand flex items-center justify-center">
          <span className="text-white font-[600] text-[11px]">{initials}</span>
        </div>
        <span className="text-[13px] font-[500] text-black dark:text-dark-text hidden sm:block max-w-[120px] truncate">
          {user?.name ?? "User"}
        </span>
        <ChevronDown size={14} className="text-neutral-text-muted" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-dark-card border border-neutral-200 dark:border-neutral-300 rounded-xl shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-300">
            <p className="text-[13px] font-[500] text-black dark:text-dark-text truncate">{user?.name}</p>
            <p className="text-[11px] font-[400] text-neutral-text-muted truncate">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-[13px] font-[500] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={15} />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
