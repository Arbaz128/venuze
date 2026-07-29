import Image from "next/image";
import { SearchBar } from "@/components/sections/SearchBar";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  return (
    <section className={cn("relative w-full min-h-screen flex items-center justify-center overflow-hidden", className)}>
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="Event venue background"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-hero-overlay/40 to-hero-overlay/70" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 pt-24 md:pt-28 pb-8 w-full">
        <h1 className="text-white font-semibold text-center leading-[1.1] tracking-tight max-w-[343px] md:max-w-[683px] lg:max-w-[746px] mt-20 md:mt-16 text-[30px] md:text-[50px] lg:text-[70px] lg:leading-[80px]">
          Discover & Book the Best Event Spaces
        </h1>

        <div className="mt-8 md:mt-10 w-full flex justify-center">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2 mt-8 md:mt-10">
          <span className="h-2 w-7 rounded-full bg-accent-yellow" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
        </div>
      </div>
    </section>
  );
}
