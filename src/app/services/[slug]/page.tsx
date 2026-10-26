import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import { services } from "@/content/services";
import { cases } from "@/content/cases";
import { BOOKING_URL } from "@/lib/constants";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({
    slug: s.id,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) return { title: "Service Not Found" };

  const baseUrl = "https://streamlinedigitalsolutions.com";
  const canonicalUrl = `${baseUrl}/services/${service.id}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.metaTitle} | Streamline Digital Solutions`,
      description: service.metaDescription,
      url: canonicalUrl,
      type: "website",
      siteName: "Streamline Digital Solutions",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  const relatedCaseStudy = service.relatedCase
    ? cases.find((c) => c.slug === service.relatedCase)
    : null;

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.metaDescription,
        provider: {
          "@type": "Organization",
          name: "Streamline Digital Solutions",
          url: "https://streamlinedigitalsolutions.com",
          logo: "https://streamlinedigitalsolutions.com/branding/logobgless.png",
          areaServed: ["Global", "South Africa", "United States", "United Kingdom"],
        },
        serviceType: service.title,
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://streamlinedigitalsolutions.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://streamlinedigitalsolutions.com/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: `https://streamlinedigitalsolutions.com/services/${service.id}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      {/* Schema.org Injection for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============================================================
          HERO (Dark)
          ============================================================ */}
      <section data-theme="dark" className="relative bg-ink text-paper pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Subtle Ambient Radial Backlight */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(1, 206, 209, 0.4) 0%, transparent 70%)",
          }}
        />

        <div className="grid-container relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs font-label text-paper/50">
            <Link href="/" className="hover:text-accent transition-colors">
              HOME
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-accent transition-colors">
              SERVICES
            </Link>
            <span>/</span>
            <span className="text-accent">{service.id.toUpperCase()}</span>
          </nav>

          {/* Keyword Pill Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {service.keywords.slice(0, 3).map((kw, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-label bg-paper/[0.04] border border-paper/10 text-paper/70"
              >
                {kw}
              </span>
            ))}
          </div>

          {/* Primary H1 Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] max-w-4xl">
            {service.heroHeadline}
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg md:text-xl text-paper/70 max-w-2xl leading-relaxed font-light">
            {service.heroSubhead}
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={BOOKING_URL} label="BOOK A GROWTH CALL" />
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-wider uppercase text-paper/80 hover:text-accent transition-all duration-200 px-5 py-3 rounded-lg border border-paper/10 hover:border-accent/40 bg-paper/[0.02]"
            >
              <span>&larr; All Capabilities</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          STRATEGIC ADVANTAGES / CORE PILLARS (Light)
          ============================================================ */}
      <section data-theme="light" className="bg-paper text-ink py-20 md:py-28">
        <div className="grid-container">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight leading-tight">
              Why our approach delivers measurable growth.
            </h2>
            <p className="mt-4 text-grey-500 text-base md:text-lg">
              Engineered without agency bloat or vanity metrics. Every feature and campaign is tied to revenue and conversion margin.
            </p>
          </div>

          {/* 4-Column Advantage Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {service.benefits.map((benefit, i) => (
              <div
                key={i}
                className="p-8 rounded-xl bg-card border border-ink/10 hover:border-accent/40 transition-all duration-300 shadow-sm"
              >
                <span className="font-mono text-xs text-accent-ink font-semibold">
                  0{i + 1} //
                </span>
                <h3 className="text-xl font-medium mt-3 mb-2">{benefit.title}</h3>
                <p className="text-grey-700 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          DELIVERABLES & TECH STACK (Light)
          ============================================================ */}
      <section data-theme="light" className="bg-card text-ink py-20 md:py-28 border-t border-ink/10">
        <div className="grid-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Included Deliverables */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-8">
                What we ship in this engagement.
              </h2>
              <ul className="space-y-4">
                {service.deliverables.map((del, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-lg bg-paper border border-ink/5"
                  >
                    <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-sm md:text-base text-grey-700 font-medium leading-relaxed">
                      {del}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Modern Tech Stack */}
            <div className="lg:col-span-5">
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-8">
                Production-grade stack.
              </h2>
              <p className="text-grey-500 text-sm leading-relaxed mb-6">
                We build with world-class, modern infrastructure so your store remains maintainable, lightning-fast, and battle-tested at scale.
              </p>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-lg text-xs font-mono font-medium bg-paper border border-ink/10 text-grey-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PROVEN PROCESS / STEP-BY-STEP ROADMAP (Dark)
          ============================================================ */}
      <section data-theme="dark" className="bg-ink text-paper py-24 md:py-32">
        <div className="grid-container">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight leading-tight">
              Our 4-step delivery protocol.
            </h2>
            <p className="mt-4 text-paper/60 text-base md:text-lg">
              Structured sprints with transparent milestones, zero surprises, and rapid turnaround.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((p) => (
              <div
                key={p.step}
                className="p-6 rounded-xl border border-paper/10 bg-paper/[0.02] flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-accent font-semibold tracking-wider">
                    PHASE {p.step}
                  </span>
                  <h3 className="text-lg font-medium text-paper mt-3 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-paper/65 text-xs leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          RELATED PROOF OF WORK / CASE STUDY (Light)
          ============================================================ */}
      {relatedCaseStudy && (
        <section data-theme="light" className="bg-paper text-ink py-20 md:py-28 border-t border-ink/10">
          <div className="grid-container">
            <div className="p-8 sm:p-12 rounded-2xl bg-card border border-ink/10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="font-label text-xs text-accent-ink tracking-wider uppercase">
                  VERIFIED CASE STUDY PROOF
                </span>
                <h3 className="text-2xl sm:text-3xl font-medium mt-2 mb-3">
                  {relatedCaseStudy.title}
                </h3>
                <p className="text-grey-500 text-sm leading-relaxed mb-6">
                  {relatedCaseStudy.tagline}
                </p>
                {relatedCaseStudy.results && relatedCaseStudy.results.length > 0 && (
                  <div className="flex flex-wrap gap-6 pt-4 border-t border-ink/10">
                    {relatedCaseStudy.results.slice(0, 3).map((r, i) => (
                      <div key={i}>
                        <div className="text-xl sm:text-2xl font-mono font-medium text-ink">
                          {r.value}
                          <span className="text-accent-ink">{r.suffix}</span>
                        </div>
                        <div className="text-xs text-grey-500 font-label">{r.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex-shrink-0">
                <Link
                  href={`/work/${relatedCaseStudy.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-lg bg-ink text-paper text-xs font-sans font-semibold tracking-wider uppercase hover:bg-accent-ink transition-colors duration-200"
                >
                  <span>Explore Case Study</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SERVICE FAQ ACCORDION (Light)
          ============================================================ */}
      <section data-theme="light" className="bg-paper text-ink py-20 md:py-28 border-t border-ink/10">
        <div className="grid-container">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight">
              Frequently asked questions.
            </h2>
            <p className="mt-3 text-grey-500 text-sm md:text-base">
              Clear answers regarding our {service.title.toLowerCase().replace(/\.$/, "")} process, pricing, and timelines.
            </p>
          </div>

          <div className="max-w-3xl">
            <Accordion items={service.faqs} />
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL HIGH-CONVERTING CTA (Dark)
          ============================================================ */}
      <section data-theme="dark" className="bg-ink text-paper py-24 md:py-32 border-t border-paper/10 text-center">
        <div className="grid-container max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight">
            Ready to accelerate your store with {service.title.toLowerCase().replace(/\.$/, "")}?
          </h2>
          <p className="mt-6 text-paper/70 text-base md:text-lg leading-relaxed">
            Book a 15-minute growth diagnostic. We review your current funnel, diagnose growth bottlenecks, and map out a clear roadmap.
          </p>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <Button href={BOOKING_URL} label="BOOK A 15-MIN GROWTH CALL" />
            <Link
              href="/services"
              className="px-6 py-3.5 rounded-lg border border-paper/20 hover:border-accent text-xs font-sans font-semibold tracking-wider uppercase text-paper/80 hover:text-accent transition-colors"
            >
              Browse All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
