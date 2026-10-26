import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeading from "@/components/ui/SectionHeading";
import Odometer from "@/components/motion/Odometer";
import { cases } from "@/content/cases";
import { BOOKING_URL } from "@/lib/constants";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = cases.find((c) => c.slug === slug);
  if (!caseStudy) return { title: "Case Study Not Found" };

  return {
    title: `${caseStudy.title} Case Study | Streamline Digital Solutions`,
    description: caseStudy.tagline,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = cases.find((c) => c.slug === slug);

  if (!caseStudy) notFound();

  const currentIndex = cases.findIndex((c) => c.slug === slug);
  const nextCase = cases[(currentIndex + 1) % cases.length];

  return (
    <>
      {/* Full-bleed hero showcase image */}
      <section data-theme="dark" className="bg-ink text-paper border-b border-paper/10 pt-28 pb-12">
        <div className="grid-container">
          <div className="aspect-[16/10] max-h-[72vh] w-full rounded-2xl overflow-hidden border border-paper/10 relative shadow-2xl bg-paper/5">
            <Image
              src={caseStudy.heroImage || caseStudy.thumbnail}
              alt={caseStudy.title}
              fill
              priority
              className="object-cover object-top"
              sizes="100vw"
            />
            {caseStudy.category && (
              <div className="absolute top-6 left-6 bg-ink/85 backdrop-blur-md border border-paper/10 text-paper font-label text-xs uppercase tracking-wider px-3.5 py-1.5 rounded shadow-lg">
                {caseStudy.category}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Title + meta */}
      <section data-theme="dark" className="bg-ink text-paper py-16 md:py-24">
        <div className="grid-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {caseStudy.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-label text-xs text-accent border border-accent/30 px-2.5 py-1 rounded"
                  >
                    [{tag}]
                  </span>
                ))}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight">
                {caseStudy.title}
              </h1>
            </div>

            {caseStudy.liveUrl && (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-semibold text-xs tracking-wider uppercase bg-paper/10 hover:bg-accent hover:text-ink text-paper px-4 py-2 rounded-md transition-colors whitespace-nowrap self-start md:self-auto flex items-center gap-2 border border-paper/10"
              >
                <span>VIEW LIVE SITE</span>
                <span>↗</span>
              </a>
            )}
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 border-t border-paper/10 pt-8">
            {Object.entries(caseStudy.meta).map(([key, value]) => (
              <div key={key}>
                <p className="font-label text-[10px] text-accent mb-1 tracking-wider">
                  {key.toUpperCase()}
                </p>
                <p className="text-sm text-paper/80 font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tagline */}
      <section data-theme="light" className="bg-paper text-ink py-16 md:py-20 border-b border-ink/10">
        <div className="grid-container">
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug max-w-4xl">
            {caseStudy.tagline}
          </p>
        </div>
      </section>

      {/* Challenge + Solution */}
      <section data-theme="light" className="bg-paper text-ink py-20 md:py-28">
        <div className="grid-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-card border border-ink/10 rounded-2xl p-8 md:p-10 shadow-sm">
              <Eyebrow label="THE CHALLENGE" />
              <h3 className="text-2xl font-medium mt-2 mb-4">The core bottleneck.</h3>
              <p className="text-grey-600 leading-relaxed text-base">{caseStudy.challenge}</p>
            </div>
            <div className="bg-card border border-ink/10 rounded-2xl p-8 md:p-10 shadow-sm">
              <Eyebrow label="THE SOLUTION" />
              <h3 className="text-2xl font-medium mt-2 mb-4">The strategic implementation.</h3>
              <p className="text-grey-600 leading-relaxed text-base">{caseStudy.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section data-theme="dark" className="bg-ink text-paper py-24 md:py-32">
        <div className="grid-container">
          <Eyebrow label="THE RESULTS" className="text-accent" />
          <SectionHeading>Verified outcomes.</SectionHeading>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudy.results.map((result, i) => (
              <div key={i} className="bg-paper/5 border border-paper/10 rounded-xl p-8 text-center hover:border-accent/40 transition-colors">
                <p className="text-4xl md:text-5xl lg:text-6xl font-medium mb-3 text-paper">
                  <Odometer value={result.value} suffix={result.suffix} />
                </p>
                <p className="text-sm text-paper/60 font-medium">{result.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-theme="light" className="bg-paper text-ink py-24 border-t border-ink/10">
        <div className="grid-container text-center">
          <SectionHeading>Ready to build a growth engine?</SectionHeading>
          <p className="text-grey-500 max-w-xl mx-auto mt-4 text-base">
            Book a 30-minute discovery call with our team. We will review your current funnel and outline where immediate gains are waiting.
          </p>
          <div className="mt-8">
            <Button href={BOOKING_URL} label="BOOK A GROWTH CALL" />
          </div>
        </div>
      </section>

      {/* Next case */}
      <section data-theme="dark" className="bg-ink text-paper py-20 border-t border-paper/10">
        <div className="grid-container">
          <Link href={`/work/${nextCase.slug}`} className="group block">
            <p className="font-label text-xs text-accent mb-4 tracking-wider">NEXT CASE STUDY</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl md:text-5xl font-medium group-hover:text-accent transition-colors">
                  {nextCase.title}
                </p>
                <p className="text-paper/50 text-sm mt-2">{nextCase.tagline}</p>
              </div>
              <span className="text-3xl md:text-5xl font-medium text-accent transition-transform duration-300 group-hover:translate-x-3">
                →
              </span>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
