import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { CategoryCardsSection } from "@/components/sections/CategoryCardsSection";
import { TrustedBySection } from "@/components/sections/TrustedBySection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FeaturedVenuesSection } from "@/components/sections/FeaturedVenuesSection";
import { VendorGridSection } from "@/components/sections/VendorGridSection";
import { GrowBusinessCTA } from "@/components/sections/GrowBusinessCTA";
import { DestinationsSection } from "@/components/sections/DestinationsSection";
import { TurnVenueCTA } from "@/components/sections/TurnVenueCTA";
import { Footer } from "@/components/sections/Footer";

export function HeroSearchView() {
  return (
    <>
      <Navbar />
      <Hero />
      <CategoryCardsSection />
      <TrustedBySection />
      <HowItWorksSection />
      <FeaturedVenuesSection />
      <VendorGridSection />
      <GrowBusinessCTA />
      <DestinationsSection />
      <TurnVenueCTA />
      <Footer />
    </>
  );
}
