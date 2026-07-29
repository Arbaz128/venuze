import Image from "next/image";
import { Pill } from "@/components/ui/Pill";
import { CATEGORIES } from "@/lib/constants";

export function CategoryCardsSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="container-main">
        <h2 className="text-2xl md:text-[30px] lg:text-[44px] font-semibold text-center leading-tight mb-10 md:mb-12 lg:mb-14">
          Find The Best Venue <br className="hidden sm:block" />
          For Any Occasion
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="relative h-[280px] md:h-[320px] lg:h-[380px] rounded-[20px] overflow-hidden group cursor-pointer"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 lg:p-6">
                <Pill variant="yellow" size="sm" className="mb-2">
                  {category.venueCount} Venues
                </Pill>
                <h3 className="text-white font-semibold text-lg md:text-xl lg:text-2xl leading-tight">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
