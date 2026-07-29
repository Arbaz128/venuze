import Image from "next/image";
import { Pill } from "@/components/ui/Pill";
import { CATEGORIES } from "@/lib/constants";

export function CategoryCardsSection() {
  return (
    <section className="py-16 md:py-20 lg:pb-24 lg:pt-10">
      <div className="container-main px-5 lg:px-18">
        <h2 className="text-xl md:text-[30px] lg:text-4xl font-semibold text-center leading-tight mb-10 md:mb-12 lg:mb-4">
          Find The Best Venue For Any Occasion
        </h2>
        <p className="text-center text-lg mb-10 md:mb-12 lg:mb-14">
          Explore venues by category, from timeless ballrooms and rooftops with a view to modern studios and outdoor gardens, discover spaces designed to inspire unforgettable experiences.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="relative h-[200px] md:h-[250px] lg:h-[324px] rounded-[20px] overflow-hidden group cursor-pointer"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 md:top-5 md:left-5 lg:top-6 lg:left-6">
                <Pill size="sm" variant="default">
                  {category.venueCount} Venues
                </Pill>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 lg:p-6">
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
