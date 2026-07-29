import Image from "next/image";
import { Pill } from "@/components/ui/Pill";
import { DESTINATIONS } from "@/lib/constants";

export function DestinationsSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="container-main px-5 lg:px-18">
        <h2 className="text-2xl md:text-[30px] lg:text-4xl font-semibold text-center leading-tight mb-4 md:mb-12 lg:mb-3">
          Discover Exceptional Destinations Across the Region
        </h2>
        <p className="font-[400] text-xs md:text-[20px] text-black text-center mb-10 lg:mb-14">
         From cosmopolitan cityscapes to cultural treasures, explore where celebrations come alive with local flavor.        </p>

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
              <div className="absolute top-4 left-4 md:top-5 md:left-5 lg:top-6 lg:left-6">
                <Pill className="bg-black/50" size="sm">
                  {destination.venueCount} Venues
                </Pill>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-white font-semibold text-2xl md:text-3xl lg:text-2xl mb-1">
                  {destination.city}
                </h3>
                <p className="text-white/80 text-sm md:sm mb-1">
                  {destination.tagline}
                </p>
                <div className="flex items-center justify-between">
                <p className="text-white/80 text-sm md:sm mb-3">
                  {destination.popular}
                </p>
                <p className="text-white font-semibold text-sm md:sm mb-3">
                  From ${destination.startingPrice} per hour
                </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
