"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { clients } from "@/content/clients";
import { BOOKING_URL } from "@/lib/constants";

export default function HeroConcept1Terminal() {
  const [activeTab, setActiveTab] = useState<"speed" | "attribution" | "margin">("speed");

  const tabs = [
    { id: "speed", label: "FUNNEL VELOCITY" },
    { id: "attribution", label: "PAID ATTRIBUTION" },
    { id: "margin", label: "MARGIN & AUTOMATION" },
  ] as const;

  return (
    <section data-theme="dark" className="relative min-h-screen flex items-center bg-ink text-paper overflow-hidden pt-24 pb-20">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-accent/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="grid-container w-full relative z-10 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Authoritative Copy */}
          <div className="lg:col-span-6">
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2 bg-paper/5 border border-paper/10 px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-label text-[11px] text-paper/80 uppercase tracking-wider">
                Live Client Growth Systems
              </span>
              <span className="text-paper/20">|</span>
              <span className="font-label text-[11px] text-accent">R2M+ Generated</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.05] text-paper">
              Built for stores that outgrow generic agencies.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-paper/70 leading-relaxed max-w-xl">
              We engineer high-converting digital flagships, scale paid acquisition across Meta and Google, and embed intelligent automations that protect your profit margins.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/work" label="EXPLORE VERIFIED SHIPS" />
              <Link
                href={BOOKING_URL}
                className="font-sans font-semibold text-xs tracking-wider uppercase text-paper/80 hover:text-accent border border-paper/20 hover:border-accent px-5 py-3 rounded-md transition-colors"
              >
                REQUEST A 48H AUDIT →
              </Link>
            </div>

            {/* Value Guarantees */}
            <div className="mt-10 pt-8 border-t border-paper/10 grid grid-cols-3 gap-4 text-xs">
              <div>
                <p className="font-label text-accent font-semibold">0.6s SPEED</p>
                <p className="text-paper/50 mt-0.5">Sub-second CWV</p>
              </div>
              <div>
                <p className="font-label text-accent font-semibold">3.8x ROAS</p>
                <p className="text-paper/50 mt-0.5">Average media return</p>
              </div>
              <div>
                <p className="font-label text-accent font-semibold">100% FIXED</p>
                <p className="text-paper/50 mt-0.5">No surprise retainers</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Growth Engine Terminal HUD */}
          <div className="lg:col-span-6">
            <div className="bg-card/40 backdrop-blur-xl border border-paper/15 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Header HUD Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-paper/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                  <span className="font-label text-xs tracking-wider text-paper font-medium">
                    STREAMLINE OS // PERFORMANCE HUD
                  </span>
                </div>
                <span className="font-label text-[10px] text-accent border border-accent/30 bg-accent/10 px-2 py-0.5 rounded">
                  DIAGNOSTIC ENGINE
                </span>
              </div>

              {/* Module Switcher Tabs */}
              <div className="grid grid-cols-3 gap-1.5 my-5 bg-paper/5 p-1 rounded-lg border border-paper/5" role="tablist">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`font-label text-[10px] sm:text-[11px] py-2 px-1 rounded transition-all text-center cursor-pointer ${
                        isActive
                          ? "bg-accent text-ink font-semibold shadow-sm"
                          : "text-paper/60 hover:text-paper"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Module Content */}
              <div className="min-h-[260px] flex flex-col justify-between">
                {activeTab === "speed" && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between bg-paper/5 p-4 rounded-xl border border-paper/5">
                      <div>
                        <p className="font-label text-[10px] text-paper/40">MOBILE PERFORMANCE</p>
                        <p className="text-2xl sm:text-3xl font-medium text-paper mt-0.5">98 / 100</p>
                        <p className="text-xs text-accent mt-1">Google Core Web Vitals Verified</p>
                      </div>
                      <div className="text-right">
                        <p className="font-label text-[10px] text-paper/40">TIME TO INTERACTIVE</p>
                        <p className="text-2xl sm:text-3xl font-medium text-accent mt-0.5">0.64s</p>
                        <p className="text-xs text-paper/50 mt-1">Global average: 3.4s</p>
                      </div>
                    </div>

                    <div className="bg-paper/5 p-4 rounded-xl border border-paper/5 space-y-2.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-paper/70">Checkout Load Speed</span>
                        <span className="font-label text-accent font-semibold">-68% latency</span>
                      </div>
                      <div className="w-full bg-paper/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-accent h-full w-[88%]" />
                      </div>
                      <p className="text-[11px] text-paper/50">
                        Sub-second mobile checkout eliminates drop-offs before payment gateways load.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "attribution" && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between bg-paper/5 p-4 rounded-xl border border-paper/5">
                      <div>
                        <p className="font-label text-[10px] text-paper/40">BLENDED ROAS</p>
                        <p className="text-2xl sm:text-3xl font-medium text-accent mt-0.5">3.8x – 4.2x</p>
                        <p className="text-xs text-paper/50 mt-1">Meta & Google Performance Max</p>
                      </div>
                      <div className="text-right">
                        <p className="font-label text-[10px] text-paper/40">CAPI EVENT MATCH</p>
                        <p className="text-2xl sm:text-3xl font-medium text-paper mt-0.5">9.4 / 10</p>
                        <p className="text-xs text-accent mt-1">Server-side deduplicated</p>
                      </div>
                    </div>

                    <div className="bg-paper/5 p-4 rounded-xl border border-paper/5 space-y-2.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-paper/70">Cost Per Acquisition</span>
                        <span className="font-label text-accent font-semibold">-34% reduction</span>
                      </div>
                      <div className="w-full bg-paper/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-accent h-full w-[76%]" />
                      </div>
                      <p className="text-[11px] text-paper/50">
                        First-party conversion tracking signals algorithmic bidding with real profit data.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "margin" && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between bg-paper/5 p-4 rounded-xl border border-paper/5">
                      <div>
                        <p className="font-label text-[10px] text-paper/40">AI INQUIRY RESOLUTION</p>
                        <p className="text-2xl sm:text-3xl font-medium text-accent mt-0.5">72%</p>
                        <p className="text-xs text-paper/50 mt-1">Resolved without staff</p>
                      </div>
                      <div className="text-right">
                        <p className="font-label text-[10px] text-paper/40">NET MARGIN PROTECTION</p>
                        <p className="text-2xl sm:text-3xl font-medium text-paper mt-0.5">+18.4%</p>
                        <p className="text-xs text-accent mt-1">Automated inventory sync</p>
                      </div>
                    </div>

                    <div className="bg-paper/5 p-4 rounded-xl border border-paper/5 space-y-2.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-paper/70">Weekly Operations Saved</span>
                        <span className="font-label text-accent font-semibold">35+ hours</span>
                      </div>
                      <div className="w-full bg-paper/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-accent h-full w-[92%]" />
                      </div>
                      <p className="text-[11px] text-paper/50">
                        Automations handle order routing, customer questions, and CRM syncing 24/7.
                      </p>
                    </div>
                  </div>
                )}

                {/* Card Live Footer */}
                <div className="pt-4 border-t border-paper/10 mt-4 flex items-center justify-between text-xs text-paper/60">
                  <span>Target Stack: Next.js + Tailwind + CAPI</span>
                  <span className="font-mono text-accent">Active Engine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Logos Strip */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-paper/10 bg-ink/80 backdrop-blur-md">
        <div className="grid-container py-4">
          <div className="flex items-center gap-8 md:gap-12 overflow-x-auto">
            <span className="font-label text-[10px] text-accent tracking-wider uppercase flex-shrink-0">
              TRUSTED BY:
            </span>
            {clients.slice(0, 7).map((client) => (
              <span
                key={client.name}
                className="font-label text-xs text-paper/40 hover:text-paper/80 transition-colors whitespace-nowrap"
              >
                {client.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
