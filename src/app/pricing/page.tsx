import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { pricingTiers } from "@/content/pricing";
import { pricingFaq } from "@/content/faq";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent scoping for ecommerce growth. Launch builds, monthly Growth Engine retainers, and custom systems. No hidden fees.",
};

export default function PricingPage() {
  const engagementLengths = [
    { tier: "Launch", length: "4 to 8 weeks" },
    { tier: "Growth Engine", length: "Monthly, 3-month minimum" },
    { tier: "Custom Systems", length: "Scoped per project" },
  ];

  return (
    <>
      {/* Hero */}
      <section data-theme="dark" className="bg-ink text-paper pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="grid-container">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight">
            How we scope growth.
          </h1>
          <p className="mt-6 text-lg text-paper/60 max-w-xl">
            Three ways to work together. Every engagement starts with understanding your store, your goals, and what will actually move the needle.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section data-theme="light" className="bg-paper text-ink py-24 md:py-32">
        <div className="grid-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.label}
                className={`rounded-lg p-8 flex flex-col ${
                  tier.highlighted
                    ? "bg-ink text-paper ring-2 ring-accent"
                    : "bg-card"
                }`}
              >
                {/* Header */}
                <div className="mb-8">
                  <p className={`font-label text-xs mb-2 ${tier.highlighted ? "text-accent" : "text-accent-ink"}`}>
                    {tier.type.toUpperCase()}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-medium mb-3">{tier.label}</h2>
                  <p className={`text-sm leading-relaxed ${tier.highlighted ? "text-paper/60" : "text-grey-500"}`}>
                    {tier.description}
                  </p>
                </div>

                {/* Includes */}
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${tier.highlighted ? "bg-accent" : "bg-accent-ink"}`} />
                      <span className={tier.highlighted ? "text-paper/70" : "text-grey-700"}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Scarcity + CTA */}
                <div className="mt-auto">
                  <p className={`font-label text-[10px] mb-4 ${tier.highlighted ? "text-accent" : "text-accent-ink"}`}>
                    LIMITED SLOTS THIS QUARTER
                  </p>
                  <Button
                    href="/contact"
                    label={tier.cta.toUpperCase()}
                    variant={tier.highlighted ? "primary" : "outline"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement length table */}
      <section data-theme="light" className="bg-paper text-ink pb-24">
        <div className="grid-container">
          <Eyebrow label="ENGAGEMENT LENGTH" />
          <div className="max-w-2xl">
            <div className="divide-y divide-ink/10">
              {engagementLengths.map((item) => (
                <div key={item.tier} className="flex justify-between py-4">
                  <span className="font-medium">{item.tier}</span>
                  <span className="text-grey-500 text-sm">{item.length}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section data-theme="dark" className="bg-ink text-paper py-24 md:py-32">
        <div className="grid-container">
          <Eyebrow label="FAQ" className="text-accent" />
          <SectionHeading>Common questions.</SectionHeading>
          <div className="mt-12 max-w-3xl">
            <Accordion items={pricingFaq} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-theme="light" className="bg-paper text-ink py-24">
        <div className="grid-container text-center">
          <SectionHeading>Let us scope your project.</SectionHeading>
          <div className="mt-8">
            <Button href="/contact" label="START A PROJECT" />
          </div>
        </div>
      </section>
    </>
  );
}
