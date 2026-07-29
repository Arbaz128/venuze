"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  MapPin,
  Users,
  Maximize2,
  ParkingCircle,
  ArrowRight,
} from "lucide-react";
import type { Listing } from "@/types/listing";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const [favorited, setFavorited] = useState(listing.isFavorited);
  const [imgIndex, setImgIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const hasMultipleImages = listing.images.length > 1;

  return (
    <div className="w-full max-w-[300px] mx-auto xl:mx-0 group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[6/5] bg-neutral-200 dark:bg-neutral-300 rounded-t-[20px] overflow-hidden">
        {!imgError ? (
          <Image
            src={listing.images[imgIndex] || listing.images[0]}
            alt={listing.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 300px"
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-text-muted text-[13px]">No image</div>
        )}

        {listing.isVerified && (
          <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[11px] font-[600] rounded-full px-3 py-1.5 leading-none">
            Verified
          </div>
        )}

        <button
          onClick={() => setFavorited(!favorited)}
          className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full w-[30px] h-[30px] flex items-center justify-center transition-colors hover:bg-black/70"
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={15}
            strokeWidth={1.5}
            className={favorited ? "fill-brand text-brand" : "text-white"}
          />
        </button>

        {hasMultipleImages && !imgError && (
          <>
            <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1">
              {listing.images.slice(0, 3).map((_, i) => (
                <span
                  key={i}
                  className={`h-[5px] w-[5px] rounded-full transition-opacity ${
                    i === imgIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setImgIndex((prev) =>
                  prev === 0 ? listing.images.length - 1 : prev - 1
                );
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-[30px] w-[30px] rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <span className="text-white text-[14px] font-bold leading-none">&lsaquo;</span>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setImgIndex((prev) =>
                  prev === listing.images.length - 1 ? 0 : prev + 1
                );
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-[30px] w-[30px] rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <span className="text-white text-[14px] font-bold leading-none">&rsaquo;</span>
            </button>
          </>
        )}
      </div>

      <div className="bg-white dark:bg-dark-card border border-neutral-border dark:border-neutral-300 rounded-b-[20px] shadow-[0_2px_3px_rgba(0,0,0,0.05)] dark:shadow-none p-5">
        <h3 className="font-[600] text-[16px] leading-[24px] text-black dark:text-dark-text line-clamp-2 mb-2" style={{ letterSpacing: "-0.03em" }}>
          {listing.title}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          <MapPin size={16} className="text-brand flex-shrink-0" />
          <span className="font-[500] text-[14px] leading-[21px] text-brand truncate">
            {listing.city}, {listing.countryOrRegion}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span className="inline-flex items-center gap-1 bg-neutral-50 dark:bg-neutral-300 rounded-full px-3 py-1 text-[10px] font-[500] text-neutral-text-dark dark:text-dark-text">
            <Users size={12} />
            {listing.capacity}+
          </span>
          <span className="inline-flex items-center gap-1 bg-neutral-50 dark:bg-neutral-300 rounded-full px-3 py-1 text-[10px] font-[500] text-neutral-text-dark dark:text-dark-text">
            <Maximize2 size={12} />
            {listing.areaSqFt.toLocaleString()} sq ft
          </span>
          {listing.hasFreeParking && (
            <span className="inline-flex items-center gap-1 bg-neutral-50 dark:bg-neutral-300 rounded-full px-3 py-1 text-[10px] font-[500] text-neutral-text-dark dark:text-dark-text">
              <ParkingCircle size={12} />
              Free parking
            </span>
          )}
        </div>

        <span className="inline-flex items-center bg-neutral-50 dark:bg-neutral-300 rounded-full px-3 py-1 text-[10px] font-[500] text-neutral-text-dark dark:text-dark-text mb-3">
          +{listing.amenitiesCount} more
        </span>

        <div className="w-full h-px bg-neutral-400 dark:bg-neutral-300 mb-3" />

        <div className="flex items-center justify-between">
          <span className="text-[12px] text-black dark:text-dark-text leading-none">
            <span className="font-[400]">From </span>
            <span className="font-[700]">${listing.pricePerHour}/hour</span>
          </span>
          <Link
            href={`/search/${listing.id}`}
            className="inline-flex items-center gap-1 bg-brand text-white rounded-[10px] px-4 py-2 text-[11px] font-[500] leading-none hover:opacity-90 transition-opacity"
          >
            View details
            <ArrowRight size={12} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ListingCardSkeleton() {
  return (
    <div className="w-full max-w-[300px] mx-auto xl:mx-0" aria-hidden="true">
      <div className="aspect-[6/5] bg-neutral-200 dark:bg-neutral-300 rounded-t-[20px] animate-pulse" />
      <div className="bg-white dark:bg-dark-card border border-neutral-border dark:border-neutral-300 rounded-b-[20px] p-5 space-y-3">
        <div className="h-4 bg-neutral-200 dark:bg-neutral-300 rounded animate-pulse w-3/4" />
        <div className="h-3 bg-neutral-200 dark:bg-neutral-300 rounded animate-pulse w-1/2" />
        <div className="flex gap-2">
          <div className="h-6 bg-neutral-200 dark:bg-neutral-300 rounded-full animate-pulse w-16" />
          <div className="h-6 bg-neutral-200 dark:bg-neutral-300 rounded-full animate-pulse w-20" />
          <div className="h-6 bg-neutral-200 dark:bg-neutral-300 rounded-full animate-pulse w-14" />
        </div>
        <div className="h-4 bg-neutral-200 dark:bg-neutral-300 rounded animate-pulse w-1/3" />
        <div className="h-px bg-neutral-200 dark:bg-neutral-300" />
        <div className="flex justify-between">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-300 rounded animate-pulse w-20" />
          <div className="h-8 bg-neutral-200 dark:bg-neutral-300 rounded-[10px] animate-pulse w-24" />
        </div>
      </div>
    </div>
  );
}
