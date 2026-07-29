import type { Category, Testimonial, Stat, Step, Vendor, Destination, FooterColumn } from "@/types/common";

export const SITE_NAME = "Venuze";
export const SITE_TAGLINE = "Find the perfect venue for your next event";

export const NAV_ITEMS = [
  { label: "Venues", href: "#" },
  { label: "Vendors", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

export const CATEGORIES: Category[] = [
  {
    id: "celebration",
    title: "Celebration Venues",
    venueCount: 37,
    image: "/images/categories/celebration.jpg",
  },
  {
    id: "private-party",
    title: "Private Party Venues",
    venueCount: 42,
    image: "/images/categories/private-party.jpg",
  },
  {
    id: "corporate",
    title: "Corporate Meetings",
    venueCount: 28,
    image: "/images/categories/corporate.jpg",
  },
  {
    id: "creative",
    title: "Creative Studios",
    venueCount: 19,
    image: "/images/categories/creative.jpg",
  },
];

export const STATS: Stat[] = [
  {
    id: "venues",
    value: "1,500+",
    label: "Venues Vetted",
    color: "bg-[#FF5037]",
  },
  {
    id: "events",
    value: "7,500+",
    label: "Events Hosted",
    color: "bg-[#FEC432]",
  },
  {
    id: "cities",
    value: "35+",
    label: "Cities",
    color: "bg-[#22C55E]",
  },
  {
    id: "rating",
    value: "4.9\u2605",
    label: "Rating",
    color: "bg-[#3B82F6]",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Event Planner",
    quote: "\"Venuze made finding the perfect venue incredibly easy. The detailed listings and transparent pricing saved me hours of research.\"",
    avatar: "/images/testimonials/testimonial-1.jpg",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Corporate Events Director",
    quote: "\"The variety of venues available on Venuze is outstanding. From intimate meetings to large conferences, we found exactly what we needed.\"",
    avatar: "/images/testimonials/testimonial-2.jpg",
    rating: 5,
  },
];

export const STEPS: Step[] = [
  {
    number: 1,
    title: "Search & Filter",
    description: "Browse through our curated collection of venues and vendors. Use advanced filters to find exactly what you need.",
    icon: "search",
  },
  {
    number: 2,
    title: "Compare & Message",
    description: "Compare venues side by side, read reviews, and message venue owners directly through our platform.",
    icon: "message-circle",
  },
  {
    number: 3,
    title: "Book & Add Services",
    description: "Secure your booking and add extra services like catering, decor, and entertainment all in one place.",
    icon: "calendar-check",
  },
];

export const VENUE_FILTERS = [
  { id: "all", label: "All" },
  { id: "rooftop", label: "Rooftop" },
  { id: "gallery", label: "Gallery" },
  { id: "restaurant", label: "Restaurant" },
  { id: "outdoor", label: "Outdoor" },
  { id: "studio", label: "Studio" },
  { id: "terrace", label: "Terrace" },
  { id: "ballroom", label: "Ballroom" },
];

export const FEATURED_VENUES = [
  {
    id: "v1",
    title: "The Grand Ballroom",
    image: "/images/featured-venues/venue-1.jpg",
    verified: true,
    rating: 4.9,
    reviewCount: 128,
    amenities: ["Parking", "Wi-Fi", "Catering"],
    price: "$500/hr",
    location: "Downtown",
  },
  {
    id: "v2",
    title: "Skyline Rooftop",
    image: "/images/featured-venues/venue-2.jpg",
    verified: true,
    rating: 4.8,
    reviewCount: 96,
    amenities: ["Parking", "Wi-Fi", "Catering"],
    price: "$350/hr",
    location: "Midtown",
  },
  {
    id: "v3",
    title: "The Garden Terrace",
    image: "/images/featured-venues/venue-3.jpg",
    verified: true,
    rating: 4.7,
    reviewCount: 84,
    amenities: ["Parking", "Wi-Fi", "Catering"],
    price: "$400/hr",
    location: "Suburbs",
  },
  {
    id: "v4",
    title: "Modern Art Studio",
    image: "/images/featured-venues/venue-4.jpg",
    verified: true,
    rating: 4.9,
    reviewCount: 156,
    amenities: ["Parking", "Wi-Fi", "Catering"],
    price: "$600/hr",
    location: "Arts District",
  },
];

export const VENDORS: Vendor[] = [
  {
    id: "caterers",
    title: "Caterers",
    image: "/images/vendors/caterers.jpg",
    venueCount: 240,
  },
  {
    id: "decorators",
    title: "Decorators",
    image: "/images/vendors/decorators.jpg",
    venueCount: 180,
  },
  {
    id: "photographers",
    title: "Photographers",
    image: "/images/vendors/photographers.jpg",
    venueCount: 310,
  },
  {
    id: "entertainment",
    title: "Entertainment",
    image: "/images/vendors/entertainment.jpg",
    venueCount: 150,
  },
];

export const DESTINATIONS: Destination[] = [
  {
    id: "new-york",
    city: "New York",
    tagline: "The city that never sleeps",
    venueCount: 340,
    image: "/images/destinations/new-york.jpg",
  },
  {
    id: "london",
    city: "London",
    tagline: "Where tradition meets modernity",
    venueCount: 280,
    image: "/images/destinations/london.jpg",
  },
  {
    id: "dubai",
    city: "Dubai",
    tagline: "Luxury redefined",
    venueCount: 190,
    image: "/images/destinations/dubai.jpg",
  },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Venuze",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Safety", href: "#" },
      { label: "FAQs", href: "#" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Venues", href: "#" },
      { label: "Vendors", href: "#" },
      { label: "Destinations", href: "#" },
      { label: "Events", href: "#" },
    ],
  },
  {
    title: "Legal & Privacy",
    links: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "GDPR", href: "#" },
    ],
  },
];

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Twitter", href: "#", icon: "twitter" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
];
