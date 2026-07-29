import Image from "next/image";
import { Star } from "lucide-react";
import type { TestimonialCardData } from "@/types/common";

interface TestimonialCardProps {
  testimonial: TestimonialCardData;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="flex bg-white rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.1)] h-[300px] overflow-hidden">
      <div className="relative w-[237px] h-full flex-shrink-0 hidden md:block">
        <Image
          src={testimonial.photoSrc}
          alt={testimonial.name}
          fill
          sizes="237px"
          className="object-cover"
          style={{ borderRadius: "20px 0 0 20px" }}
        />
      </div>

      <div className="relative w-full h-[200px] md:hidden flex-shrink-0">
        <Image
          src={testimonial.photoSrc}
          alt={testimonial.name}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center px-8 py-6 gap-[25px] flex-1 min-w-0">
        <p className="font-[400] text-[20px] leading-[30px] tracking-[0.03em] text-black max-w-[290px]">
          {testimonial.quote}
        </p>

        <div className="flex flex-col gap-[5px]">
          <span className="font-[700] text-[18px] leading-[24px] tracking-[0.03em] text-black">
            {testimonial.name}
          </span>
          <div className="flex items-center gap-[5px]">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className="fill-[#FEC432] text-[#FEC432]"
                style={{ borderRadius: "1px" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
