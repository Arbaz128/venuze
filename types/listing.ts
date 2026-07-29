export interface Listing {
  id: string;
  title: string;
  city: string;
  countryOrRegion: string;
  images: string[];
  isVerified: boolean;
  isFavorited: boolean;
  capacity: number;
  areaSqFt: number;
  hasFreeParking: boolean;
  amenitiesCount: number;
  pricePerHour: number;
  rating?: number;
  reviewCount?: number;
  lat: number;
  lng: number;
}

export interface ListingFilters {
  keyword: string;
  category: string;
  venueTypes: string[];
  capacityRange: [number, number];
  priceRange: [number, number];
  occasions: string[];
  verifiedOnly: boolean;
  sortBy: "recommended" | "price_low" | "price_high" | "rating";
  location: string;
  dateRange: string;
  guests: string;
  page: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
