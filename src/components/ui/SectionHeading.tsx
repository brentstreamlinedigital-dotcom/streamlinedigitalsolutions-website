"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SectionHeadingProps {
  children: string;
  as?: "h2" | "h3";
  className?: string;
}

/**
 * Section heading with:
 * 1. A teal bar that stretches then collapses into an underline on enter
 * 2. A blinking teal caret after the last letter
 *
 * Uses IntersectionObserver for enter detection.
 * Falls back to static rendering when prefers-reduced-motion is active.
 */
export default function SectionHeading({
  children,
  as: Tag = "h2",
  className = "",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const show = reducedMotion || isVisible;

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Teal bar animation */}
      <div
        className="absolute left-0 bottom-0 h-[2px] bg-accent origin-left transition-transform duration-700"
        style={{
          transform: show ? "scaleX(1)" : "scaleX(0)",
          transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      />

      <Tag className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight pb-2 inline">
        {children}
        {/* Blinking caret */}
        <span
          className="caret-blink inline-block w-[3px] h-[0.8em] bg-accent ml-1 align-middle"
          aria-hidden="true"
        />
      </Tag>
    </div>
  );
}
