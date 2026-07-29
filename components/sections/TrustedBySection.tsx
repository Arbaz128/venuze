"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import type { StatCardData, TestimonialCardData } from "@/types/common";

const statCards: StatCardData[] = [
  {
    id: "venues",
    value: "1,500+",
    label: "Venues Vetted & Approved",
    bgColor: "bg-[#FF786A]",
    textColor: "white",
  },
  {
    id: "events",
    value: "7,500+",
    label: "Events Successfully Hosted",
    bgColor: "bg-[#FF5037]",
    textColor: "white",
  },
  {
    id: "cities",
    value: "35+",
    label: "Cities Across the Region",
    bgColor: "bg-[#FE8B16]",
    textColor: "white",
  },
  {
    id: "rating",
    value: "4.9\u2605",
    label: "Average Host Rating",
    bgColor: "bg-[#FFC332]",
    textColor: "black",
  },
];

const testimonials: TestimonialCardData[] = [
  {
    id: "1",
    quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    name: "Michael Carter",
    photoSrc: "/images/testimonials/michael-carter.jpg",
    rating: 5,
  },
  {
    id: "2",
    quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    name: "by Ayesha M.",
    photoSrc: "/images/testimonials/ayesha-m.jpg",
    rating: 5,
  },
];

export function TrustedBySection() {
  return (
    <section
      className="w-full py-[100px] md:py-[120px] lg:py-[140px]"
      style={{
        background:
          "linear-gradient(270deg, #FFDBD8 0%, #FFF0CD 100%)",
      }}
    >
      <div className="mx-auto px-4" style={{ maxWidth: "1200px" }}>
        <div className="flex flex-col items-center gap-[10px] mb-16 md:mb-20">
          <h2
            className="font-[600] text-[44px] leading-[50px] text-black text-center"
            style={{ maxWidth: "1200px" }}
          >
            Trusted by Event Creators Who Demand Excellence
          </h2>
          <p
            className="font-[400] text-[20px] leading-[30px] text-black text-center"
            style={{ maxWidth: "961px" }}
          >
            Join thousands of planners and hosts who love our seamless
            discovery and booking experience.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-16 md:mb-20">
          {statCards.map((stat) => (
            <div key={stat.id} className="w-[301px] max-sm:w-full">
              <StatCard
                value={stat.value}
                label={stat.label}
                bgColor={stat.bgColor}
                textColor={stat.textColor}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="flex-1 min-w-0">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>

        <div className="flex justify-end items-center gap-3 mt-8">
          <button
            className="h-[42px] w-[42px] rounded-full bg-[#F4F4F4] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] flex items-center justify-center disabled:opacity-50"
            disabled
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={30} strokeWidth={2} className="text-black" />
          </button>
          <button
            className="h-[42px] w-[42px] rounded-full bg-[#F4F4F4] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] flex items-center justify-center disabled:opacity-50"
            disabled
            aria-label="Next testimonial"
          >
            <ChevronRight size={30} strokeWidth={2} className="text-black" />
          </button>
        </div>
      </div>
    </section>
  );
}
