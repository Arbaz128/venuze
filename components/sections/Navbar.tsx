"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { UserMenu } from "@/components/layout/UserMenu";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/70 dark:bg-dark-bg/70 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-300/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="flex items-center justify-between h-[88px] px-4 md:px-[34px] lg:px-10 xl:px-[60px]">
        <Link href="/" className="flex items-center">
          <Image
            src={isScrolled ? "/images/logo 2.svg" : "/images/logo.svg"}
            alt="Venuze"
            width={130}
            height={23}
            className="h-5 md:h-6 w-auto"
            priority
          />
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

          <UserMenu iconOnly />

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
