"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error internally if needed (without exposing secrets)
  }, [error]);

  return (
    <div
      data-theme="dark"
      className="min-h-screen bg-ink text-paper flex items-center justify-center pt-24 pb-16 px-4"
    >
      <div className="max-w-xl mx-auto text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-red-400 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/5 inline-block mb-6">
          APPLICATION ERROR
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4">
          Something went wrong.
        </h1>

        <p className="text-paper/70 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
          We encountered an unexpected issue while rendering this page. You can try reloading, or return to the homepage.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button onClick={() => reset()} label="Try Again" variant="primary" />
          <Button href="/" label="Return to Home" variant="outline" />
        </div>
      </div>
    </div>
  );
}
