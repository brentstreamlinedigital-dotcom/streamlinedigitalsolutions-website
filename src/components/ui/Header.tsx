"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, BOOKING_URL } from "@/lib/constants";
import MenuOverlay from "./MenuOverlay";

export default function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const handleClose = useCallback(() => {
    setMenuOpen(false);
  }, []);

  // Detect which section the header sits over for tinting
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Check sections with data-theme for header tinting
    function checkTheme() {
      if (!header) return;
      const sections = document.querySelectorAll("section[data-theme]");
      const headerRect = header.getBoundingClientRect();
      const headerMid = headerRect.top + headerRect.height / 2;

      let currentTheme = "dark";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= headerMid && rect.bottom >= headerMid) {
          currentTheme = section.getAttribute("data-theme") || "dark";
        }
      });

      setIsDark(currentTheme === "dark");
    }

    window.addEventListener("scroll", checkTheme, { passive: true });
    checkTheme();

    return () => {
      window.removeEventListener("scroll", checkTheme);
    };
  }, [pathname]);

  const effectiveIsDark = menuOpen || isDark;

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
        style={{ height: "var(--site-header-height)" }}
      >
        <div
          className={`
            mx-auto flex items-center justify-between rounded-lg px-4 py-3
            backdrop-blur-md transition-colors duration-500
            ${effectiveIsDark
              ? "bg-ink/80 text-paper"
              : "bg-paper/80 text-ink"
            }
          `}
        >
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-2" aria-label="Streamline home">
            <Image
              src="/logo-mark.png"
              alt="Streamline"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
              priority
            />
            <Image
              src="/logo.svg"
              alt="Streamline"
              width={120}
              height={24}
              className={`h-5 w-auto hidden sm:block ${effectiveIsDark ? "invert-0" : ""}`}
              style={{ filter: effectiveIsDark ? "none" : "invert(1)" }}
            />
          </Link>

          {/* Centre: Menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="font-sans font-semibold text-xs uppercase flex items-center gap-2 tracking-wider cursor-pointer px-3 py-1.5 rounded hover:bg-paper/10 transition-colors"
            aria-expanded={menuOpen}
            aria-controls="menu-overlay"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span>{menuOpen ? "CLOSE" : "MENU"}</span>
            <span className="flex flex-col gap-[3px] w-4">
              <span
                className={`block h-[1.5px] bg-current transition-transform duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[5px]" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] bg-current transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] bg-current transition-transform duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
                }`}
              />
            </span>
          </button>

          {/* Right: CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href={BOOKING_URL}
              className="font-sans text-xs tracking-wider uppercase px-4 py-2.5 bg-accent text-ink rounded-lg hover:bg-accent-hover transition-colors font-semibold"
            >
              BOOK A GROWTH CALL
            </Link>
          </div>
        </div>
      </header>

      <MenuOverlay isOpen={menuOpen} onClose={handleClose} />
    </>
  );
}
