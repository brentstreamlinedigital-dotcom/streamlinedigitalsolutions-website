"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log error in telemetry
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#0B0F10] text-[#EFF2F2] min-h-screen flex items-center justify-center p-6 antialiased">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-12 h-12 rounded-full border border-[#01CED1]/30 bg-[#01CED1]/10 text-[#01CED1] flex items-center justify-center mx-auto text-xl font-bold">
            !
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight">
              Something went wrong
            </h1>
            <p className="text-sm text-[#EFF2F2]/70 leading-relaxed">
              We encountered a temporary interface error. Reloading will restore the page.
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => reset()}
              type="button"
              className="bg-[#01CED1] text-[#0B0F10] font-semibold text-xs tracking-wider uppercase px-5 py-3 rounded-lg hover:bg-[#01CED1]/90 transition-colors cursor-pointer"
            >
              Try Again
            </button>
            <a
              href="/"
              className="border border-[#EFF2F2]/20 text-[#EFF2F2] font-semibold text-xs tracking-wider uppercase px-5 py-3 rounded-lg hover:border-[#01CED1] hover:text-[#01CED1] transition-colors"
            >
              Return Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
