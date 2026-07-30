import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { StepItem } from "@/components/ui/StepItem";

interface CollagePhoto {
  id: string;
  src: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

interface StepData {
  id: string;
  number: number;
  title: string;
  description: string;
}

const collagePhotos: CollagePhoto[] = [
  { id: "c1", src: "/images/how-it-works/collage-1.png", position: "top-left" },
  { id: "c2", src: "/images/how-it-works/collage-2.png", position: "top-right" },
  { id: "c3", src: "/images/how-it-works/collage-3.png", position: "bottom-left" },
  { id: "c4", src: "/images/how-it-works/collage-4.png", position: "bottom-right" },
];

const steps: StepData[] = [
  {
    id: "s1",
    number: 1,
    title: "Search & filter",
    description:
      "Browse our curated collection of venues and event professionals. Use smart filters, high-quality visuals, and authentic reviews to find options that fit your needs, style, and budget.",
  },
  {
    id: "s2",
    number: 2,
    title: "Compare & message",
    description:
      "Communicate directly with venue hosts and service providers. Request tailored quotes, discuss requirements, and design every detail of your event or project with confidence.",
  },
  {
    id: "s3",
    number: 3,
    title: "Book & add services",
    description:
      "Secure your choices with ease through our protected booking system. With clear agreements, secure payments, and ongoing support, you can move forward knowing everything is handled.",
  },
];

const photoPositions: Record<string, { top: string; left: string }> = {
  "top-left": { top: "0%", left: "0%" },
  "top-right": { top: "10.81%", left: "51.46%" },
  "bottom-left": { top: "46.44%", left: "0%" },
  "bottom-right": { top: "57.25%", left: "51.46%" },
};

export function HowItWorksSection() {
  return (
    <section className="w-full bg-white md:pt-32 lg:pt-[200px] pb-20 md:pb-32 lg:pb-[200px]">
      <div className="container-main px-5 lg:px-18">
        <div className="flex flex-col items-center gap-[10px] mb-16 md:mb-20 lg:mb-24 mx-auto max-w-[1200px]">
          <h2 className="font-[600] text-2xl sm:text-[28px] md:text-[36px] lg:text-[40px] leading-[32px] sm:leading-[36px] md:leading-[44px] lg:leading-[48px] text-black text-center">
            Your Path to the Perfect Venue
          </h2>
          <p className="font-[400] text-sm md:text-base lg:text-lg text-black text-center max-w-[900px]">
            Planning an event, production, or gathering shouldn&apos;t feel complicated. Our streamlined process connects you with the right venues and trusted professionals, taking the stress out of logistics so you can focus on what matters most  making it a success.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-[20px] md:gap-16 lg:gap-20">
          <div className="w-full max-w-[515px] mx-auto md:mx-0 flex-shrink-0">
            <div className="relative w-full aspect-[515/407]">
              {collagePhotos.map((photo) => {
                const pos = photoPositions[photo.position];
                return (
                  <div
                    key={photo.id}
                    className="absolute rounded-[20px] overflow-hidden"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      width: "48.54%",
                      height: "42.75%",
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 50vw, 250px"
                      className="object-cover"
                    />
                  </div>
                );
              })}

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-[120px] h-[120px] rounded-full bg-white border-[10px] border-white shadow-[0px_4px_24px_rgba(0,0,0,0.25)] flex items-center justify-center">
                  <Image src="/icons/Event.svg" alt="Play icon" width={50} height={50} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[523px] mx-auto md:mx-0">
            <div className="relative">
              <div className="absolute left-[25px] top-[10px] bottom-[10px] w-0 border-l-2 border-dashed border-[#A2A2A2]" />
              <div className="flex flex-col gap-[20px]">
                {steps.map((step) => (
                  <StepItem
                    key={step.id}
                    number={step.number}
                    title={step.title}
                    description={step.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}