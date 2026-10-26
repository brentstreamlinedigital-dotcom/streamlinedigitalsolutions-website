"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function RouteTransition() {
  const pathname = usePathname();
  const [isWiping, setIsWiping] = useState(false);
  const firstRender = useRef(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Skip on initial page mount
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (reducedMotion) return;

    setIsWiping(true);
    const timer = setTimeout(() => {
      setIsWiping(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname, reducedMotion]);

  return (
    <div
      className={`fixed inset-0 z-[90] pointer-events-none overflow-hidden transition-opacity duration-300 ${
        isWiping && !reducedMotion ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {isWiping && !reducedMotion && (
        <div className="absolute inset-0 bg-accent route-wipe-panel" />
      )}
    </div>
  );
}
