import Image from "next/image";
import { VENDORS } from "@/lib/constants";

export function VendorGridSection() {
  return (
    <section className="py-16 pb-20 md:py-20 md:pb-24 lg:py-24 lg:pb-70 bg-[#FDF1D2]">
      <div className="container-main px-5 lg:px-18">
        <h2 className="text-2xl md:text-[30px] lg:text-[44px] font-semibold text-center leading-tight mb-10 md:mb-12 lg:mb-4">
          Complete Your Event with our Trusted Vendors
        </h2>
        <p className="text-center text-muted-foreground mb-10 md:mb-12 lg:mb-14">
          Venues are just the beginning. Discover caterers, decorators, photographers, entertainment, and more all in one place, ready to bring your event project to life.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {VENDORS.map((vendor) => (
            <div
              key={vendor.id}
              className="relative h-[300px] md:h-[380px] lg:h-[450px] rounded-[20px] overflow-hidden group cursor-pointer"
            >
              <Image
                src={vendor.image}
                alt={vendor.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3 className="text-white font-semibold text-xl md:text-2xl lg:text-3xl mb-1">
                  {vendor.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
