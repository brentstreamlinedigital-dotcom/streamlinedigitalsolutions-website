"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LOGO_POINTS } from "./logoPoints";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  isLogo: boolean;
  phase: number;
}

interface HeroCanvasProps {
  className?: string;
  theme?: "dark" | "light";
}

export default function HeroCanvas({ className = "", theme = "dark" }: HeroCanvasProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
    const particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, radius: 68 };

    // Cap DPR at 2 for optimal high-DPI crispness without burning GPU
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function initParticles() {
      particles.length = 0;
      const centerX = width / 2;
      const centerY = height / 2;

      // Scale logo mark dynamically to fill comfortable container viewport
      const logoScale = Math.min(width, height) * 0.74;

      // 1. Exact Streamline Logo Mark Particles
      for (let i = 0; i < LOGO_POINTS.length; i++) {
        const [nx, ny, alphaWeight] = LOGO_POINTS[i];
        const targetX = centerX + nx * logoScale;
        const targetY = centerY + ny * logoScale;

        // Subtle initial dispersion for convergence feel
        const initOffset = 20;
        const x = targetX + (Math.random() - 0.5) * initOffset;
        const y = targetY + (Math.random() - 0.5) * initOffset;

        const size = 1.9 + alphaWeight * 0.7; // ~2.2px to 2.6px
        const baseAlpha = Math.min(1, 0.45 + alphaWeight * 0.55);

        particles.push({
          x,
          y,
          originX: targetX,
          originY: targetY,
          targetX,
          targetY,
          vx: 0,
          vy: 0,
          size,
          baseAlpha,
          alpha: baseAlpha,
          isLogo: true,
          phase: Math.random() * Math.PI * 2,
        });
      }

      // 2. Ambient background grid dots for cybernetic matrix feel
      const ambientCols = 16;
      const ambientRows = 16;
      const stepX = width / ambientCols;
      const stepY = height / ambientRows;

      for (let r = 1; r < ambientRows; r++) {
        for (let c = 1; c < ambientCols; c++) {
          // Sparse ambient dots (skip center area occupied by logo)
          const targetX = c * stepX;
          const targetY = r * stepY;
          const distFromCenter = Math.hypot(targetX - centerX, targetY - centerY);

          if (distFromCenter > logoScale * 0.38 && Math.random() < 0.32) {
            particles.push({
              x: targetX,
              y: targetY,
              originX: targetX,
              originY: targetY,
              targetX,
              targetY,
              vx: 0,
              vy: 0,
              size: 1.1,
              baseAlpha: 0.14,
              alpha: 0.14,
              isLogo: false,
              phase: Math.random() * Math.PI * 2,
            });
          }
        }
      }
    }

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();

      if (reducedMotion) {
        drawStatic();
      }
    }

    function drawStatic() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Draw faint glow
      const centerX = width / 2;
      const centerY = height / 2;
      const glowGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, width * 0.45);
      glowGrad.addColorStop(0, theme === "light" ? "rgba(1, 206, 209, 0.15)" : "rgba(1, 206, 209, 0.12)");
      glowGrad.addColorStop(1, "rgba(1, 206, 209, 0)");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        if (p.isLogo) {
          ctx.fillStyle = theme === "light"
            ? `rgba(0, 170, 174, ${Math.min(1, p.baseAlpha * 1.15)})`
            : `rgba(1, 206, 209, ${p.baseAlpha})`;
        } else {
          ctx.fillStyle = theme === "light"
            ? `rgba(11, 15, 16, ${p.baseAlpha * 0.4})`
            : `rgba(239, 242, 242, ${p.baseAlpha})`;
        }
        ctx.beginPath();
        ctx.arc(p.targetX, p.targetY, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let lastTime = 0;
    function animate(time: number) {
      if (!isVisible) return;
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx?.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Soft ambient background glow in canvas
      if (ctx) {
        const glowGrad = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, width * 0.42);
        glowGrad.addColorStop(0, theme === "light" ? "rgba(1, 206, 209, 0.12)" : "rgba(1, 206, 209, 0.08)");
        glowGrad.addColorStop(0.5, theme === "light" ? "rgba(1, 206, 209, 0.04)" : "rgba(1, 206, 209, 0.03)");
        glowGrad.addColorStop(1, "rgba(1, 206, 209, 0)");
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, width, height);
      }

      const idleSeconds = time * 0.001;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Idle organic breathing / subtle kinetic wave
        let idleDx = 0;
        let idleDy = 0;
        if (p.isLogo) {
          const wave = Math.sin(idleSeconds * 1.8 + p.phase + p.originX * 0.012);
          idleDy = wave * 0.65;
          idleDx = Math.cos(idleSeconds * 1.4 + p.phase) * 0.4;
        }

        const effectiveTargetX = p.targetX + idleDx;
        const effectiveTargetY = p.targetY + idleDy;

        // Cursor repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0.001) {
          const normDist = (mouse.radius - dist) / mouse.radius;
          const force = Math.pow(normDist, 1.5) * 5.5;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
          // Flare alpha on active displacement
          p.alpha = Math.min(1, p.baseAlpha + normDist * 0.35);
        } else {
          // Relax alpha back to base
          p.alpha += (p.baseAlpha - p.alpha) * 0.08;
        }

        // Spring force pulling back to exact logo position
        const homeDx = effectiveTargetX - p.x;
        const homeDy = effectiveTargetY - p.y;
        p.vx += homeDx * 0.09;
        p.vy += homeDy * 0.09;

        // Viscous damping
        p.vx *= 0.81;
        p.vy *= 0.81;

        p.x += p.vx;
        p.y += p.vy;

        // Render particle
        if (ctx) {
          if (p.isLogo) {
            ctx.fillStyle = theme === "light"
              ? `rgba(0, 168, 172, ${Math.min(1, p.alpha * 1.15)})`
              : `rgba(1, 206, 209, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = theme === "light"
              ? `rgba(11, 15, 16, ${p.alpha * 0.35})`
              : `rgba(239, 242, 242, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    // Mouse tracking within canvas
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      mouse.x = (e.clientX - rect.left) * (width / rect.width);
      mouse.y = (e.clientY - rect.top) * (height / rect.height);
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize);

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(canvas);

    // Pause animation when off-screen for 60fps power efficiency
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !reducedMotion) {
          cancelAnimationFrame(animationFrameId);
          lastTime = performance.now();
          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    resize();
    if (!reducedMotion) {
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none ${className || "min-h-[380px] sm:min-h-[440px] md:min-h-[500px]"}`}
    >
      {/* Ambient Radial Teal Backlight */}
      <div
        className="absolute inset-0 pointer-events-none rounded-full blur-3xl opacity-35 transition-opacity duration-700"
        style={{
          background: "radial-gradient(circle at center, rgba(1, 206, 209, 0.22) 0%, rgba(1, 206, 209, 0.05) 45%, transparent 70%)",
        }}
      />

      {/* HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[520px] max-h-[520px] aspect-square cursor-crosshair z-10 block"
        aria-label="Streamline interactive particle logo mark"
        role="img"
      />
    </div>
  );
}
