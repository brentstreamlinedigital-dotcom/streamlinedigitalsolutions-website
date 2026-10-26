import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeading from "@/components/ui/SectionHeading";
import Odometer from "@/components/motion/Odometer";
import ScrambleText from "@/components/motion/ScrambleText";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/constants";
import HeroCanvas from "@/components/canvas/HeroCanvas";

export const metadata: Metadata = {
  title: "About",
  description:
    "Built in Cape Town. Scaling stores worldwide. Meet the team behind Streamline Digital Solutions.",
};

export default function AboutPage() {
  const principles = [
    { title: "Senior team only.", body: "No juniors learning on your project. Every person on your account has shipped production work before." },
    { title: "AI speed, human strategy.", body: "AI handles the repetitive work. Humans make the decisions that matter." },
    { title: "No lock-in contracts.", body: "Stay because the results are good, not because a contract says you have to." },
    { title: "Unlimited revisions in scope.", body: "We do not charge extra for getting it right. Revisions are part of the process." },
    { title: "Flag every leak.", body: "If we see a problem, even one you did not ask us to look at, we tell you." },
    { title: "Upfront pricing.", body: "You know the cost before we start. No surprise invoices, no scope creep without a conversation." },
    { title: "Measured in revenue.", body: "We report on money. If our work does not move your bottom line, we are not doing our job." },
    { title: "Say no to bad fits.", body: "If we are not the right team for your project, we will tell you and point you somewhere better." },
  ];

  return (
    <>
      {/* Hero */}
      <section data-theme="dark" className="bg-ink text-paper pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="grid-container">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05] max-w-5xl">
            Built in Cape Town.
            <br />
            Scaling stores worldwide.
          </h1>
        </div>
      </section>

      {/* The story & S Particle Canvas */}
      <section data-theme="light" className="bg-paper text-ink pt-12 pb-24 md:pt-16 md:pb-32">
        <div className="grid-container">
          {/* S Logo Particle Canvas (Clean on white, no black box, no corner artifacts) */}
          <div className="relative w-full max-w-3xl mx-auto h-[280px] sm:h-[340px] flex items-center justify-center mb-16">
            <HeroCanvas theme="light" className="w-full h-full" />
          </div>

          <Eyebrow label="THE STORY" />
          <SectionHeading>Why we built Streamline.</SectionHeading>

          <div className="mt-12 max-w-3xl">
            <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
              Streamline started with a simple observation: most ecommerce brands pay for tools, agencies, and freelancers that do not talk to each other.
            </p>
            <div className="space-y-6 text-grey-700 leading-relaxed">
              <p>
                Ads run without knowing what SEO is doing. The CRM does not feed back into the ad platform. The website looks great but does not convert. And nobody is measuring what actually matters: revenue.
              </p>
              <p>
                We built Streamline to be the opposite. One team that handles web, ads, SEO, CRM, automations, and AI, all connected, all measured against the same number. We use AI to handle the repetitive work, so our senior team can focus on the decisions that move your margin.
              </p>
              <p>
                Based in Cape Town, working with stores worldwide. No pitch decks, no jargon, no vanity metrics. Just growth, measured in money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Founder Introduction */}
      <section data-theme="light" className="bg-paper text-ink pb-24">
        <div className="grid-container">
          <Eyebrow label="LEADERSHIP" />
          <SectionHeading>The mind behind the engine.</SectionHeading>

          <div className="mt-12 p-8 sm:p-12 rounded-2xl bg-card border border-ink/10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Founder Portrait Container with Brent Mortimer Photo */}
            <div className="lg:col-span-4">
              <div className="relative aspect-[3/4] max-w-sm rounded-2xl overflow-hidden bg-ink border border-ink/10 shadow-xl group">
                <Image
                  src="/brent-mortimer.jpg"
                  alt="Brent Mortimer - Founder & Technical Director"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/20 pointer-events-none" />
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="font-mono text-[10px] text-paper/90 tracking-wider uppercase bg-ink/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-paper/10">
                    FOUNDER PROFILE
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-mono text-paper/80 bg-ink/60 backdrop-blur-md px-3 py-2 rounded-lg border border-paper/10">
                  <span className="font-medium text-paper">BRENT MORTIMER</span>
                  <span className="text-accent">CAPE TOWN, ZA</span>
                </div>
              </div>
            </div>

            {/* Right: Founder Introduction Copy */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="font-mono text-xs text-accent-ink font-semibold tracking-wider uppercase">
                  FOUNDER & TECHNICAL DIRECTOR
                </span>
                <h3 className="text-3xl sm:text-4xl font-medium tracking-tight text-ink mt-1">
                  Brent Mortimer
                </h3>
              </div>

              <div className="space-y-4 text-grey-700 text-base sm:text-lg leading-relaxed">
                <p>
                  I founded Streamline Digital Solutions because I saw firsthand how much margin DTC ecommerce brands burn on disconnected agencies and fragmented tools. One team builds a site that looks beautiful in mockups but loads like molasses on mobile. Another team runs paid ads that bring traffic, but never look at why 98% of users bounce.
                </p>
                <p>
                  At Streamline, we engineer the complete ecosystem as one connected machine: custom sub-second Shopify Plus and Next.js frontends, deterministic CAPI and pixel tracking, and autonomous AI workflows that automate the busywork so you keep the margin.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-ink/5 border-l-4 border-accent text-sm text-grey-700 italic">
                &ldquo;We don&apos;t build stores to win agency vanity awards. We build digital flagships engineered to print revenue.&rdquo;
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button href={BOOKING_URL} label="BOOK A STRATEGY CALL" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="px-6 py-3 rounded-lg border border-ink/20 hover:border-accent text-xs font-sans font-semibold tracking-wider uppercase text-ink hover:text-accent-ink transition-colors"
                >
                  Direct Email &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section data-theme="dark" className="bg-ink text-paper py-24 md:py-32">
        <div className="grid-container">
          <Eyebrow label="HOW WE WORK" className="text-accent" />
          <SectionHeading>Eight principles.</SectionHeading>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((p, i) => (
              <div key={i} className="border-t border-paper/10 pt-6">
                <h3 className="text-base font-medium mb-2">
                  <ScrambleText text={p.title} />
                </h3>
                <p className="text-sm text-paper/50 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section data-theme="light" className="bg-paper text-ink py-24">
        <div className="grid-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { label: "Site visits generated", value: "1", suffix: "M+", suffixClassName: "text-[0.72em] -ml-2 inline-block font-medium" },
              { label: "Average ROAS delivered", value: "3.4", suffix: "x", suffixClassName: "" },
              { label: "Projects shipped", value: "25", suffix: "+", suffixClassName: "" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-4xl md:text-5xl font-medium tracking-tight">
                  <Odometer value={stat.value} suffix={stat.suffix} suffixClassName={stat.suffixClassName} />
                </p>
                <p className="text-sm text-grey-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
          {/* [CONFIRM] real stats */}
        </div>
      </section>

      {/* CTA */}
      <section data-theme="light" className="bg-paper text-ink pb-24">
        <div className="grid-container text-center">
          <SectionHeading>Let us grow your store.</SectionHeading>
          <div className="mt-8">
            <Button href={BOOKING_URL} label="BOOK A GROWTH CALL" />
          </div>
        </div>
      </section>
    </>
  );
}
