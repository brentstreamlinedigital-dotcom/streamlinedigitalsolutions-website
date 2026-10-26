"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrambleText from "@/components/motion/ScrambleText";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverableTitle: string;
  phaseBadge: string;
  turnaround: string;
  items: {
    heading: string;
    detail: string;
  }[];
  takeaway: string;
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Growth audit.",
    description:
      "Send your store URL. Within two business days you get your three biggest revenue leaks.",
    deliverableTitle: "Full-Funnel Growth Diagnostic",
    phaseBadge: "Phase 01 Deliverable",
    turnaround: "48-Hour Turnaround",
    items: [
      {
        heading: "Checkout & Conversion Friction",
        detail: "Pinpoint exact cart drop-off points, mobile barriers, and missed average order value opportunities.",
      },
      {
        heading: "Speed & Core Web Vitals",
        detail: "Audit mobile load speeds, heavy third-party scripts, and layout shifts hurting Google rankings.",
      },
      {
        heading: "Tracking & Pixel Attribution",
        detail: "Verify Meta CAPI, Google Analytics 4, and server-side tracking to plug ad spend leakage.",
      },
    ],
    takeaway: "3 highest-leverage revenue leaks prioritized with exact fix protocols.",
  },
  {
    number: "02",
    title: "Strategy call.",
    description:
      "One call. You leave with the plan, the timeline and the cost.",
    deliverableTitle: "Commercial Architecture & Plan",
    phaseBadge: "Phase 02 Deliverable",
    turnaround: "Single Alignment Session",
    items: [
      {
        heading: "Technical Stack Blueprint",
        detail: "Determine the exact framework, integrations, and automation tools tailored for your scale.",
      },
      {
        heading: "Fixed-Milestone Timeline",
        detail: "Clear delivery calendar mapping every phase from sprint kickoff to final launch day.",
      },
      {
        heading: "Guaranteed Upfront Investment",
        detail: "Transparent fixed-fee pricing with zero surprise retainers or hidden scope creep.",
      },
    ],
    takeaway: "Complete sprint architecture, delivery calendar, and exact pricing in hand.",
  },
  {
    number: "03",
    title: "Build and launch.",
    description:
      "Design, dev, tracking and automations shipped together.",
    deliverableTitle: "Integrated Production Deployment",
    phaseBadge: "Phase 03 Deliverable",
    turnaround: "Full-Stack Sprint",
    items: [
      {
        heading: "High-Performance Next.js & Tailwind",
        detail: "Custom components engineered for sub-second mobile page loads and smooth user journeys.",
      },
      {
        heading: "Complete Measurement Layer",
        detail: "Enhanced conversion tracking, server-side events, and CRM synchronization tested and live.",
      },
      {
        heading: "Lead & Checkout Automations",
        detail: "Post-purchase flows, abandon recovery, and instant lead notification pipelines active.",
      },
    ],
    takeaway: "Design, development, tracking, and automation launched as one unified engine.",
  },
  {
    number: "04",
    title: "Scale.",
    description:
      "Monthly optimisation sprints across ads, SEO and CRO.",
    deliverableTitle: "Continuous Optimization Engine",
    phaseBadge: "Phase 04 Deliverable",
    turnaround: "Bi-Weekly Sprints",
    items: [
      {
        heading: "Paid Acquisition Iterations",
        detail: "Rapid Meta and Google ad creative testing loops focused strictly on profitable ROAS.",
      },
      {
        heading: "CRO & Heatmap Experiments",
        detail: "Continuous landing page A/B tests to systematically lift visitor-to-customer conversion rates.",
      },
      {
        heading: "Executive Revenue Reporting",
        detail: "Live performance dashboard tracking verified cash flow and margin, not vanity traffic.",
      },
    ],
    takeaway: "Data-driven iterations compounding revenue gains month over month.",
  },
];

export default function PinnedProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${steps.length * 500}`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(
            Math.floor(progress * steps.length),
            steps.length - 1
          );
          setActiveStep(index);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const current = steps[activeStep];

  return (
    <section
      data-theme="light"
      ref={containerRef}
      className="bg-paper text-ink min-h-screen flex items-center py-20 lg:py-0 border-t border-ink/5"
    >
      <div className="grid-container w-full">
        <SectionHeading>How we work.</SectionHeading>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left: Steps List */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8">
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(i)}
                  className={`cursor-pointer border-l-2 pl-6 py-2 transition-all duration-300 ${
                    isActive
                      ? "border-accent opacity-100 translate-x-2"
                      : "border-ink/10 opacity-40 hover:opacity-70"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-label text-xs text-accent-ink font-semibold">
                      {step.number}
                    </span>
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight">
                      {isActive ? <ScrambleText text={step.title} /> : step.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm md:text-base text-grey-500 max-w-md leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Elevated Deliverable Preview Card */}
          <div className="lg:col-span-7">
            <div className="bg-card border border-ink/[0.08] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-7 md:p-9 flex flex-col justify-between min-h-[460px] relative overflow-hidden transition-all duration-500">
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent to-accent/20" />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-end pb-4 border-b border-ink/10">
                  <span className="font-label text-xs text-grey-500 bg-ink/5 border border-ink/5 px-3 py-1 rounded-full">
                    {current.turnaround}
                  </span>
                </div>

                {/* Deliverable Title */}
                <div className="mt-5 mb-6">
                  <h4 className="text-2xl md:text-3xl font-medium tracking-tight text-ink">
                    {current.deliverableTitle}
                  </h4>
                </div>

                {/* Structured Deliverable Items */}
                <div className="space-y-4">
                  {current.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 bg-paper/60 border border-ink/[0.04] rounded-xl p-3.5 transition-all duration-200 hover:border-accent/30"
                    >
                      <div className="w-5 h-5 rounded-full bg-accent/20 text-accent-ink flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink leading-snug">
                          {item.heading}
                        </p>
                        <p className="text-xs text-grey-500 mt-1 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Outcome Summary Bar */}
              <div className="mt-6 pt-5 border-t border-ink/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-grey-600">
                  <span className="font-label text-[10px] text-accent-ink uppercase tracking-wider font-semibold">
                    OUTCOME:
                  </span>
                  <span className="font-medium text-ink line-clamp-1">{current.takeaway}</span>
                </div>
                <div className="flex items-center gap-1.5 font-label text-[11px] text-accent-ink font-medium whitespace-nowrap self-end sm:self-auto">
                  <span>STEP {current.number} OF 04</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
