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

  if (!isWiping || reducedMotion) return null;

  return (
    <div
      className="fixed inset-0 z-[90] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-accent route-wipe-panel" />
      <style jsx>{`
        .route-wipe-panel {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          animation: diagonalWipe 0.6s cubic-bezier(0.77, 0, 0.175, 1) forwards;
        }

        @keyframes diagonalWipe {
          0% {
            clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
            transform: translateX(-10%);
          }
          40% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            transform: translateX(0);
          }
          60% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            transform: translateX(0);
          }
          100% {
            clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
            transform: translateX(10%);
          }
        }
      `}</style>
    </div>
  );
}
