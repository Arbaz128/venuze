"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LogOut, ChevronDown, User, LayoutDashboard } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useLogout } from "@/hooks/useLogout";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  iconOnly?: boolean;
}

export function UserMenu({ iconOnly }: UserMenuProps) {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
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
      {iconOnly ? (
        <button
          onClick={() => setOpen(!open)}
          className="h-9 w-9 md:h-10 md:w-10 lg:h-[44px] lg:w-[44px] bg-white dark:bg-dark-card rounded-[10px] flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-300 transition-colors"
          aria-label="User menu"
          aria-expanded={open}
        >
          {isAuthenticated ? (
            <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-brand flex items-center justify-center">
              <span className="text-white font-[600] text-[9px] md:text-[10px]">{initials}</span>
            </div>
          ) : (
            <User className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          )}
        </button>
      ) : (
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
      )}

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-dark-card border border-neutral-200 dark:border-neutral-300 rounded-xl shadow-lg py-2 z-50">
          {isAuthenticated ? (
            <>
              <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-300">
                <p className="text-[13px] font-[500] text-black dark:text-dark-text truncate">{user?.name}</p>
                <p className="text-[11px] font-[400] text-neutral-text-muted truncate">{user?.email}</p>
              </div>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-[500] text-black dark:text-dark-text hover:bg-neutral-100 dark:hover:bg-neutral-300 transition-colors"
              >
                <LayoutDashboard size={15} />
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-[13px] font-[500] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut size={15} />
                Log out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-[500] text-black dark:text-dark-text hover:bg-neutral-100 dark:hover:bg-neutral-300 transition-colors"
            >
              <User size={15} />
              Log in
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
