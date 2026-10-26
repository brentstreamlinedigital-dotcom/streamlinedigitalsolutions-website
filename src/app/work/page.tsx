import type { Metadata } from "next";
import Eyebrow from "@/components/ui/Eyebrow";
import Odometer from "@/components/motion/Odometer";
import WorkGallery from "@/components/sections/WorkGallery";
import { cases } from "@/content/cases";

export const metadata: Metadata = {
  title: "Ecommerce Case Studies & Growth Outcomes | Streamline",
  description:
    "Explore verified client case studies and ecommerce growth outcomes. High-converting Shopify stores, paid media scaling, and automated retention funnels.",
};

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section data-theme="dark" className="bg-ink text-paper pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="grid-container">
          <Eyebrow label="CASE STUDIES &amp; PORTFOLIO" className="text-accent" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-6">
            Ecommerce Case Studies &amp; Growth Outcomes.
          </h1>
          <div className="flex gap-8 md:gap-12 items-baseline">
            <div>
              <p className="text-3xl md:text-4xl font-medium">
                <Odometer value="25" suffix="+" />
              </p>
              <p className="text-sm text-paper/50 mt-1">Projects shipped</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-medium">
                <Odometer value="1" suffix="M+" suffixClassName="text-[0.72em] -ml-2 inline-block font-medium" />
              </p>
              <p className="text-sm text-paper/50 mt-1">Site visits delivered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Work Gallery with filters and 3 view modes */}
      <WorkGallery cases={cases} />
    </>
  );
}
