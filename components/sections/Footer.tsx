import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FOOTER_COLUMNS } from "@/lib/constants";
import Twitter from "@/public/icons/social-media/twitter.svg";
import Facebook from "@/public/icons/social-media/Facebook - Negative.svg";
import Instagram from "@/public/icons/social-media/Instagram - Negative.svg";

const socialIcons = {
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
};

export function Footer() {
  return (
    <footer className="bg-black text-white rounded-t-4xl">
      <div className="container-main py-12 px-5 lg:px-18 md:py-16 lg:py-6 lg:pt-26">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          <div className="lg:col-span-4">
          <div className="flex lg:col-span-2 gap-4">
            <Link href="/" className="flex items-center mb-4">
              <Image src="/logo/Venuze-Logo1 2.svg" alt="Venuze" width={130} height={23} className="h-10 md:h-10 w-auto" />
            </Link>
            <p className="text-white text-base font-semibold md:text-lg leading-relaxed max-w-md">
              Make it memorable—book the perfect venue and the pros who make it shine.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3 mt-8 md:mt-10 lg:mt-10">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="text-[#A6A6A6] font-light text-sm md:text-base mb-4">
                {column.title}
              </h4>
              <ul className="space-y-0.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white text-xs hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm md:text-base mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-[#1D1D1D] border border-[#4A4A4A] rounded-[10px] px-4 py-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white outline-none"
                  aria-label="Email address"
                />
              </div>
              <div className="flex items-start gap-3 bg-[#1D1D1D] border border-[#4A4A4A] rounded-[10px] px-4 py-3">
                <textarea
                  placeholder="Your message"
                  rows={3}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white outline-none resize-none"
                  aria-label="Your message"
                />
              </div>
              <Button variant="primary" size="md" className="w-31">
                Send
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-14 lg:mt-16 pt-6 md:pt-8 border-t border-[#9A9A9A] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {Object.entries(socialIcons).map(([name, Icon]) => (
              <a
                key={name}
                href="#"
                className="h-10 w-10 items-center justify-center hover:bg-primary transition-colors"
                aria-label={name.charAt(0).toUpperCase() + name.slice(1)}
              >
                <Image src={Icon} alt={name} className="h-5 w-5 text-white" />
              </a>
            ))}
          </div>
          <p className="text-[#9A9A9A] text-xs md:text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Venuze. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
