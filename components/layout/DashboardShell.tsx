"use client";

import Image from "next/image";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { UserMenu } from "@/components/layout/UserMenu";

export function DashboardShell() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-neutral-border">
        <div className="flex items-center justify-between px-6 h-16">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.svg" alt="Venuze" width={110} height={20} className="h-5 w-auto" />
          </Link>
          <UserMenu />
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <LayoutDashboard className="h-6 w-6 text-brand" />
            <h1 className="text-2xl font-[600] text-black">Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-[20px] p-6 border border-neutral-border">
              <div className="text-3xl font-[700] text-brand mb-1">12</div>
              <div className="text-[14px] text-neutral-text-muted">Active Venues</div>
            </div>
            <div className="bg-white rounded-[20px] p-6 border border-neutral-border">
              <div className="text-3xl font-[700] text-accent-yellow mb-1">48</div>
              <div className="text-[14px] text-neutral-text-muted">Total Bookings</div>
            </div>
            <div className="bg-white rounded-[20px] p-6 border border-neutral-border">
              <div className="text-3xl font-[700] text-success mb-1">4.9</div>
              <div className="text-[14px] text-neutral-text-muted">Avg Rating</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
