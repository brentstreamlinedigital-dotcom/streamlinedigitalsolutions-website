"use client";

import { useState } from "react";
import type { FAQItem } from "@/types";

interface AccordionProps {
  items: FAQItem[];
  className?: string;
}

/**
 * FAQ accordion with +/x toggle and smooth height animation.
 */
export default function Accordion({ items, className = "" }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`divide-y divide-current/10 ${className}`}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;

        return (
          <div key={i} className="py-6 md:py-8">
            <button
              id={`faq-button-${i}`}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-start justify-between gap-4 text-left group cursor-pointer"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
            >
              <span className="text-lg md:text-xl lg:text-2xl font-medium pr-4">
                {item.question}
              </span>
              <span
                className={`
                  flex-shrink-0 w-8 h-8 flex items-center justify-center
                  border border-current/20 rounded-md text-sm font-mono
                  transition-all duration-300
                  ${isOpen ? "bg-accent text-ink border-accent rotate-0" : "rotate-0"}
                `}
                aria-hidden="true"
              >
                {isOpen ? "×" : "+"}
              </span>
            </button>

            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              className="overflow-hidden transition-all duration-500"
              style={{
                maxHeight: isOpen ? "500px" : "0px",
                opacity: isOpen ? 1 : 0,
                transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              <p className="pt-4 text-sm md:text-base opacity-70 max-w-2xl leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
