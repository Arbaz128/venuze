import Image from "next/image";
import { Pill } from "@/components/ui/Pill";
import { DESTINATIONS } from "@/lib/constants";

export function DestinationsSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="container-main">
        <h2 className="text-2xl md:text-[30px] lg:text-[44px] font-semibold text-center leading-tight mb-10 md:mb-12 lg:mb-14">
          Discover Exceptional Destinations <br className="hidden sm:block" />
          Across the Region
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {DESTINATIONS.map((destination) => (
            <div
              key={destination.id}
              className="relative h-[350px] md:h-[400px] lg:h-[480px] rounded-[20px] overflow-hidden group cursor-pointer"
            >
              <Image
                src={destination.image}
                alt={destination.city}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-white font-semibold text-2xl md:text-3xl lg:text-4xl mb-1">
                  {destination.city}
                </h3>
                <p className="text-white/70 text-sm md:text-base mb-3">
                  {destination.tagline}
                </p>
                <Pill variant="yellow" size="sm">
                  {destination.venueCount} Venues
                </Pill>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
