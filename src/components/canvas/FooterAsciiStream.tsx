"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function FooterAsciiStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let offsetX = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const tickerItems = [
      "$1,420.00",
      "NEW ORDER #9042",
      "CART +3",
      "+14.2% ROAS",
      "$289.50",
      "CHECKOUT COMPLETED",
      "NEW SUBSCRIBER",
      "$3,840.00",
      "SHOPIFY HOOK 200",
      "REVENUE +38%",
      "DISPATCHED",
      "$650.00",
      "AI AGENT RESOLVED",
      "ORDER #9043",
      "$98.00",
      "CART +1",
      "MARGIN +8.4%",
    ];

    const streamText = tickerItems.join("   ■   ") + "   ■   ";

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx?.scale(dpr, dpr);

      if (reducedMotion && ctx) {
        ctx.clearRect(0, 0, width, height);
        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.fillStyle = "rgba(1, 206, 209, 0.45)";
        ctx.fillText(streamText, 0, height / 2 + 4);
      }
    }

    function animate() {
      if (!isVisible) return;
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillStyle = "rgba(1, 206, 209, 0.45)";

      const textWidth = ctx.measureText(streamText).width;

      // Drift left to right or seamlessly loop
      offsetX += 0.8;
      if (offsetX > textWidth) {
        offsetX = 0;
      }

      ctx.fillText(streamText, offsetX - textWidth, height / 2 + 4);
      ctx.fillText(streamText, offsetX, height / 2 + 4);
      ctx.fillText(streamText, offsetX + textWidth, height / 2 + 4);

      animationFrameId = requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !reducedMotion) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    window.addEventListener("resize", resize);
    resize();

    if (!reducedMotion) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  return (
    <div className="w-full h-12 overflow-hidden" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
