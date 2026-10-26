"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { BOOKING_URL } from "@/lib/constants";

export default function HeroConcept2Editorial() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const showcaseProjects = [
    {
      title: "The Old Homestead",
      market: "Manhattan, New York",
      metric: "+48% Online Reservations",
      image: "/showcase/old-homestead.webp",
      slug: "old-homestead",
      tag: "FLAGSHIP WEB",
    },
    {
      title: "Graft Hybrid Training",
      market: "Dubai, UAE",
      metric: "3.8x Meta Return On Ad Spend",
      image: "/showcase/graft.webp",
      slug: "graft",
      tag: "PERFORMANCE ACQUISITION",
    },
    {
      title: "Sorted",
      market: "PropTech SaaS",
      metric: "99.2% Automated Rent Collection",
      image: "/showcase/sorted.webp",
      slug: "sorted",
      tag: "CUSTOM PRODUCT",
    },
  ];

  const handleNextProject = () => {
    setActiveProjectIndex((prev) => (prev + 1) % showcaseProjects.length);
  };

  const currentProject = showcaseProjects[activeProjectIndex];

  return (
    <section data-theme="dark" className="relative min-h-screen flex items-center bg-ink text-paper overflow-hidden pt-24 pb-20">
      {/* Background subtle mesh glow */}
      <div className="absolute -top-32 right-0 w-[600px] h-[600px] bg-accent/8 blur-[160px] rounded-full pointer-events-none" />

      <div className="grid-container w-full relative z-10 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Bold Typography & Editorial Manifesto */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-label text-xs text-accent tracking-widest uppercase">
                CAPE TOWN // WORLDWIDE CLIENTS
              </span>
              <span className="text-paper/20">•</span>
              <span className="font-label text-xs text-paper/40">NEXT.JS 16 APPS</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.98] text-paper">
              Engineered
              <br />
              to convert.
            </h1>

            <p className="mt-8 text-lg md:text-xl text-paper/70 max-w-lg leading-relaxed font-light">
              We design digital flagships, scale paid acquisition, and deploy automation for brands ready to outpace generic competitors.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/work" label="VIEW SELECTED WORK" />
              <Link
                href={BOOKING_URL}
                className="font-sans font-semibold text-xs tracking-wider uppercase text-accent hover:text-accent-hover transition-colors underline underline-offset-8 decoration-accent/40 hover:decoration-accent"
              >
                BOOK A STRATEGY CALL →
              </Link>
            </div>

            {/* Micro Tags */}
            <div className="mt-12 flex flex-wrap items-center gap-2">
              {["SUB-SECOND LOAD", "SERVER-SIDE CAPI", "AI AUTOMATIONS", "WCAG 2.1 AA"].map((tag) => (
                <span
                  key={tag}
                  className="font-label text-[10px] text-paper/40 border border-paper/10 px-2.5 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Cascading 3D Floating Project Showcase */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            {/* Interactive Stack Deck */}
            <div className="relative w-full max-w-lg aspect-[16/11] cursor-pointer" onClick={handleNextProject}>
              {showcaseProjects.map((project, idx) => {
                // Calculate position relative to active index
                const offset = (idx - activeProjectIndex + showcaseProjects.length) % showcaseProjects.length;
                
                // Active top card
                if (offset === 0) {
                  return (
                    <div
                      key={project.slug}
                      className="absolute inset-0 z-30 transition-all duration-500 ease-out transform translate-y-0 rotate-0 scale-100 shadow-2xl rounded-2xl overflow-hidden border border-paper/20 bg-card group"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                      
                      <div className="absolute top-4 left-4 bg-ink/90 backdrop-blur-md border border-paper/10 font-label text-[10px] text-accent px-3 py-1 rounded">
                        {project.tag}
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          <p className="font-label text-[10px] text-paper/60 uppercase">{project.market}</p>
                          <h3 className="text-xl md:text-2xl font-medium text-paper">{project.title}</h3>
                          <p className="font-label text-xs text-accent mt-0.5">{project.metric}</p>
                        </div>
                        <span className="bg-paper text-ink font-label text-[11px] px-3 py-1.5 rounded font-medium shadow-md">
                          NEXT →
                        </span>
                      </div>
                    </div>
                  );
                }

                // 2nd layered card behind
                if (offset === 1) {
                  return (
                    <div
                      key={project.slug}
                      className="absolute inset-0 z-20 transition-all duration-500 ease-out transform translate-y-4 rotate-2 scale-[0.96] opacity-60 rounded-2xl overflow-hidden border border-paper/10 bg-card/60 shadow-xl pointer-events-none"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  );
                }

                // 3rd layered card deep behind
                return (
                  <div
                    key={project.slug}
                    className="absolute inset-0 z-10 transition-all duration-500 ease-out transform translate-y-8 rotate-4 scale-[0.92] opacity-30 rounded-2xl overflow-hidden border border-paper/5 bg-card/40 shadow-lg pointer-events-none"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                );
              })}
            </div>

            {/* Deck Controls */}
            <div className="w-full max-w-lg mt-6 flex items-center justify-between text-xs text-paper/60 px-2">
              <span className="font-label text-[11px]">
                FEATURED WORK {activeProjectIndex + 1} OF {showcaseProjects.length}
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href={`/work/${currentProject.slug}`}
                  className="font-label text-accent hover:underline text-[11px]"
                >
                  READ CASE STUDY ↗
                </Link>
                <button
                  type="button"
                  onClick={handleNextProject}
                  className="font-label text-[10px] bg-paper/10 hover:bg-paper/20 text-paper px-3 py-1 rounded transition-colors cursor-pointer"
                >
                  CLICK TO SHUFFLE ⟳
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
