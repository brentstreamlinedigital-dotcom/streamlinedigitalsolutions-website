"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { CONTACT_EMAIL, SOCIAL_LINKS, BOOKING_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { submitContactLead } from "./actions";
import HeroCanvas from "@/components/canvas/HeroCanvas";

const SERVICE_OPTIONS = [
  "Web design and development",
  "SEO",
  "Meta and Google Ads",
  "App development",
  "CRM development",
  "Automations",
  "AI solutions",
  "Not sure yet",
];

const BUDGET_OPTIONS = [
  "Under $5,000",
  "$5,000 to $15,000",
  "$15,000 to $30,000",
  "$30,000+",
  "Monthly retainer",
];

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState("");

  function toggleService(service: string) {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setFieldErrors({});
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Clear any previous services in formData and append actual selected
    formData.delete("services");
    selectedServices.forEach((s) => formData.append("services", s));

    const result = await submitContactLead(formData);

    if (result.success) {
      setFormState("success");
      trackEvent("generate_lead", {
        form_name: "contact_page",
        services: selectedServices.join(", "),
      });
    } else {
      setFormState("error");
      if (result.errors) {
        setFieldErrors(result.errors);
      }
      if (result.message) {
        setErrorMessage(result.message);
      }
    }
  }

  return (
    <>
      <section data-theme="dark" className="bg-ink text-paper pt-32 pb-24 md:pt-40 md:pb-32 min-h-screen">
        <div className="grid-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <div>
              {/* Interactive S Particle Logo */}
              <div className="relative aspect-[16/10] bg-paper/[0.03] rounded-2xl mb-10 overflow-hidden border border-paper/10 shadow-lg flex items-center justify-center p-4">
                <HeroCanvas className="w-full h-full min-h-[220px]" />
              </div>

              <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
                Let&apos;s talk.
              </h1>

              <div className="space-y-6">
                <div>
                  <p className="font-label text-xs text-accent mb-2">EMAIL</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-paper/70 hover:text-paper transition-colors"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>

                <div>
                  <p className="font-label text-xs text-accent mb-2">SOCIALS</p>
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
                  <p className="font-label text-xs text-accent mb-2">BOOK A CALL</p>
                  <a
                    href={BOOKING_URL}
                    className="text-accent hover:text-accent-hover transition-colors text-sm font-medium"
                  >
                    Book a 15-min growth call →
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <Eyebrow label="GET IN TOUCH" className="text-accent" />

              {formState === "success" ? (
                <div className="py-16 text-center bg-paper/5 border border-paper/10 rounded-2xl p-8">
                  <div className="w-12 h-12 rounded-full bg-accent text-ink flex items-center justify-center font-bold text-xl mx-auto mb-4">
                    ✓
                  </div>
                  <h2 className="text-3xl md:text-4xl font-medium mb-3">Message sent.</h2>
                  <p className="text-paper/70 max-w-sm mx-auto text-sm leading-relaxed">
                    We will review your store and get back to you within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field for bot protection */}
                  <input
                    type="text"
                    name="honeypot"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {errorMessage && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-xs font-label">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="font-label text-xs text-paper/50 block mb-2">
                        FIRST NAME *
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-paper/20 py-3 text-paper focus:border-accent focus:outline-none transition-colors"
                      />
                      {fieldErrors.firstName && (
                        <p className="text-red-400 text-xs mt-1 font-label">{fieldErrors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="font-label text-xs text-paper/50 block mb-2">
                        LAST NAME *
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-paper/20 py-3 text-paper focus:border-accent focus:outline-none transition-colors"
                      />
                      {fieldErrors.lastName && (
                        <p className="text-red-400 text-xs mt-1 font-label">{fieldErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="font-label text-xs text-paper/50 block mb-2">
                      EMAIL *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full bg-transparent border-b border-paper/20 py-3 text-paper focus:border-accent focus:outline-none transition-colors"
                    />
                    {fieldErrors.email && (
                      <p className="text-red-400 text-xs mt-1 font-label">{fieldErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="storeUrl" className="font-label text-xs text-paper/50 block mb-2">
                      STORE URL
                    </label>
                    <input
                      id="storeUrl"
                      name="storeUrl"
                      type="url"
                      placeholder="https://"
                      className="w-full bg-transparent border-b border-paper/20 py-3 text-paper placeholder:text-paper/20 focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="font-label text-xs text-paper/50 block mb-2">
                      COMPANY
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="w-full bg-transparent border-b border-paper/20 py-3 text-paper focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Services multi-select */}
                  <div>
                    <p className="font-label text-xs text-paper/50 block mb-3">
                      SERVICES INTERESTED IN
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_OPTIONS.map((service) => {
                        const isSelected = selectedServices.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            className={`font-sans font-semibold text-xs tracking-wider uppercase px-3 py-2 rounded-md border transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-accent text-ink border-accent"
                                : "border-paper/20 text-paper/50 hover:border-accent/50"
                            }`}
                          >
                            {service.toUpperCase()}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="budget" className="font-label text-xs text-paper/50 block mb-2">
                      BUDGET RANGE (USD)
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      className="w-full bg-transparent border-b border-paper/20 py-3 text-paper focus:border-accent focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-ink text-paper">Select a range</option>
                      {BUDGET_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-ink text-paper">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="font-label text-xs text-paper/50 block mb-2">
                      MESSAGE *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full bg-transparent border-b border-paper/20 py-3 text-paper focus:border-accent focus:outline-none transition-colors resize-none"
                    />
                    {fieldErrors.message && (
                      <p className="text-red-400 text-xs mt-1 font-label">{fieldErrors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={formState === "submitting"}
                    label={formState === "submitting" ? "SENDING..." : "SEND MESSAGE"}
                  />
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
