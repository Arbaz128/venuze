import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function TurnVenueCTA() {
  return (
    <section className="py-16 px-5 lg:px-18 md:py-20 lg:py-0">
      <div className="container-main">
        <div className="relative rounded-[20px] gradient-primary overflow-hidden lg:-mb-18">
          <div className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] gap-6 lg:gap-8 items-center justify-between px-6 md:px-12 lg:px-15 py-10 md:py-12 lg:py-5">
            <div className="text-center lg:text-left order-1">
              <h2 className="text-xl sm:text-2xl md:text-[30px] lg:text-4xl font-semibold text-white leading-tight mb-4">
                Turn Your Venue into a <br />
                Destination
              </h2>
              <p className="text-white text-sm md:text-base lg:text-lg mb-6 max-w-xl mx-auto lg:mx-0">
                List your space on Venuze and unlock new revenue opportunities. Reach clients looking for venues just like yours.
              </p>
              <Button variant="dark" size="lg" className="text-white font-light">
                List Your Venue
              </Button>
            </div>
            <div className="relative h-40 w-40 sm:h-48 sm:w-48 lg:h-60 lg:w-60 order-2 flex-shrink-0">
              <Image
                src="/images/cta/venue-destination-illustration.svg"
                alt="Turn your venue into a destination"
                fill
                sizes="(max-width: 1024px) 192px, 256px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}