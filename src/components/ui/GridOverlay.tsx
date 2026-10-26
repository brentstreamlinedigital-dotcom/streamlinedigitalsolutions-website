"use client";

import { useEffect, useState } from "react";

/**
 * Cmd/Ctrl+G toggles a 12-column grid overlay for layout debugging.
 */
export default function GridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "g") {
        e.preventDefault();
        setVisible((v) => !v);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!visible) return null;

  return (
    <div className="grid-overlay" aria-hidden="true">
      <div className="grid-layout h-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} />
        ))}
      </div>
    </div>
  );
}
