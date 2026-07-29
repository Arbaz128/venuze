"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Users, Maximize2, ParkingCircle } from "lucide-react";
import { VenueCard } from "@/components/ui/VenueCard";
import { cn } from "@/lib/utils";
import type { FeaturedVenue } from "@/types/common";

const filterLabels = [
  "Rooftop",
  "Gallery",
  "Restaurant",
  "Outdoor",
  "Studio",
  "Terrace",
  "Ballroom",
];

const sampleVenues: FeaturedVenue[] = [
  {
    id: "v1",
    imageSrc: "/images/featured-venues/venue-1.jpg",
    title: "High-Spec Room in Trendy Home Clapham/ Stockwell",
    location: "London, SW1",
    stats: [
      { icon: "Users", label: "300+" },
      { icon: "Maximize2", label: "2,000 sq ft" },
      { icon: "ParkingCircle", label: "Free parking" },
    ],
    extraCount: 25,
    pricePerHour: 50,
  },
  {
    id: "v2",
    imageSrc: "/images/featured-venues/venue-2.png",
    title: "High-Spec Room in Trendy Home Clapham/ Stockwell",
    location: "London, SW1",
    stats: [
      { icon: "Users", label: "300+" },
      { icon: "Maximize2", label: "2,000 sq ft" },
      { icon: "ParkingCircle", label: "Free parking" },
    ],
    extraCount: 25,
    pricePerHour: 50,
  },
  {
    id: "v3",
    imageSrc: "/images/featured-venues/venue-3.png",
    title: "High-Spec Room in Trendy Home Clapham/ Stockwell",
    location: "London, SW1",
    stats: [
      { icon: "Users", label: "300+" },
      { icon: "Maximize2", label: "2,000 sq ft" },
      { icon: "ParkingCircle", label: "Free parking" },
    ],
    extraCount: 25,
    pricePerHour: 50,
  },
  {
    id: "v4",
    imageSrc: "/images/featured-venues/venue-4.png",
    title: "High-Spec Room in Trendy Home Clapham/ Stockwell",
    location: "London, SW1",
    stats: [
      { icon: "Users", label: "300+" },
      { icon: "Maximize2", label: "2,000 sq ft" },
      { icon: "ParkingCircle", label: "Free parking" },
    ],
    extraCount: 25,
    pricePerHour: 50,
  },
];

export function FeaturedVenuesSection() {
  const [activeFilter, setActiveFilter] = useState("Gallery");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 324;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/sections/featured-venues-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-50"
          style={{ objectPosition: "55% 35%" }}
          preload={false}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 pt-[77px] pb-16 md:pb-20">
        <h2 className="font-[600] text-[44px] leading-[50px] text-white text-center max-w-[380px] mx-auto mb-10">
          Featured Venues
        </h2>

        <div className="flex justify-center gap-[10px] mb-12 overflow-x-auto scrollbar-hide flex-nowrap pb-2">
          {filterLabels.map((label) => (
            <button
              key={label}
              onClick={() => setActiveFilter(label)}
              className={cn(
                "px-[30px] py-[20px] rounded-[10px] text-center whitespace-nowrap uppercase leading-none transition-all",
                activeFilter === label
                  ? "bg-[#FF5037] font-[700] text-[16px] text-white"
                  : "bg-[rgba(183,183,183,0.5)] font-[400] text-[16px] text-white hover:bg-[rgba(183,183,183,0.7)]"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mb-10">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          >
            {sampleVenues.map((venue) => (
              <div key={venue.id} className="snap-start">
                <VenueCard venue={venue} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end items-center gap-3">
          <button
            onClick={() => scroll("left")}
            className="h-[42px] w-[42px] rounded-full border-2 border-white bg-transparent flex items-center justify-center drop-shadow-[0px_1px_4px_rgba(0,0,0,0.25)] transition-colors hover:bg-white/10"
            aria-label="Previous venues"
          >
            <ChevronLeft size={18} strokeWidth={2} className="text-white" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="h-[42px] w-[42px] rounded-full border-2 border-white bg-transparent flex items-center justify-center drop-shadow-[0px_1px_4px_rgba(0,0,0,0.25)] transition-colors hover:bg-white/10"
            aria-label="Next venues"
          >
            <ChevronRight size={18} strokeWidth={2} className="text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
