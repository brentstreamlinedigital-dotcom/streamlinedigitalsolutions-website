"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ScrambleText from "@/components/motion/ScrambleText";
import type { CaseStudy } from "@/types";

interface WorkGalleryProps {
  cases: CaseStudy[];
}

const ALL_TAGS = ["ALL", "WEB", "ADS", "SEO", "CRM", "AUTOMATION", "LOCAL", "CRO"] as const;
type Tag = (typeof ALL_TAGS)[number];
type ViewMode = "2-col" | "grid" | "carousel";

export default function WorkGallery({ cases }: WorkGalleryProps) {
  const [selectedTag, setSelectedTag] = useState<Tag>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<ViewMode>("2-col");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const filteredCases = cases.filter((c) => {
    const matchesTag = selectedTag === "ALL" || c.tags.includes(selectedTag as any);
    const matchesCat = selectedCategory === "ALL" || c.category === selectedCategory;
    return matchesTag && matchesCat;
  });

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : filteredCases.length - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev < filteredCases.length - 1 ? prev + 1 : 0));
  };

  const categories = ["ALL", "CLIENT", "CONCEPT"];

  return (
    <section data-theme="light" className="bg-paper text-ink py-16 md:py-24">
      <div className="grid-container">
        {/* Controls Bar: Filters on Left, View Modes on Right */}
        <div className="flex flex-col gap-6 mb-12 border-b border-ink/10 pb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Filter tags */}
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter case studies by service">
              <span className="font-label text-xs text-grey-400 mr-1">SERVICE:</span>
              {ALL_TAGS.map((tag) => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSelectedTag(tag);
                      setCarouselIndex(0);
                    }}
                    className={`font-sans font-semibold text-xs tracking-wider uppercase px-3 py-1.5 rounded-md border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-accent text-ink border-accent shadow-sm"
                        : "border-ink/10 text-grey-500 hover:border-accent hover:text-accent-ink bg-card"
                    }`}
                    aria-pressed={isSelected}
                  >
                    [{tag}]
                  </button>
                );
              })}
            </div>

            {/* View mode switcher */}
            <div className="flex items-center gap-2 self-start lg:self-auto">
              <span className="font-label text-xs text-grey-400 mr-1">VIEW:</span>
              {(["2-col", "grid", "carousel"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`font-sans font-semibold text-xs uppercase tracking-wider px-3 py-1 rounded border transition-colors cursor-pointer ${
                    viewMode === mode
                      ? "bg-ink text-paper border-ink"
                      : "border-ink/10 text-grey-500 hover:text-ink hover:border-ink/30"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-ink/5">
            <span className="font-label text-xs text-grey-400 mr-1">CATEGORY:</span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCarouselIndex(0);
                  }}
                  className={`font-sans font-semibold text-xs uppercase tracking-wider px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-ink text-paper border-ink"
                      : "border-ink/10 text-grey-500 hover:border-ink/30 bg-transparent"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
            <span className="font-label text-[11px] text-grey-400 ml-auto">
              Showing {filteredCases.length} of {cases.length} works
            </span>
          </div>
        </div>

        {/* Empty State */}
        {filteredCases.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-grey-500 text-lg">No cases found matching your filters.</p>
            <button
              onClick={() => {
                setSelectedTag("ALL");
                setSelectedCategory("ALL");
              }}
              className="mt-4 font-sans font-semibold text-xs tracking-wider uppercase text-accent-ink underline hover:text-accent cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* VIEW 1: 2-Column Standard View */}
        {viewMode === "2-col" && filteredCases.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {filteredCases.map((c) => (
              <Link
                key={c.slug}
                href={`/work/${c.slug}`}
                className="group block"
              >
                <div className="aspect-[16/10] bg-card border border-ink/10 rounded-xl overflow-hidden mb-4 group-hover:border-accent/40 transition-all duration-500 relative shadow-sm">
                  <Image
                    src={c.thumbnail}
                    alt={c.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {c.category && (
                    <div className="absolute top-3 left-3 bg-ink/85 backdrop-blur-sm border border-paper/10 text-paper font-label text-[10px] tracking-wider uppercase px-2.5 py-1 rounded shadow-sm">
                      {c.category}
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 bg-paper border border-ink/10 px-3 py-1 rounded text-[11px] font-label text-accent-ink opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    VIEW CASE →
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-medium group-hover:text-accent-ink transition-colors">
                      <ScrambleText text={c.title} />
                    </h2>
                    <p className="text-grey-500 text-sm mt-1 line-clamp-2">{c.tagline}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 flex-shrink-0 justify-end max-w-[150px]">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-label text-[10px] text-accent-ink border border-accent-ink/20 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* VIEW 2: Dense 3-Column Grid View */}
        {viewMode === "grid" && filteredCases.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((c) => (
              <Link
                key={c.slug}
                href={`/work/${c.slug}`}
                className="group block bg-card border border-ink/10 rounded-xl p-4 hover:border-accent transition-all duration-300 shadow-sm"
              >
                <div className="aspect-[16/10] bg-paper rounded-lg mb-4 overflow-hidden relative border border-ink/5">
                  <Image
                    src={c.thumbnail}
                    alt={c.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {c.category && (
                    <div className="absolute top-2 left-2 bg-ink/80 backdrop-blur-sm text-paper font-label text-[9px] uppercase px-2 py-0.5 rounded">
                      {c.category}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="text-base font-medium group-hover:text-accent-ink transition-colors truncate">
                    {c.title}
                  </h3>
                  <span className="font-label text-[10px] text-accent-ink font-semibold flex-shrink-0">
                    {c.meta.market.split(" ")[0]}
                  </span>
                </div>
                <p className="text-grey-500 text-xs line-clamp-2 mb-3">{c.tagline}</p>
                <div className="flex flex-wrap gap-1">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-label text-[9px] text-grey-500 border border-ink/10 px-1.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* VIEW 3: Immersive Carousel View */}
        {viewMode === "carousel" && filteredCases.length > 0 && (
          <div className="relative">
            {(() => {
              const current = filteredCases[carouselIndex] || filteredCases[0];
              return (
                <div className="bg-card border border-ink/10 rounded-2xl p-6 md:p-10 shadow-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7">
                      <div className="aspect-[16/10] bg-paper rounded-xl overflow-hidden relative border border-ink/10 shadow-md">
                        <Image
                          src={current.heroImage || current.thumbnail}
                          alt={current.title}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                        {current.category && (
                          <div className="absolute top-4 left-4 bg-ink/85 backdrop-blur-sm border border-paper/10 text-paper font-label text-[10px] tracking-wider uppercase px-3 py-1 rounded">
                            {current.category}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="lg:col-span-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-label text-xs text-accent-ink font-medium">
                            CASE {carouselIndex + 1} OF {filteredCases.length}
                          </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-3">
                          <ScrambleText text={current.title} />
                        </h2>
                        <p className="text-grey-500 text-base leading-relaxed mb-6">
                          {current.tagline}
                        </p>

                        <div className="grid grid-cols-2 gap-4 border-t border-b border-ink/10 py-4 mb-6 text-xs">
                          <div>
                            <span className="font-label text-[10px] text-grey-400 block mb-0.5">TIMELINE</span>
                            <span className="font-medium text-ink">{current.meta.timeline}</span>
                          </div>
                          <div>
                            <span className="font-label text-[10px] text-grey-400 block mb-0.5">MARKET</span>
                            <span className="font-medium text-ink">{current.meta.market}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-8">
                          {current.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-label text-[10px] text-accent-ink border border-accent-ink/20 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-ink/10">
                        <Link
                          href={`/work/${current.slug}`}
                          className="font-sans font-semibold text-xs tracking-wider uppercase bg-accent text-ink px-5 py-2.5 rounded-md hover:bg-accent-hover transition-colors cursor-pointer"
                        >
                          EXPLORE CASE STUDY →
                        </Link>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handlePrev}
                            aria-label="Previous case study"
                            className="w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center hover:border-accent hover:text-accent-ink transition-colors cursor-pointer"
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            onClick={handleNext}
                            aria-label="Next case study"
                            className="w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center hover:border-accent hover:text-accent-ink transition-colors cursor-pointer"
                          >
                            →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
}
