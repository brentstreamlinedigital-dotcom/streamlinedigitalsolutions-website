"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface OdometerProps {
  value: string;
  suffix?: string;
  suffixClassName?: string;
  className?: string;
}

/**
 * Per-digit vertical roll odometer effect.
 * Each digit column rolls 0-9 into place on viewport enter.
 */
export default function Odometer({
  value,
  suffix = "",
  suffixClassName = "",
  className = "",
}: OdometerProps) {
  const ref = useRef<HTMLSpanElement>(null);
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
  const chars = value.split("");

  return (
    <span ref={ref} className={`inline-flex items-baseline tabular-nums ${className}`}>
      {chars.map((char, i) => {
        const isDigit = /\d/.test(char);

        if (!isDigit) {
          return (
            <span key={i} className="inline-block">
              {char}
            </span>
          );
        }

        const digit = parseInt(char, 10);

        return (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ height: "1em" }}
          >
            <span
              className="inline-flex flex-col transition-transform duration-1000"
              style={{
                transform: show ? `translateY(-${digit * 10}%)` : "translateY(0%)",
                transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <span key={n} className="block h-[1em] leading-[1em]">
                  {n}
                </span>
              ))}
            </span>
          </span>
        );
      })}
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </span>
  );
}
