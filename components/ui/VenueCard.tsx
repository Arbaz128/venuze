import Image from "next/image";
import { Heart, Share2, ChevronLeft, ChevronRight, MapPin, Users, Maximize2, ParkingCircle, ArrowRight, type LucideIcon } from "lucide-react";
import type { FeaturedVenue } from "@/types/common";

const iconMap: Record<string, LucideIcon> = {
  Users,
  Maximize2,
  ParkingCircle,
};

interface VenueCardProps {
  venue: FeaturedVenue;
}

export function VenueCard({ venue }: VenueCardProps) {
  return (
    <div className="w-[300px] h-[419px] rounded-[10px] overflow-hidden flex-shrink-0 bg-white">
      <div className="relative w-full h-[250px] bg-[#E4E4E4] overflow-hidden group">
        {venue.imageSrc ? (
          <Image
            src={venue.imageSrc}
            alt={venue.title}
            fill
            sizes="300px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[#E4E4E4]" />
        )}

        <div className="absolute top-[9px] left-[10px]">
          <span
            className="inline-block bg-black/50 backdrop-blur-[2px] rounded-[92px] px-[15px] py-[8px] text-white font-[600] text-[11px] leading-none"
          >
            Verified
          </span>
        </div>

        <div className="absolute top-[9px] right-[10px] flex flex-col gap-[6px]">
          <button
            className="h-[30px] w-[30px] rounded-full bg-black/50 backdrop-blur-[2px] flex items-center justify-center"
            aria-label="Share venue"
          >
            <Share2 size={15} strokeWidth={1.5} className="text-white" />
          </button>
          <button
            className="h-[30px] w-[30px] rounded-full bg-black/50 backdrop-blur-[2px] flex items-center justify-center"
            aria-label="Save venue"
          >
            <Heart size={15} strokeWidth={1.5} className="text-white" />
          </button>
        </div>

        <button
          className="absolute left-[10px] top-[93px] h-[30px] w-[30px] rounded-full bg-black/50 backdrop-blur-[2px] flex items-center justify-center"
          aria-label="Previous photo"
        >
          <ChevronLeft size={15} strokeWidth={1.5} className="text-white" />
        </button>
        <button
          className="absolute right-[10px] top-[93px] h-[30px] w-[30px] rounded-full bg-black/50 backdrop-blur-[2px] flex items-center justify-center"
          aria-label="Next photo"
        >
          <ChevronRight size={15} strokeWidth={1.5} className="text-white" />
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          <span className="h-[5px] w-[5px] rounded-full bg-white opacity-50" />
          <span className="h-[5px] w-[5px] rounded-full bg-white opacity-50" />
          <span className="h-[5px] w-[5px] rounded-full bg-white" />
        </div>
      </div>

      <div className="w-full bg-white border border-[#E5E5E5] shadow-[0px_3px_3px_rgba(0,0,0,0.05)] px-4 pb-4 pt-3 flex-1 flex flex-col" style={{ borderRadius: "0 0 10px 10px" }}>
        <h3 className="font-[600] text-[16px] leading-[24px] text-black line-clamp-2 mb-2">
          {venue.title}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          <MapPin size={18} className="text-[#FF5037]" />
          <span className="font-[500] text-[14px] text-[#FF5037]">
            {venue.location}
          </span>
        </div>

        <div className="flex items-center gap-[5px] mb-2 flex-wrap">
          {venue.stats.map((stat) => {
            const StatIcon = iconMap[stat.icon];
            return (
              <span
                key={stat.label}
                className="inline-flex items-center gap-1 bg-[#F9FAFB] rounded-[999px] px-[7px] py-[5px]"
              >
                {StatIcon && <StatIcon size={14} strokeWidth={1.5} className="text-[#364153]" />}
                <span className="font-[500] text-[10px] text-[#364153] leading-none">
                  {stat.label}
                </span>
              </span>
            );
          })}
        </div>

        <div className="mb-3">
          <span className="inline-flex items-center gap-1 bg-[#F9FAFB] rounded-[999px] px-[7px] py-[5px]">
            <span className="font-[500] text-[10px] text-[#364153] leading-none">
              +{venue.extraCount} more
            </span>
          </span>
        </div>

        <div className="w-full h-px bg-[#C5C5C5] mb-3" />

        <div className="flex items-center justify-between mt-auto">
          <span className="text-[12px] text-black leading-none">
            <span className="font-[400]">From </span>
            <span className="font-[700]">${venue.pricePerHour}/hour</span>
          </span>
          <button className="inline-flex items-center gap-1 bg-white border border-[#FF5037] rounded-[10px] px-4 py-2 font-[500] text-[11px] text-[#FF5037] leading-none">
            View details
            <ArrowRight size={12} strokeWidth={2} className="text-[#FF5037]" />
          </button>
        </div>
      </div>
    </div>
  );
}
