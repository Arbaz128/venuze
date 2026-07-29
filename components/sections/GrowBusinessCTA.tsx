import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function GrowBusinessCTA() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="container-main">
        <div className="relative rounded-[20px] gradient-primary overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 md:px-12 lg:px-16 py-12 md:py-16">
            <div className="text-center lg:text-left mb-8 lg:mb-0">
              <h2 className="text-2xl md:text-[30px] lg:text-[44px] font-semibold text-white leading-tight mb-4">
                Grow Your Business <br />
                with Venuze
              </h2>
              <p className="text-white/80 text-sm md:text-base lg:text-lg mb-6 max-w-md">
                Join thousands of vendors who are growing their business through our platform.
              </p>
              <Button variant="white" size="lg" className="text-primary font-semibold">
                Join as a Vendor
              </Button>
            </div>
            <div className="relative h-48 w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 flex-shrink-0">
              <Image
                src="/images/cta/grow-business-illustration.png"
                alt="Grow your business"
                fill
                sizes="256px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
