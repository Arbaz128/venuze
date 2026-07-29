import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "@/providers/Providers";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Venuze — Discover & Book the Best Event Spaces",
  description:
    "Find and book the perfect venue for your next event. Browse thousands of venues, compare options, and book with confidence.",
  openGraph: {
    title: "Venuze — Discover & Book the Best Event Spaces",
    description:
      "Find and book the perfect venue for your next event. Browse thousands of venues, compare options, and book with confidence.",
    type: "website",
    siteName: "Venuze",
  },
  twitter: {
    card: "summary_large_image",
    title: "Venuze — Discover & Book the Best Event Spaces",
    description:
      "Find and book the perfect venue for your next event. Browse thousands of venues, compare options, and book with confidence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased bg-surface text-text-primary transition-colors`} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
