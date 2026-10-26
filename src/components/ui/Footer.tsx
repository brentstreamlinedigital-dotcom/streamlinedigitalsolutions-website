"use client";

import { useState } from "react";
import Link from "next/link";
import { subscribeNewsletter } from "@/app/actions/newsletter";
import { NAV_LINKS, CONTACT_EMAIL, SOCIAL_LINKS, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subError, setSubError] = useState("");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setSubscribing(true);
    setSubError("");

    const res = await subscribeNewsletter(name, email);
    setSubscribing(false);
    if (res.success) {
      setSubscribed(true);
      setName("");
      setEmail("");
    } else {
      setSubError(res.error || "Failed to subscribe");
    }
  }

  return (
    <footer className="bg-ink text-paper" data-theme="dark">
      <div className="grid-container py-16 md:py-24">
        {/* Newsletter */}
        <div className="mb-16 md:mb-24">
          <p className="font-label text-xs text-accent mb-6">STAY IN THE LOOP</p>
          {subscribed ? (
            <p className="text-lg text-paper/80">You are in. We will be in touch.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-transparent border-b border-paper/20 px-0 py-3 text-sm focus:border-accent focus:outline-none transition-colors flex-1"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent border-b border-paper/20 px-0 py-3 text-sm focus:border-accent focus:outline-none transition-colors flex-1"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="font-sans font-semibold text-xs tracking-wider uppercase bg-accent text-ink px-6 py-3 rounded-md hover:bg-accent-hover transition-colors whitespace-nowrap disabled:opacity-50 cursor-pointer"
              >
                {subscribing ? "SUBSCRIBING..." : "SUBSCRIBE"}
              </button>
            </form>
          )}
          {subError && (
            <p className="text-red-400 text-xs font-label mt-2">{subError}</p>
          )}
        </div>

        {/* Links + Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 md:mb-24">
          {/* Page links */}
          <nav className="flex flex-col gap-3">
            <p className="font-label text-xs text-accent mb-2">PAGES</p>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-paper/60 hover:text-paper transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="font-label text-xs text-accent mb-2">CONTACT</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-paper/60 hover:text-paper transition-colors text-sm"
            >
              {CONTACT_EMAIL}
            </a>
            <div className="flex gap-4 mt-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/60 hover:text-paper transition-colors text-sm"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal + hints */}
          <div className="flex flex-col gap-3">
            <p className="font-label text-xs text-accent mb-2">LEGAL</p>
            <Link href="/privacy-policy" className="text-paper/60 hover:text-paper transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-paper/60 hover:text-paper transition-colors text-sm">
              Terms of Use
            </Link>
            <p className="text-paper/30 text-xs mt-4 font-mono">
              ⌘G grid
            </p>
          </div>
        </div>

        {/* Signature */}
        <div className="border-t border-paper/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-paper/50 text-xs">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Cape Town, South Africa. Built to scale.
          </p>
        </div>

        {/* Faded Streamline wordmark perfectly scaled across all viewports */}
        <div className="mt-14 w-full select-none overflow-hidden" aria-hidden="true">
          <svg
            viewBox="0 0 1100 140"
            className="w-full h-auto text-paper/[0.04]"
            fill="currentColor"
          >
            <text
              x="50%"
              y="55%"
              dominantBaseline="central"
              textAnchor="middle"
              className="font-bold tracking-tight text-[118px]"
            >
              Streamline
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
