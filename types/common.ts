export interface NavLink {
  label: string;
  href: string;
}

export interface Category {
  id: string;
  title: string;
  venueCount: number;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  color: string;
}

export interface StatCardData {
  id: string;
  value: string;
  label: string;
  bgColor: string;
  textColor: "white" | "black";
}

export interface TestimonialCardData {
  id: string;
  quote: string;
  name: string;
  photoSrc: string;
  rating: number;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface Venue {
  id: string;
  title: string;
  image: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  amenities: string[];
  price: string;
  location: string;
}

export interface VenueStat {
  icon: string;
  label: string;
}

export interface FeaturedVenue {
  id: string;
  imageSrc: string;
  title: string;
  location: string;
  stats: VenueStat[];
  extraCount: number;
  pricePerHour: number;
}

export interface Vendor {
  id: string;
  title: string;
  image: string;
  venueCount: number;
}

export interface Destination {
  id: string;
  city: string;
  tagline: string;
  venueCount: number;
  image: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}
