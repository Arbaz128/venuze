"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export function DashboardShell() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-border">
        <div className="flex items-center justify-between px-6 h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="font-semibold text-muted-dark">Venuze</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-semibold text-muted-dark">Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-[20px] p-6 border border-border">
              <div className="text-3xl font-bold text-primary mb-1">12</div>
              <div className="text-sm text-muted">Active Venues</div>
            </div>
            <div className="bg-white rounded-[20px] p-6 border border-border">
              <div className="text-3xl font-bold text-accent-yellow mb-1">48</div>
              <div className="text-sm text-muted">Total Bookings</div>
            </div>
            <div className="bg-white rounded-[20px] p-6 border border-border">
              <div className="text-3xl font-bold text-success mb-1">4.9</div>
              <div className="text-sm text-muted">Avg Rating</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
