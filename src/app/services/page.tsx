import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design, SEO, Meta and Google Ads, app development, CRM, automations, and AI solutions. Everything your store needs to scale.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section data-theme="dark" className="bg-ink text-paper pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="grid-container">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05] max-w-4xl">
            Everything your store needs to scale.
          </h1>
          <p className="mt-6 text-lg text-paper/60 max-w-xl">
            Seven capabilities, one team. We handle the full stack so nothing falls through the cracks.
          </p>
        </div>
      </section>

      {/* Service blocks */}
      <section data-theme="light" className="bg-paper text-ink py-24 md:py-32">
        <div className="grid-container">
          <div className="space-y-20 md:space-y-28">
            {services.map((service, i) => (
              <div
                key={service.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-ink/10 pt-12"
              >
                <div className="lg:col-span-1">
                  <span className="font-label text-xs text-accent-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="lg:col-span-5">
                  <h2 className="text-2xl md:text-3xl font-medium mb-4">
                    {service.title}
                  </h2>
                  <p className="text-grey-500 leading-relaxed">
                    {service.outcome}
                  </p>
                </div>
                <div className="lg:col-span-4">
                  <p className="font-label text-xs text-accent-ink mb-4">DELIVERABLES</p>
                  <ul className="space-y-2">
                    {service.deliverables.map((d, j) => (
                      <li key={j} className="text-sm text-grey-700 flex items-start gap-2">
                        <span className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-2 flex items-start lg:justify-end">
                  <Link
                    href={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-ink text-paper text-xs font-sans font-semibold tracking-wider uppercase hover:bg-accent-ink transition-all duration-200 group"
                  >
                    <span>Learn more</span>
                    <span className="transform group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Catch-all CTA */}
          <div className="mt-24 border-t border-ink/10 pt-12">
            <p className="text-2xl md:text-3xl font-medium mb-6">
              Need something else? We will figure it out.
            </p>
            <Button href="/contact" label="TELL US WHAT YOU NEED" />
          </div>
        </div>
      </section>
    </>
  );
}
