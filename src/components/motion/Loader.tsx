"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Loader() {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = sessionStorage.getItem("streamline_loader_seen");
    if (seen || reducedMotion) {
      return;
    }

    setVisible(true);

    const timer = setTimeout(() => {
      setAnimating(false);
      setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("streamline_loader_seen", "true");
      }, 350);
    }, 1100);

    return () => clearTimeout(timer);
  }, [reducedMotion]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink transition-opacity duration-300 ${
        animating ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden="true"
    >
      <div className="relative w-24 h-24 sm:w-28 sm:h-28">
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M44 12C44 12 36 12 32 20C28 28 20 28 20 28"
            stroke="#01CED1"
            strokeWidth="5"
            strokeLinecap="round"
            className="loader-stroke loader-stroke-1"
          />
          <path
            d="M20 28C20 28 28 28 32 36C36 44 44 44 44 36"
            stroke="#01CED1"
            strokeWidth="5"
            strokeLinecap="round"
            className="loader-stroke loader-stroke-2"
          />
          <path
            d="M44 36C44 36 36 36 32 44C28 52 20 52 20 52"
            stroke="#01CED1"
            strokeWidth="5"
            strokeLinecap="round"
            className="loader-stroke loader-stroke-3"
          />
        </svg>
      </div>
      <p className="font-label text-[11px] tracking-widest text-accent mt-4 animate-pulse">
        STREAMLINE
      </p>
    </div>
  );
}
