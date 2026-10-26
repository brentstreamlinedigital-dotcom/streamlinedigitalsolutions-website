# Streamline Digital Solutions — Project Handoff Documentation

## 1. What Was Built

### Core Pages & Architecture
- **Home (`/`):**
  - Dark mode hero with interactive dot-matrix particle canvas repelling from cursor and forming the Streamline S mark
  - Client logo strip (`VRVE`, `Futurama`, `Camping Fridge SA`, `Wild Clone`, `Ivorytip Safaris`)
  - Results metrics with animated vertical odometers
  - Pinned 4-step process section (`01 Growth audit`, `02 Strategy call`, `03 Build and launch`, `04 Scale`) with dynamic state previews
  - Sticky Selected Work showcase with active thumb index indicator
  - "The Engine" 6-pillar feature grid with scramble-text effects
  - Accordion FAQ and conversion CTA block
- **Services (`/services`):**
  - Hero header with 7 modular capability sections (Web Design & Dev, SEO, Meta & Google Ads, App Dev, CRM Dev, Automations, AI Solutions) complete with deliverables and linked case studies
- **Work Gallery (`/work`):**
  - Interactive multi-tag filter (`[ALL]`, `[WEB]`, `[SEO]`, `[ADS]`, `[CRM]`, `[AUTOMATION]`, `[AI]`)
  - 3 dynamic viewing modes: `2-Col`, `Grid`, and `Carousel` with prev/next navigation
  - Quick index bar
- **Case Study Template (`/work/[slug]`):**
  - Static generation via `generateStaticParams` for `vrve`, `futurama`, `camping-fridge-sa`, and `wild-clone`
  - High-res mockup showcases, Challenge, Solution, and 3 verified metric callouts
- **Pricing (`/pricing`):**
  - 3 engagement tiers: Launch (by project), Growth Engine (monthly retainer), and Custom Systems (quoted)
  - Scope inclusions, quarterly slot scarcity tags, and FAQ
- **About (`/about`):**
  - Brand story, founder profile (Brent Mortimer), 8 operating principles, team credentials
- **Contact (`/contact`):**
  - Full lead capture form with multi-service toggle, budget picker, honeypot bot trap, and direct Google/Calendly booking integration
- **Legal (`/privacy-policy`, `/terms`):**
  - POPIA and GDPR compliant privacy policy and commercial terms of use
- **Global Motion & Utilities:**
  - `Loader.tsx`: SVG stroke-draw animation with `sessionStorage` caching
  - `RouteTransition.tsx`: Diagonal teal panel route wipe
  - `GridOverlay.tsx`: 12-column grid toggle accessible via `Cmd+G` / `Ctrl+G`
  - `useReducedMotion`: Complete accessibility guard that skips animations when requested by system settings

---

## 2. Third-Party Services Used

1. **Supabase (PostgreSQL):**
   - Tables: `public.leads`, `public.subscribers`
   - Setup script: `supabase/schema.sql` with Row Level Security enabled.
2. **Resend:**
   - Used for instant email dispatch to `NEXT_PUBLIC_CONTACT_EMAIL` when new leads submit the contact form.
3. **Lenis:**
   - Smooth inertia scrolling provider.
4. **GSAP & ScrollTrigger:**
   - Timeline orchestration and pinned section mechanics.

---

## 3. Known Limitations & Items Requiring Confirmation

All real-world stats requiring Brent's final sign-off are cataloged in [TODO.md](file:///Users/brent/Downloads/New%20Streamline%20Website/TODO.md):
- **Mockup Assets:** Replace placeholder SVGs and mockup cards with high-fidelity production captures.
- **Client Logo Permissions:** Confirm sign-off from VRVE, Futurama, Camping Fridge SA, Wild Clone, and IvoryTip Safaris.
- **Client Metrics:** Replace approved case study percentage gains in `src/content/cases.ts`.
- **API Keys:** Add production `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `RESEND_API_KEY` in Vercel environment settings.
