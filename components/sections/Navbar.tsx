"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, ChevronDown, Globe, User, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useLogout } from "@/hooks/useLogout";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useLogout();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = user?.name?.slice(0, 2).toUpperCase() ?? "V";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between h-[88px] px-4 md:px-[34px] lg:px-10 xl:px-[60px]">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.svg" alt="Venuze" width={130} height={23} className="h-5 md:h-6 w-auto" priority />
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="white"
            size="pill"
            className="hidden md:inline-flex h-10 px-1 rounded-lg lg:px-5 shadow-md text-xs lg:text-sm"
          >
            <span className="hidden lg:inline">Add your listing</span>
            <span className="lg:hidden">Listing</span>
            <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4" />
          </Button>

          <div className="hidden md:flex items-center gap-2">
            <div className="h-10 px-3 lg:px-4 bg-white dark:bg-dark-card rounded-[10px] flex items-center gap-2 shadow-md cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-300 transition-colors">
              <span className="text-xs lg:text-sm font-medium text-primary">EN</span>
              <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4" />
            </div>
          </div>

          <div className="h-9 w-9 md:h-10 md:w-10 lg:h-[44px] lg:w-[44px] bg-white dark:bg-dark-card rounded-[10px] flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-300 transition-colors">
            <User className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          </div>

          <button
            className="md:hidden h-9 w-9 bg-white dark:bg-dark-card rounded-[5px] flex items-center justify-center shadow-md"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5 text-muted-dark" />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden bg-white dark:bg-dark-card mx-4 rounded-[10px] shadow-lg overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-4 space-y-3">
          <Link href="#" className="block py-2 text-sm font-medium text-muted-dark hover:text-primary">Venues</Link>
          <Link href="#" className="block py-2 text-sm font-medium text-muted-dark hover:text-primary">Vendors</Link>
          <Link href="#" className="block py-2 text-sm font-medium text-muted-dark hover:text-primary">About</Link>
          <Link href="#" className="block py-2 text-sm font-medium text-muted-dark hover:text-primary">Contact</Link>
          <Button variant="primary" size="sm" className="w-full">
            Add your listing
          </Button>
        </div>
      </div>
    </header>
  );
}
