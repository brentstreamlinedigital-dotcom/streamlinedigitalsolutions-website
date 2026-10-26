"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { BOOKING_URL } from "@/lib/constants";

export default function HeroConcept3Calculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(60000);
  const [model, setModel] = useState<"ecommerce" | "service" | "b2b">("ecommerce");

  // Multipliers based on business model
  const leakRate = model === "ecommerce" ? 0.085 : model === "service" ? 0.065 : 0.055;
  const adWasteRate = model === "ecommerce" ? 0.045 : 0.035;

  const checkoutLeak = Math.round(monthlyRevenue * leakRate);
  const adWaste = Math.round(monthlyRevenue * adWasteRate);
  const annualUpside = (checkoutLeak + adWaste) * 12;

  return (
    <section data-theme="dark" className="relative min-h-screen flex items-center bg-ink text-paper overflow-hidden pt-24 pb-20">
      {/* Background soft ambient gradient */}
      <div className="absolute top-1/4 left-1/3 w-[800px] h-[500px] bg-accent/8 blur-[180px] rounded-full pointer-events-none" />

      <div className="grid-container w-full relative z-10 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Direct-Response Positioning */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 bg-paper/5 border border-paper/10 px-3.5 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-label text-xs text-accent font-semibold tracking-wider">
                PROFIT PROTECTION & SCALE
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.05] text-paper">
              Stop leaking margin on basic store setups.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-paper/70 max-w-lg leading-relaxed">
              Most online stores lose 25% to 40% of their net revenue to slow mobile checkouts, untracked ad pixels, and manual operations. We diagnose and plug your leaks in 48 hours.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={BOOKING_URL} label="BOOK A 48H GROWTH AUDIT" />
              <Link
                href="/work"
                className="font-label text-xs text-paper/80 hover:text-accent border border-paper/20 hover:border-accent px-5 py-3 rounded-md transition-colors tracking-wider"
              >
                SEE CLIENT CASE STUDIES →
              </Link>
            </div>

            {/* Checklist Proof */}
            <div className="mt-10 space-y-2.5 text-xs text-paper/70">
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>Within 2 business days you get your 3 biggest revenue leaks prioritized.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>Zero sales pressure. You leave with the audit, timeline, and exact roadmap.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Revenue Leak Simulator */}
          <div className="lg:col-span-6">
            <div className="bg-card/50 backdrop-blur-xl border border-paper/15 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-5 border-b border-paper/10">
                <div>
                  <span className="font-label text-[10px] text-accent tracking-wider uppercase block">
                    INTERACTIVE TOOL
                  </span>
                  <h3 className="text-lg font-medium text-paper mt-0.5">
                    Revenue Leak Simulator
                  </h3>
                </div>
                <span className="font-label text-[10px] text-paper/40 bg-paper/5 px-2.5 py-1 rounded">
                  ESTIMATOR
                </span>
              </div>

              {/* Model Selectors */}
              <div className="mt-6">
                <label className="font-label text-[10px] text-paper/50 block mb-2 uppercase">
                  Select Business Model
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "ecommerce", label: "E-Commerce" },
                    { id: "service", label: "High-Ticket" },
                    { id: "b2b", label: "SaaS / B2B" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setModel(m.id as any)}
                      className={`font-label text-xs py-2 px-2 rounded border transition-colors cursor-pointer ${
                        model === m.id
                          ? "bg-accent text-ink border-accent font-semibold"
                          : "border-paper/10 text-paper/60 hover:text-paper bg-paper/5"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Revenue Slider */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-label text-[10px] text-paper/50 uppercase">
                    Monthly Revenue
                  </label>
                  <span className="text-xl font-medium text-paper font-mono">
                    ${monthlyRevenue.toLocaleString()} <span className="text-xs text-paper/40 font-normal">/mo</span>
                  </span>
                </div>
                <input
                  type="range"
                  min={15000}
                  max={250000}
                  step={5000}
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full accent-[#01CED1] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-label text-paper/30 mt-1">
                  <span>$15K/mo</span>
                  <span>$125K/mo</span>
                  <span>$250K+/mo</span>
                </div>
              </div>

              {/* Calculated Leaks Breakdown */}
              <div className="mt-6 pt-5 border-t border-paper/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-paper/70">Mobile Checkout Friction Loss:</span>
                  <span className="font-mono text-red-400 font-medium">-${checkoutLeak.toLocaleString()}/mo</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-paper/70">Untracked / Misattributed Ad Waste:</span>
                  <span className="font-mono text-amber-400 font-medium">-${adWaste.toLocaleString()}/mo</span>
                </div>

                <div className="bg-accent/10 border border-accent/25 rounded-xl p-4 mt-4 flex items-center justify-between">
                  <div>
                    <span className="font-label text-[10px] text-accent block uppercase">
                      Recoverable Annual Upside
                    </span>
                    <span className="text-2xl sm:text-3xl font-medium text-accent font-mono">
                      +${annualUpside.toLocaleString()}
                    </span>
                  </div>
                  <Link
                    href={BOOKING_URL}
                    className="font-sans font-semibold text-xs tracking-wider uppercase bg-accent text-ink px-4 py-2.5 rounded hover:bg-accent-hover transition-colors"
                  >
                    PLUG LEAKS →
                  </Link>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-[11px] text-paper/40">
                  Based on benchmark telemetry across 50+ audited Shopify and custom store funnels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
