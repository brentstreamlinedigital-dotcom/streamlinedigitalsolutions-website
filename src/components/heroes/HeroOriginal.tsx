"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import HeroCanvas from "@/components/canvas/HeroCanvas";
import { clients } from "@/content/clients";
import { BOOKING_URL } from "@/lib/constants";

export default function HeroOriginal() {
  return (
    <section data-theme="dark" className="relative min-h-screen flex items-center bg-ink text-paper overflow-hidden">
      {/* Atmospheric ambient glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid-container w-full pt-28 pb-20 md:py-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Copy & Value Proposition */}
          <div className="relative z-10 max-w-xl">
            {/* Agency Status Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-paper/5 border border-paper/10 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-sans text-xs tracking-wider uppercase text-paper/80">
                Streamline Digital Solutions
              </span>
              <span className="text-paper/20">&bull;</span>
              <span className="font-sans text-xs text-accent">
                Cape Town &amp; Global
              </span>
            </div>

            {/* Elevated Headline with Sequential Reading-Order Shimmer */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.14]">
              <span className="headline-sweep-line1 inline-block">
                The ecommerce
              </span>
              <br />
              <span className="headline-sweep-line2 inline-block pb-1.5">
                growth engine.
              </span>
            </h1>

            {/* Body Copy */}
            <p className="mt-6 text-lg md:text-xl text-paper/70 max-w-lg leading-relaxed font-light">
              We build, market and automate online stores. AI does the heavy lifting, you keep the margin.
            </p>

            {/* Action Button */}
            <div className="mt-8 flex items-center">
              <Button href="/work" label="SEE THE RESULTS" />
            </div>
          </div>

          {/* Right: Exact Streamline Logo Particle Canvas */}
          <div className="relative h-[420px] sm:h-[480px] md:h-[520px] lg:h-[600px] flex items-center justify-center">
            <HeroCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}
