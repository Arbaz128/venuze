import Image from "next/image";
import { Search, MessageCircle, CalendarCheck } from "lucide-react";
import { STEPS } from "@/lib/constants";

const iconMap = {
  search: Search,
  "message-circle": MessageCircle,
  "calendar-check": CalendarCheck,
};

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="container-main">
        <h2 className="text-2xl md:text-[30px] lg:text-[44px] font-semibold text-center leading-tight mb-10 md:mb-12 lg:mb-14">
          Your Path to the <br className="hidden sm:block" />
          Perfect Venue
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-8 md:space-y-10">
            {STEPS.map((step) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap];
              return (
                <div key={step.number} className="flex gap-5 md:gap-6">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm md:text-base flex-shrink-0">
                      {step.number}
                    </div>
                    {step.number < STEPS.length && (
                      <div className="w-px flex-1 bg-border mt-2" />
                    )}
                  </div>
                  <div className="pb-8 md:pb-10">
                    <div className="flex items-center gap-3 mb-2">
                      {Icon && <Icon className="h-5 w-5 text-primary" />}
                      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-muted-dark">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative aspect-square max-w-[500px] mx-auto w-full">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="relative aspect-square rounded-[20px] overflow-hidden">
                <Image
                  src="/images/how-it-works/collage-1.jpg"
                  alt="Venue search"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-[20px] overflow-hidden mt-8 md:mt-12">
                <Image
                  src="/images/how-it-works/collage-2.jpg"
                  alt="Venue comparison"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-[20px] overflow-hidden -mt-4 md:-mt-8">
                <Image
                  src="/images/how-it-works/collage-3.jpg"
                  alt="Venue booking"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-[20px] overflow-hidden mt-4 md:mt-8">
                <Image
                  src="/images/how-it-works/collage-4.jpg"
                  alt="Event services"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-14 md:h-16 md:w-16 rounded-full bg-primary flex items-center justify-center shadow-lg z-10">
              <CalendarCheck className="h-6 w-6 md:h-7 md:w-7 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
