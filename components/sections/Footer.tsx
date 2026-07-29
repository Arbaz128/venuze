import Image from "next/image";
import Link from "next/link";
import { Mail, MessageSquare, Send, Globe, Camera, MessageCircle, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FOOTER_COLUMNS } from "@/lib/constants";

const socialIcons = {
  facebook: Globe,
  instagram: Camera,
  twitter: MessageCircle,
  linkedin: Briefcase,
};

export function Footer() {
  return (
    <footer className="bg-dark-bg text-white">
      <div className="container-main py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Image src="/images/logo.svg" alt="Venuze" width={130} height={23} className="h-5 md:h-6 w-auto" />
            </Link>
            <p className="text-dark-text/60 text-sm md:text-base leading-relaxed max-w-xs">
              Find and book the perfect venue for your next event. From intimate gatherings to grand celebrations.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="text-white font-semibold text-sm md:text-base mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-dark-text/60 text-sm hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm md:text-base mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white/5 rounded-[10px] px-4 py-3">
                <Mail className="h-4 w-4 text-dark-text/60" />
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-dark-text/40 outline-none"
                  aria-label="Email address"
                />
              </div>
              <div className="flex items-start gap-3 bg-white/5 rounded-[10px] px-4 py-3">
                <MessageSquare className="h-4 w-4 text-dark-text/60 mt-1" />
                <textarea
                  placeholder="Your message"
                  rows={3}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-dark-text/40 outline-none resize-none"
                  aria-label="Your message"
                />
              </div>
              <Button variant="primary" size="md" className="w-full">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-14 lg:mt-16 pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark-text/40 text-xs md:text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Venuze. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {Object.entries(socialIcons).map(([name, Icon]) => (
              <a
                key={name}
                href="#"
                className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label={name.charAt(0).toUpperCase() + name.slice(1)}
              >
                <Icon className="h-4 w-4 text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
