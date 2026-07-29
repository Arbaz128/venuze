import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/DashboardShell";

export const metadata: Metadata = {
  title: "Dashboard | Venuze",
  description: "Manage your venues, bookings, and account.",
};

export default function DashboardPage() {
  return <DashboardShell />;
}
