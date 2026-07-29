import type { Listing, ListingFilters, PaginatedResponse } from "@/types/listing";

const MOCK_LISTINGS: Listing[] = [
  {
    id: "l1",
    title: "Downtown Creative Loft",
    city: "New York",
    countryOrRegion: "USA",
    images: [
      "/images/featured-venues/venue-1.jpg",
      "/images/featured-venues/venue-2.png",
      "/images/featured-venues/venue-3.png",
    ],
    isVerified: true,
    isFavorited: false,
    capacity: 300,
    areaSqFt: 2000,
    hasFreeParking: true,
    amenitiesCount: 25,
    pricePerHour: 50,
    rating: 4.9,
    reviewCount: 128,
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: "l2",
    title: "Skyline Rooftop Terrace",
    city: "New York",
    countryOrRegion: "USA",
    images: [
      "/images/featured-venues/venue-2.png",
      "/images/featured-venues/venue-1.jpg",
    ],
    isVerified: true,
    isFavorited: true,
    capacity: 200,
    areaSqFt: 1500,
    hasFreeParking: false,
    amenitiesCount: 18,
    pricePerHour: 350,
    rating: 4.8,
    reviewCount: 96,
    lat: 40.758,
    lng: -73.9855,
  },
  {
    id: "l3",
    title: "The Garden Terrace Event Space",
    city: "London",
    countryOrRegion: "UK",
    images: [
      "/images/featured-venues/venue-3.png",
      "/images/featured-venues/venue-4.png",
    ],
    isVerified: true,
    isFavorited: false,
    capacity: 150,
    areaSqFt: 1200,
    hasFreeParking: true,
    amenitiesCount: 15,
    pricePerHour: 400,
    rating: 4.7,
    reviewCount: 84,
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    id: "l4",
    title: "Modern Art Studio Space",
    city: "London",
    countryOrRegion: "UK",
    images: [
      "/images/featured-venues/venue-4.png",
      "/images/featured-venues/venue-1.jpg",
      "/images/featured-venues/venue-2.png",
    ],
    isVerified: true,
    isFavorited: false,
    capacity: 500,
    areaSqFt: 3500,
    hasFreeParking: false,
    amenitiesCount: 30,
    pricePerHour: 600,
    rating: 4.9,
    reviewCount: 156,
    lat: 51.5,
    lng: -0.12,
  },
  {
    id: "l5",
    title: "Industrial Warehouse Studio",
    city: "New York",
    countryOrRegion: "USA",
    images: [
      "/images/featured-venues/venue-1.jpg",
      "/images/featured-venues/venue-3.png",
    ],
    isVerified: false,
    isFavorited: false,
    capacity: 800,
    areaSqFt: 5000,
    hasFreeParking: true,
    amenitiesCount: 12,
    pricePerHour: 200,
    rating: 4.5,
    reviewCount: 42,
    lat: 40.73,
    lng: -73.99,
  },
  {
    id: "l6",
    title: "Luxury Ballroom Suite",
    city: "Dubai",
    countryOrRegion: "UAE",
    images: [
      "/images/featured-venues/venue-2.png",
      "/images/featured-venues/venue-4.png",
      "/images/featured-venues/venue-1.jpg",
    ],
    isVerified: true,
    isFavorited: true,
    capacity: 1000,
    areaSqFt: 8000,
    hasFreeParking: true,
    amenitiesCount: 40,
    pricePerHour: 1500,
    rating: 5.0,
    reviewCount: 203,
    lat: 25.2048,
    lng: 55.2708,
  },
  {
    id: "l7",
    title: "Cozy Gallery Exhibition Room",
    city: "London",
    countryOrRegion: "UK",
    images: [
      "/images/featured-venues/venue-3.png",
    ],
    isVerified: false,
    isFavorited: false,
    capacity: 80,
    areaSqFt: 600,
    hasFreeParking: false,
    amenitiesCount: 8,
    pricePerHour: 120,
    rating: 4.3,
    reviewCount: 31,
    lat: 51.52,
    lng: -0.13,
  },
  {
    id: "l8",
    title: "Rooftop Poolside Venue",
    city: "Dubai",
    countryOrRegion: "UAE",
    images: [
      "/images/featured-venues/venue-4.png",
      "/images/featured-venues/venue-2.png",
    ],
    isVerified: true,
    isFavorited: false,
    capacity: 400,
    areaSqFt: 2800,
    hasFreeParking: true,
    amenitiesCount: 22,
    pricePerHour: 800,
    rating: 4.8,
    reviewCount: 67,
    lat: 25.21,
    lng: 55.27,
  },
  {
    id: "l9",
    title: "Private Dining & Event Hall",
    city: "New York",
    countryOrRegion: "USA",
    images: [
      "/images/featured-venues/venue-1.jpg",
    ],
    isVerified: true,
    isFavorited: false,
    capacity: 120,
    areaSqFt: 900,
    hasFreeParking: false,
    amenitiesCount: 10,
    pricePerHour: 180,
    rating: 4.6,
    reviewCount: 55,
    lat: 40.75,
    lng: -73.99,
  },
  {
    id: "l10",
    title: "Photography Studio Loft",
    city: "London",
    countryOrRegion: "UK",
    images: [
      "/images/featured-venues/venue-2.png",
      "/images/featured-venues/venue-4.png",
    ],
    isVerified: false,
    isFavorited: false,
    capacity: 50,
    areaSqFt: 800,
    hasFreeParking: true,
    amenitiesCount: 6,
    pricePerHour: 90,
    rating: 4.4,
    reviewCount: 28,
    lat: 51.53,
    lng: -0.11,
  },
  {
    id: "l11",
    title: "Grand Convention Center",
    city: "Dubai",
    countryOrRegion: "UAE",
    images: [
      "/images/featured-venues/venue-3.png",
      "/images/featured-venues/venue-1.jpg",
      "/images/featured-venues/venue-2.png",
    ],
    isVerified: true,
    isFavorited: true,
    capacity: 2000,
    areaSqFt: 15000,
    hasFreeParking: true,
    amenitiesCount: 50,
    pricePerHour: 3000,
    rating: 4.9,
    reviewCount: 189,
    lat: 25.23,
    lng: 55.29,
  },
  {
    id: "l12",
    title: "Boutique Wine Cellar Venue",
    city: "New York",
    countryOrRegion: "USA",
    images: [
      "/images/featured-venues/venue-4.png",
      "/images/featured-venues/venue-3.png",
    ],
    isVerified: false,
    isFavorited: false,
    capacity: 60,
    areaSqFt: 500,
    hasFreeParking: false,
    amenitiesCount: 5,
    pricePerHour: 75,
    rating: 4.2,
    reviewCount: 19,
    lat: 40.74,
    lng: -74.01,
  },
  {
    id: "l13",
    title: "Sunset Beachfront Venue",
    city: "Dubai",
    countryOrRegion: "UAE",
    images: [
      "/images/featured-venues/venue-1.jpg",
    ],
    isVerified: true,
    isFavorited: false,
    capacity: 350,
    areaSqFt: 2200,
    hasFreeParking: true,
    amenitiesCount: 16,
    pricePerHour: 950,
    rating: 4.7,
    reviewCount: 73,
    lat: 25.19,
    lng: 55.26,
  },
  {
    id: "l14",
    title: "Tech Startup Office Space",
    city: "London",
    countryOrRegion: "UK",
    images: [
      "/images/featured-venues/venue-2.png",
      "/images/featured-venues/venue-4.png",
    ],
    isVerified: false,
    isFavorited: false,
    capacity: 100,
    areaSqFt: 1100,
    hasFreeParking: false,
    amenitiesCount: 9,
    pricePerHour: 150,
    rating: 4.5,
    reviewCount: 38,
    lat: 51.51,
    lng: -0.1,
  },
  {
    id: "l15",
    title: "Riverside Banquet Hall",
    city: "New York",
    countryOrRegion: "USA",
    images: [
      "/images/featured-venues/venue-3.png",
      "/images/featured-venues/venue-1.jpg",
    ],
    isVerified: true,
    isFavorited: true,
    capacity: 600,
    areaSqFt: 4000,
    hasFreeParking: true,
    amenitiesCount: 28,
    pricePerHour: 450,
    rating: 4.8,
    reviewCount: 112,
    lat: 40.77,
    lng: -73.97,
  },
];

