"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** Duration in ms. Default 600. */
  duration?: number;
  /** Trigger on viewport enter. Default true. */
  triggerOnView?: boolean;
}

const GLYPHS = "0123456789$%+";

/**
 * Text scramble effect: random glyphs from "0123456789$%+" resolve
 * left to right over 600ms. Gives a "data" feel per the brief.
 */
export default function ScrambleText({
  text,
  className = "",
  duration = 600,
  triggerOnView = true,
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);
  const reducedMotion = useReducedMotion();

  const scramble = useCallback(() => {
    if (hasAnimated || reducedMotion) return;
    setHasAnimated(true);

    const chars = text.split("");
    const totalChars = chars.length;
    const stepDuration = duration / totalChars;
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex > totalChars) {
        clearInterval(interval);
        setDisplay(text);
        return;
      }

      const resolved = text.slice(0, currentIndex);
      const scrambled = chars
        .slice(currentIndex)
        .map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
        .join("");

      setDisplay(resolved + scrambled);
    }, stepDuration);

    return () => clearInterval(interval);
  }, [text, duration, hasAnimated, reducedMotion]);

  useEffect(() => {
    if (!triggerOnView || reducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scramble();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnView, scramble, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
