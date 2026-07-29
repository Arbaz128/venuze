"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, Share2, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { VenueCardSkeleton } from "@/components/ui/Skeleton";
import { VENUE_FILTERS, FEATURED_VENUES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FeaturedVenuesSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-dark-bg">
      <div className="container-main">
        <h2 className="text-2xl md:text-[30px] lg:text-[44px] font-semibold text-center leading-tight mb-6 text-white">
          Featured Venues
        </h2>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
          {VENUE_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeFilter === filter.id
                  ? "bg-primary text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-dark-card rounded-[20px] overflow-hidden">
                  <VenueCardSkeleton />
                </div>
              ))
            : FEATURED_VENUES.map((venue) => (
                <div
                  key={venue.id}
                  className="group bg-dark-card rounded-[20px] overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 md:h-52 overflow-hidden">
                    <Image
                      src={venue.image}
                      alt={venue.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {venue.verified && (
                        <Pill variant="verified" size="sm">
                          Verified
                        </Pill>
                      )}
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-medium">
                        <Star className="h-3 w-3 fill-accent-yellow text-accent-yellow" />
                        <span>{venue.rating}</span>
                        <span className="text-muted">({venue.reviewCount})</span>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <button className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors" aria-label="Save">
                        <Heart className="h-4 w-4 text-muted-dark" />
                      </button>
                      <button className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors" aria-label="Share">
                        <Share2 className="h-4 w-4 text-muted-dark" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 md:p-5">
                    <h3 className="text-white font-semibold text-base md:text-lg mb-3">
                      {venue.title}
                    </h3>
                    <div className="flex items-center gap-1 text-dark-text/60 text-xs md:text-sm mb-3">
                      <MapPin className="h-3 w-3" />
                      <span>{venue.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {venue.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-3 py-1 bg-white/10 text-dark-text text-xs rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold text-lg">{venue.price}</span>
                      <Button variant="white" size="sm" className="text-xs px-4">
                        View details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
