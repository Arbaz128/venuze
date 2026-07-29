import Image from "next/image";
import { Star } from "lucide-react";
import { STATS, TESTIMONIALS } from "@/lib/constants";

export function TrustedBySection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 gradient-warm">
      <div className="container-main">
        <h2 className="text-2xl md:text-[30px] lg:text-[44px] font-semibold text-center leading-tight mb-10 md:mb-12 lg:mb-14">
          Trusted by Event Creators <br className="hidden sm:block" />
          Who Demand Excellence
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-12 md:mb-16">
          {STATS.map((stat) => (
            <div
              key={stat.id}
              className={`${stat.color} rounded-[20px] p-6 md:p-8 text-white text-center`}
            >
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm md:text-base opacity-90 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-[20px] p-6 md:p-8 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="relative h-12 w-12 md:h-14 md:w-14 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base text-muted-dark leading-relaxed mb-4 italic">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm md:text-base text-muted-dark">
                        {testimonial.name}
                      </div>
                      <div className="text-xs md:text-sm text-muted">{testimonial.role}</div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-accent-yellow text-accent-yellow"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
