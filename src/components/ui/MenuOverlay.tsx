"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { NAV_LINKS, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_RAW, SOCIAL_LINKS, BOOKING_URL } from "@/lib/constants";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);

  const prevPathname = useRef(pathname);

  // Close only when pathname actually changes
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Trap focus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      id="menu-overlay"
      ref={overlayRef}
      className={`
        fixed inset-0 z-40 bg-ink transition-all duration-700
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="h-full flex flex-col lg:flex-row pt-24 px-8 lg:px-16 pb-12 overflow-y-auto">
        {/* Navigation links */}
        <nav className="flex-1 flex flex-col justify-center gap-4">
          {NAV_LINKS.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`
                  group flex items-center gap-4 text-4xl md:text-6xl lg:text-7xl font-medium
                  transition-all duration-500 ease-out
                  ${isActive ? "text-paper" : "text-paper/40 hover:text-paper/80"}
                `}
                style={{
                  transform: isOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: isOpen ? 1 : 0,
                  transitionDelay: isOpen ? `${i * 50}ms` : "0ms",
                }}
              >
                {isActive && (
                  <span className="w-3 h-3 bg-accent rounded-sm flex-shrink-0" />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Contact column */}
        <div className="lg:w-80 flex flex-col gap-8 mt-12 lg:mt-0 lg:justify-center">
          <div>
            <p className="font-label text-xs text-accent mb-3">CONTACT</p>
            <div className="flex flex-col gap-1.5">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-paper/70 hover:text-paper transition-colors text-sm"
              >
                {CONTACT_EMAIL}
              </a>
              <a
                href={`tel:${CONTACT_PHONE_RAW}`}
                className="text-paper/70 hover:text-paper transition-colors text-sm"
              >
                {CONTACT_PHONE}
              </a>
            </div>
          </div>

          <div>
            <p className="font-label text-xs text-accent mb-3">SOCIALS</p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/70 hover:text-paper transition-colors text-sm"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-label text-xs text-accent mb-3">LOCATION</p>
            <p className="text-paper/70 text-sm">Cape Town, South Africa</p>
            <p className="text-paper/50 text-xs mt-1">Working with stores worldwide.</p>
          </div>

          <Link
            href={BOOKING_URL}
            className="inline-flex items-center justify-center font-sans font-semibold text-xs tracking-wider uppercase bg-accent text-ink px-6 py-3 rounded-lg hover:bg-accent-hover transition-colors w-fit"
          >
            BOOK A GROWTH CALL
          </Link>
        </div>
      </div>
    </div>
  );
}
