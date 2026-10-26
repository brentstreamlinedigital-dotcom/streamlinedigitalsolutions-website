import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import ScrambleText from "@/components/motion/ScrambleText";
import Odometer from "@/components/motion/Odometer";
import HeroCanvas from "@/components/canvas/HeroCanvas";
import PinnedProcess from "@/components/sections/PinnedProcess";
import StickySelectedWork from "@/components/sections/StickySelectedWork";
import { cases } from "@/content/cases";
import { homeFaq } from "@/content/faq";
import { CONTACT_EMAIL, BOOKING_URL } from "@/lib/constants";

export default function HomePage() {
  const enginePillars = [
    { title: "Conversion-first design.", body: "Every pixel earns its place. Layouts built to sell, not just look good." },
    { title: "AI and automation built in.", body: "We embed intelligent systems from day one, not as an afterthought." },
    { title: "SEO and ads from day one.", body: "Traffic strategy ships with the site. No six-month wait for results." },
    { title: "CRM that closes the loop.", body: "Every lead tracked, scored, and nurtured automatically." },
    { title: "Senior team, AI speed.", body: "No juniors learning on your project. AI handles the repetitive work so humans handle strategy." },
    { title: "Measured in revenue.", body: "We report on money, not vanity metrics." },
  ];

  return (
    <>
      {/* ============================================================
          HERO (dark)
          ============================================================ */}
      <section data-theme="dark" className="relative min-h-screen flex items-center bg-ink text-paper overflow-hidden">
        {/* Subtle atmospheric ambient glow */}
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

      {/* ============================================================
          STATS (light)
          ============================================================ */}
      <section data-theme="light" className="bg-paper text-ink py-24 md:py-32">
        <div className="grid-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Card 1: Studio Flagship Card */}
            <div className="bg-ink text-paper rounded-2xl p-7 flex flex-col justify-between min-h-[260px] border border-paper/10 relative overflow-hidden group shadow-lg hover:border-accent/40 transition-all duration-300">
              {/* Subtle accent glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/15 rounded-full blur-2xl pointer-events-none group-hover:bg-accent/25 transition-colors" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-label text-[10px] uppercase tracking-wider text-accent border border-accent/30 px-2 py-0.5 rounded">
                    STREAMLINE STUDIO
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-label text-paper/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Cape Town
                  </span>
                </div>
                <p className="text-xl md:text-2xl font-medium tracking-tight leading-snug text-paper">
                  Obsessed with conversion and clean code.
                </p>
              </div>

              <div className="relative z-10 pt-6 border-t border-paper/10 mt-6">
                <p className="text-xs text-paper/60 leading-relaxed">
                  Senior engineers, designers, and growth strategists collaborating directly on your build.
                </p>
              </div>
            </div>

            {/* Stat Cards 2, 3, 4: Elevated Cards */}
            {[
              {
                category: "TRAFFIC & REACH",
                badge: "VERIFIED",
                label: "Site visits generated",
                value: "1",
                suffix: "M+",
                suffixClassName: "text-[0.72em] -ml-2 inline-block font-medium",
                prefix: "",
                subtext: "High-intent ecommerce traffic driven through paid acquisition and organic search.",
              },
              {
                category: "MEDIA EFFICIENCY",
                badge: "META & GOOGLE",
                label: "Average ROAS delivered",
                value: "3.4",
                suffix: "x",
                suffixClassName: "",
                prefix: "",
                subtext: "Cross-channel paid media return across Meta, Google Ads, and TikTok.",
              },
              {
                category: "TRACK RECORD",
                badge: "HIGH CONVERTING",
                label: "Projects shipped",
                value: "25",
                suffix: "+",
                suffixClassName: "",
                prefix: "",
                subtext: "High-performance online stores, funnels, and automated CRM pipelines.",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-card border border-ink/[0.08] rounded-2xl p-7 flex flex-col justify-between min-h-[260px] relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg shadow-sm group"
              >
                {/* Top accent bar */}
                <div className="h-0.5 w-8 bg-accent/70 rounded-full group-hover:w-16 transition-all duration-300 mb-5" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-label text-[10px] text-grey-400 uppercase tracking-wider">
                      {stat.category}
                    </span>
                    <span className="font-label text-[9px] text-accent-ink font-medium bg-accent/10 border border-accent/20 px-2 py-0.5 rounded">
                      {stat.badge}
                    </span>
                  </div>

                  <p className="text-4xl md:text-5xl font-medium tracking-tight text-ink mb-1">
                    {stat.prefix && <span className="text-3xl md:text-4xl mr-0.5">{stat.prefix}</span>}
                    <Odometer value={stat.value} suffix={stat.suffix} suffixClassName={stat.suffixClassName} />
                  </p>
                  <p className="text-sm font-medium text-ink/80 mt-1">{stat.label}</p>
                </div>

                <div className="pt-4 border-t border-ink/5 mt-4">
                  <p className="text-xs text-grey-500 leading-relaxed">{stat.subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PROCESS (pinned stepper)
          ============================================================ */}
      <PinnedProcess />

      {/* ============================================================
          SELECTED WORK (dark) - Featured 3 projects
          ============================================================ */}
      <StickySelectedWork
        cases={cases.filter((c) =>
          ["futurama", "camping-fridge", "mymini"].includes(c.slug)
        )}
      />

      {/* ============================================================
          THE ENGINE (light)
          ============================================================ */}
      <section data-theme="light" className="bg-paper text-ink py-24 md:py-32">
        <div className="grid-container">
          <SectionHeading>What makes it work.</SectionHeading>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {enginePillars.map((pillar, i) => (
              <div key={i} className="border-t border-ink/10 pt-6">
                <h3 className="text-lg md:text-xl font-medium mb-3">
                  <ScrambleText text={pillar.title} />
                </h3>
                <p className="text-grey-500 text-sm leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FAQ (dark)
          ============================================================ */}
      <section data-theme="dark" className="bg-ink text-paper py-24 md:py-32">
        <div className="grid-container">
          <SectionHeading>Frequently asked.</SectionHeading>

          <div className="mt-12 max-w-3xl">
            <Accordion items={homeFaq} />
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA (light)
          ============================================================ */}
      <section data-theme="light" className="bg-paper text-ink py-24 md:py-32">
        <div className="grid-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading>Start growing.</SectionHeading>
              <p className="mt-6 text-grey-500 leading-relaxed max-w-md">
                Tell us about your store and where you want to take it. No pitch decks, no jargon, just a straight conversation about growth.
              </p>
              <div className="mt-6 space-y-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="block text-accent-ink hover:text-accent transition-colors text-sm"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div className="mt-8">
                <Button href={BOOKING_URL} label="BOOK A 15-MIN GROWTH CALL" />
              </div>
            </div>

            {/* Interactive Streamline S Particle Logo (clean on white) */}
            <div className="relative aspect-[4/3] min-h-[340px] sm:min-h-[380px] flex items-center justify-center">
              <HeroCanvas theme="light" className="w-full h-full min-h-[320px] sm:min-h-[380px]" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