function filterListings(listings: Listing[], filters: ListingFilters): Listing[] {
  let result = [...listings];

  if (filters.keyword) {
    const kw = filters.keyword.toLowerCase();
    result = result.filter(
      (l) =>
        l.title.toLowerCase().includes(kw) ||
        l.city.toLowerCase().includes(kw)
    );
  }

  if (filters.venueTypes.length > 0) {
    result = result.filter((l) =>
      filters.venueTypes.some((type) =>
        l.title.toLowerCase().includes(type.toLowerCase())
      )
    );
  }

  if (filters.verifiedOnly) {
    result = result.filter((l) => l.isVerified);
  }

  if (filters.capacityRange) {
    const [min, max] = filters.capacityRange;
    result = result.filter((l) => l.capacity >= min && l.capacity <= max);
  }

  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    result = result.filter((l) => l.pricePerHour >= min && l.pricePerHour <= max);
  }

  if (filters.sortBy === "price_low") {
    result.sort((a, b) => a.pricePerHour - b.pricePerHour);
  } else if (filters.sortBy === "price_high") {
    result.sort((a, b) => b.pricePerHour - a.pricePerHour);
  } else if (filters.sortBy === "rating") {
    result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  return result;
}

export async function getListings(
  filters: ListingFilters
): Promise<PaginatedResponse<Listing>> {
  // TODO: replace with real API endpoint
  await new Promise((resolve) => setTimeout(resolve, 400));

  const filtered = filterListings(MOCK_LISTINGS, filters);
  const pageSize = 12;
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const page = Math.min(filters.page, totalPages);
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return {
    items,
    total: filtered.length,
    page,
    pageSize,
    totalPages,
  };
}
