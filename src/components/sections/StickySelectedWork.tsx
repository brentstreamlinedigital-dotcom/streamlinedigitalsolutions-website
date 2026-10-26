"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrambleText from "@/components/motion/ScrambleText";
import type { CaseStudy } from "@/types";

interface StickySelectedWorkProps {
  cases: CaseStudy[];
}

export default function StickySelectedWork({ cases }: StickySelectedWorkProps) {
  // Use passed cases directly (defaults to 3 selected works on homepage)
  const displayCases = cases;

  const [activeSlug, setActiveSlug] = useState<string>(displayCases[0]?.slug || "");
  const caseRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = entry.target.getAttribute("data-slug");
            if (slug) setActiveSlug(slug);
          }
        });
      },
      {
        rootMargin: "-20% 0px -50% 0px",
        threshold: 0.1,
      }
    );

    caseRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [displayCases]);

  return (
    <section data-theme="dark" className="bg-ink text-paper py-24 md:py-32 border-t border-paper/10">
      <div className="grid-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: sticky title column */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <SectionHeading>Selected work.</SectionHeading>
            <p className="mt-4 text-paper/60 text-sm leading-relaxed max-w-sm">
              Real results for real brands. Every system and metric verified by client outcomes.
            </p>

            {/* Thumb index */}
            <div className="mt-8 space-y-3" role="tablist" aria-label="Case studies index">
              {displayCases.map((c) => {
                const isActive = activeSlug === c.slug;
                return (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => {
                      const target = caseRefs.current.get(c.slug);
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth", block: "center" });
                      }
                    }}
                    className="flex items-center gap-3 group text-sm text-left w-full transition-colors focus:outline-none cursor-pointer"
                  >
                    <span
                      className={`w-2 h-2 rounded-sm transition-all duration-300 ${
                        isActive
                          ? "bg-accent scale-125 ring-2 ring-accent/30"
                          : "bg-paper/20 group-hover:bg-paper/40"
                      }`}
                    />
                    <span
                      className={`transition-colors duration-200 ${
                        isActive
                          ? "text-paper font-medium"
                          : "text-paper/50 group-hover:text-paper"
                      }`}
                    >
                      {c.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8">
              <Button href="/work" label="VIEW ALL WORKS" variant="outline" />
            </div>
          </div>

          {/* Right: scrolling case cards */}
          <div className="lg:col-span-8 space-y-16">
            {displayCases.map((c) => (
              <div
                key={c.slug}
                data-slug={c.slug}
                ref={(el) => {
                  if (el) caseRefs.current.set(c.slug, el);
                }}
              >
                <Link
                  href={`/work/${c.slug}`}
                  className="block group"
                >
                  <div className="aspect-[16/10] bg-paper/5 border border-paper/10 rounded-xl overflow-hidden mb-5 group-hover:border-accent/40 transition-all duration-500 relative shadow-xl">
                    <Image
                      src={c.thumbnail}
                      alt={c.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {c.category && (
                      <div className="absolute top-4 left-4 bg-ink/85 backdrop-blur-sm border border-paper/10 text-paper font-label text-[10px] uppercase tracking-wider px-2.5 py-1 rounded">
                        {c.category}
                      </div>
                    )}

                    <div className="absolute bottom-4 right-4 bg-ink/90 backdrop-blur-sm border border-paper/10 px-3.5 py-1.5 rounded text-[11px] font-label text-accent opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      EXPLORE CASE →
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-medium group-hover:text-accent transition-colors">
                        <ScrambleText text={c.title} />
                      </h3>
                      <p className="text-paper/60 text-sm mt-1">{c.tagline}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 flex-shrink-0 mt-1 max-w-[200px] justify-end">
                      {c.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-label text-[10px] text-accent border border-accent/30 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
