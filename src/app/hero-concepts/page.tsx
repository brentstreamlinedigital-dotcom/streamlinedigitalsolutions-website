"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import HeroOriginal from "@/components/heroes/HeroOriginal";
import HeroConcept1Terminal from "@/components/heroes/HeroConcept1Terminal";
import HeroConcept2Editorial from "@/components/heroes/HeroConcept2Editorial";
import HeroConcept3Calculator from "@/components/heroes/HeroConcept3Calculator";

type ConceptId = "concept1" | "concept2" | "concept3" | "original";

function HeroConceptsContent() {
  const searchParams = useSearchParams();
  const initialConcept = (searchParams.get("concept") as ConceptId) || "concept1";
  
  const [selectedConcept, setSelectedConcept] = useState<ConceptId>(initialConcept);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    const param = searchParams.get("concept") as ConceptId;
    if (param && ["concept1", "concept2", "concept3", "original"].includes(param)) {
      setSelectedConcept(param);
    }
  }, [searchParams]);

  const concepts = [
    {
      id: "concept1" as const,
      name: "Concept 1: Precision HUD",
      tagline: "Cinematic High-Tech & Live Performance Telemetry",
      description:
        "Pairs an authoritative positioning headline with an interactive Glassmorphic Growth HUD on the right. Visitors can toggle between Funnel Speed, Paid Attribution, and AI Margin Engine to see live benchmarks.",
      strengths: [
        "Instantly proves technical & growth credibility",
        "Interactive tabs keep visitors engaged in the first 10 seconds",
        "Positions Streamline as an engineering powerhouse rather than a basic design shop",
      ],
    },
    {
      id: "concept2" as const,
      name: "Concept 2: Kinetic Editorial",
      tagline: "Awwwards-Level Studio Typography & 3D Project Cascade",
      description:
        "Massive, tight editorial typography ('ENGINEERED TO CONVERT') accompanied by a layered, interactive cascading deck of real showcase projects. Clicking shuffles between The Old Homestead, Graft Dubai, and Sorted.",
      strengths: [
        "Puts real verified client work front-and-center immediately",
        "Tactile, interactive card shuffling feels bespoke and prestigious",
        "Extreme visual polish that makes clients want their own site built by Streamline",
      ],
    },
    {
      id: "concept3" as const,
      name: "Concept 3: Revenue Simulator",
      tagline: "Direct-Response Utility & Instant ROI Estimator",
      description:
        "Direct-response headline ('Stop leaking margin on basic store setups') paired with an interactive Revenue Leak Simulator. Store owners drag their monthly revenue to calculate what checkout friction and tracking errors cost them.",
      strengths: [
        "Unbeatable conversion pull for skeptical store owners",
        "Quantifies monetary loss and frames the 48h audit as an immediate no-brainer",
        "Interactive slider creates instant gamification and engagement",
      ],
    },
    {
      id: "original" as const,
      name: "Current: Original Hero",
      tagline: "The existing dot-matrix canvas hero",
      description:
        "The current homepage hero with the Streamline 'S' particle dot-matrix canvas and two-column layout.",
      strengths: [
        "Currently live on the homepage",
        "Generates dynamic canvas particles",
      ],
    },
  ];

  const activeConceptData = concepts.find((c) => c.id === selectedConcept) || concepts[0];

  return (
    <div className="min-h-screen bg-ink text-paper">
      {/* Floating Control Bar at Top */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <div className="bg-ink/95 backdrop-blur-xl border border-paper/20 rounded-2xl p-2.5 shadow-2xl flex flex-wrap items-center justify-between gap-3">
          {/* Concept Switcher Pills */}
          <div className="flex flex-wrap items-center gap-1.5" role="tablist">
            {concepts.map((c) => {
              const isActive = selectedConcept === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedConcept(c.id)}
                  className={`font-label text-xs px-3.5 py-2 rounded-lg border transition-all cursor-pointer ${
                    isActive
                      ? "bg-accent text-ink border-accent font-semibold shadow-md"
                      : "border-paper/10 text-paper/70 hover:text-paper hover:border-paper/30 bg-paper/5"
                  }`}
                >
                  {c.name.split(":")[1] || c.name}
                </button>
              );
            })}
          </div>

          {/* Actions: Notes Toggle & Home Link */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowNotes(!showNotes)}
              className={`font-label text-[11px] px-3 py-1.5 rounded border transition-colors cursor-pointer ${
                showNotes
                  ? "bg-paper text-ink border-paper font-medium"
                  : "border-paper/15 text-paper/60 hover:text-paper"
              }`}
            >
              {showNotes ? "HIDE NOTES" : "DESIGN NOTES"}
            </button>
            <Link
              href="/"
              className="font-label text-[11px] text-paper/60 hover:text-accent px-2 py-1.5 transition-colors"
            >
              EXIT ✕
            </Link>
          </div>
        </div>
      </div>

      {/* Design Notes Drawer if Toggled */}
      {showNotes && (
        <div className="fixed top-36 left-1/2 -translate-x-1/2 z-40 w-full max-w-4xl px-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-card border border-paper/20 rounded-2xl p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label text-xs text-accent font-semibold">
                DESIGN DIRECTION // {activeConceptData.name.toUpperCase()}
              </span>
              <span className="font-label text-[10px] text-paper/40">
                ACTIVE LAB PREVIEW
              </span>
            </div>
            <h3 className="text-xl font-medium text-paper mb-1">
              {activeConceptData.tagline}
            </h3>
            <p className="text-sm text-paper/70 leading-relaxed mb-4">
              {activeConceptData.description}
            </p>

            <div className="border-t border-paper/10 pt-4">
              <p className="font-label text-[10px] text-accent tracking-wider uppercase mb-2">
                STRATEGIC ADVANTAGES:
              </p>
              <ul className="space-y-1.5">
                {activeConceptData.strengths.map((s, i) => (
                  <li key={i} className="text-xs text-paper/80 flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Render Selected Hero Fullscreen */}
      <div className="min-h-screen">
        {selectedConcept === "concept1" && <HeroConcept1Terminal />}
        {selectedConcept === "concept2" && <HeroConcept2Editorial />}
        {selectedConcept === "concept3" && <HeroConcept3Calculator />}
        {selectedConcept === "original" && <HeroOriginal />}
      </div>
    </div>
  );
}

export default function HeroConceptsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink text-paper flex items-center justify-center font-label text-xs text-accent">LOADING HERO LAB...</div>}>
      <HeroConceptsContent />
    </Suspense>
  );
}
