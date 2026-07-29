import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function GrowBusinessCTA() {
  return (
    <section className="py-16 px-5 lg:px-18 md:py-20 mb-20 lg:py-0 lg:-mt-30">
      <div className="container-main">
        <div className="relative rounded-[20px] gradient-primary overflow-hidden -mb-18">
          <div className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] gap-6 lg:gap-8 items-center justify-between px-6 md:px-12 lg:px-15 py-10 md:py-12 lg:py-5">
            <div className="text-center lg:text-left order-1">
              <h2 className="text-xl sm:text-2xl md:text-[30px] lg:text-4xl font-semibold text-white leading-tight mb-4">
                Grow Your Business <br />
                with Venuze
              </h2>
              <p className="text-white text-sm md:text-base lg:text-lg mb-6 max-w-xl mx-auto lg:mx-0">
                Showcase your services to thousands of event organizers and creators searching for talent like yours.
              </p>
              <Button variant="dark" size="lg" className="text-white font-light">
                Join as a Vendor
              </Button>
            </div>
            <div className="relative h-40 w-40 sm:h-48 sm:w-48 lg:h-60 lg:w-60 order-2 flex-shrink-0">
              <Image
                src="/images/cta/grow-business-illustration.svg"
                alt="Grow your business"
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