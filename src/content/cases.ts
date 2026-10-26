import type { CaseStudy } from "@/types";

export const cases: CaseStudy[] = [
  {
    slug: "futurama",
    title: "Futurama",
    tagline: "High-volume optics, outdoor gear & tactical catalog ads account audit and performance scaling.",
    tags: ["ADS", "SEO", "ANALYTICS"],
    category: "CLIENT",
    featured: true,
    thumbnail: "/showcase/futurama.webp",
    heroImage: "/showcase/futurama.webp",
    liveUrl: "https://futurama.co.za",
    meta: {
      timeline: "4 weeks",
      services: "Paid Media Audit, Meta & Google Ads Restructure, Dynamic Product Feeds",
      stack: "Shopify Plus, Meta CAPI, Google Ads, GA4",
      market: "Outdoor, Optics & Tactical",
      year: "2025",
    },
    challenge:
      "A massive multi-category catalog of optics, outdoor gear, and precision equipment was burning margin on overlapping campaigns, disorganized ad sets, and unsegmented catalog feeds.",
    solution:
      "We executed an end-to-end ads account audit, rebuilt campaign structure from cold prospecting down to high-intent retargeting, fixed product feed mapping, and eliminated wasted ad spend.",
    results: [
      { label: "Return on ad spend gain", value: "48", suffix: "%" },
      { label: "Wasted ad budget eliminated", value: "34", suffix: "%" },
      { label: "Blended average ROAS", value: "3.4", suffix: "x" },
    ],
  },
  {
    slug: "camping-fridge",
    title: "Camping Fridge South Africa",
    tagline: "Headless shopping architecture and conversion engine for South Africa's expedition refrigeration specialist.",
    tags: ["WEB", "SEO", "CRO"],
    category: "CLIENT",
    featured: true,
    thumbnail: "/showcase/camping-fridge.webp",
    heroImage: "/showcase/camping-fridge.webp",
    liveUrl: "https://www.campingfridge.co.za",
    meta: {
      timeline: "In Development",
      services: "Ecommerce Store Build, Headless Shopify Architecture, Technical SEO, Mobile CRO",
      stack: "Next.js, Shopify Plus, Tailwind, PayFast",
      market: "Outdoor & 4x4 Expedition",
      year: "2026",
    },
    challenge:
      "South Africa's dedicated portable fridge retailer needed to replace legacy infrastructure with a sub-second, mobile-first flagship storefront tailored for high-ticket outdoor refrigeration and accessories.",
    solution:
      "We engineered a custom headless digital storefront with instant category filtering, dual-battery kit configuration logic, streamlined logistics tracking, and friction-free mobile checkout.",
    results: [
      { label: "Target mobile load speed", value: "0.8", suffix: "s" },
      { label: "Mobile Core Web Vitals", value: "98", suffix: "/100" },
      { label: "Streamlined checkout steps", value: "3", suffix: " taps" },
    ],
  },
  {
    slug: "mymini",
    title: "MyMini",
    tagline: "Interactive 3D configurator and global direct-to-consumer platform for miniaturized memories.",
    tags: ["WEB", "CRO", "AUTOMATION"],
    category: "CLIENT",
    featured: true,
    thumbnail: "/showcase/mymini.webp",
    heroImage: "/showcase/mymini.webp",
    liveUrl: "https://mymini-website-staging.vercel.app/",
    meta: {
      timeline: "In Development",
      services: "Custom 3D Ecommerce Platform, Real-time 3D Configurator, Global Checkout Flow",
      stack: "Next.js, Three.js, WebGL, Tailwind, Stripe",
      market: "Custom 3D Manufacturing & DTC",
      year: "2026",
    },
    challenge:
      "Transforming personal photographs into custom 8K SLA photopolymer resin miniatures required a seamless web experience where customers can configure, preview 3D proofs, and order with zero friction.",
    solution:
      "Developed a fluid WebGL 360-degree turntable customizer with dynamic real-time material rendering, transparent physical scale dimensions, and an automated production pipeline dispatch.",
    results: [
      { label: "Interactive proof approval", value: "100", suffix: "%" },
      { label: "WebGL customizer frame rate", value: "60", suffix: "fps" },
      { label: "Worldwide shipping setup", value: "Global", suffix: "" },
    ],
  },
  {
    slug: "graft",
    title: "Graft Hybrid Training",
    tagline: "High-octane mobile-first fitness studio site and membership booking engine in Dubai.",
    tags: ["WEB", "ADS", "LOCAL"],
    category: "CLIENT",
    featured: false,
    thumbnail: "/showcase/graft.webp",
    heroImage: "/showcase/graft.webp",
    liveUrl: "https://www.graft.ae",
    meta: {
      timeline: "5 weeks",
      services: "Brand Web Experience, Lead Generation, Booking Funnel",
      stack: "Next.js, GSAP, Mindbody API, Tailwind",
      market: "Fitness & Wellness",
      year: "2024",
    },
    challenge:
      "A premium hybrid training gym in Dubai required an elite web platform that could drive trial passes and seamless class booking in a competitive fitness market.",
    solution:
      "We created an athletic, visual-forward web experience featuring dynamic schedule views, integrated trial booking modals, and Meta performance ad landing flows.",
    results: [
      { label: "Increase in trial pass signups", value: "215", suffix: "%" },
      { label: "Return on Meta ad spend", value: "3.8", suffix: "x" },
      { label: "Mobile load time across GCC", value: "1.2", suffix: "s" },
    ],
  },
  {
    slug: "wild-clone",
    title: "Wild Clone",
    tagline: "Global outfitter portal and custom specimen catalog for wildlife preservation.",
    tags: ["WEB", "CRM", "AUTOMATION"],
    category: "CLIENT",
    featured: false,
    thumbnail: "/showcase/wild-clone.webp",
    heroImage: "/showcase/wild-clone.webp",
    liveUrl: "https://wildclone.com",
    meta: {
      timeline: "6 weeks",
      services: "Custom Web Portal, Specimen Catalog, CRM Pipeline",
      stack: "Next.js, Tailwind, Airtable, Cloudflare",
      market: "Taxidermy & Outfitting",
      year: "2025",
    },
    challenge:
      "International hunters and outfitters required seamless tracking of trophy shipments, documentation clearance, and custom specimen finishing requests.",
    solution:
      "We designed a bespoke portal with automated job tracking, secure client logins, and direct WhatsApp and email status dispatching.",
    results: [
      { label: "Faster outfitter onboarding", value: "60", suffix: "%" },
      { label: "Client communication score", value: "9.4", suffix: "/10" },
      { label: "Time to complete launch", value: "4", suffix: " wks" },
    ],
  },
  {
    slug: "community-chest",
    title: "Community Chest",
    tagline: "Modern donation platform and regional grant management hub for social impact.",
    tags: ["WEB", "SEO"],
    category: "CLIENT",
    featured: false,
    thumbnail: "/showcase/community-chest.webp",
    heroImage: "/showcase/community-chest.webp",
    liveUrl: "https://www.cchestpe.org.za",
    meta: {
      timeline: "6 weeks",
      services: "Web Redesign, Donation Gateways, Grant Directory",
      stack: "Next.js, Tailwind, PayFast, Headless CMS",
      market: "Nonprofit & Social Impact",
      year: "2024",
    },
    challenge:
      "An established regional nonprofit needed to modernize its site to attract younger philanthropic donors and simplify grant applications for grassroots organizations.",
    solution:
      "We delivered an inspiring, accessible web architecture with seamless one-off and monthly debit order donations, clear impact stats, and transparent reporting.",
    results: [
      { label: "Increase in digital donations", value: "185", suffix: "%" },
      { label: "Grant processing turnaround", value: "52", suffix: "%" },
      { label: "Accessibility compliance score", value: "100", suffix: "%" },
    ],
  },
  {
    slug: "old-homestead",
    title: "The Old Homestead",
    tagline: "High-converting digital presence and reservation flow for a historic New York steakhouse.",
    tags: ["WEB", "SEO", "LOCAL"],
    category: "CONCEPT",
    featured: false,
    thumbnail: "/showcase/old-homestead.webp",
    heroImage: "/showcase/old-homestead.webp",
    liveUrl: "https://old-homestead.vercel.app",
    meta: {
      timeline: "4 weeks",
      services: "Web Redesign, Local SEO, Mobile Reservation",
      stack: "Next.js, Tailwind CSS, OpenTable API",
      market: "Hospitality & Dining",
      year: "2024",
    },
    challenge:
      "The Old Homestead needed a modernized web presence that honored its storied 1868 culinary pedigree while eliminating mobile booking friction for Manhattan diners.",
    solution:
      "We engineered an editorial, dark-mode digital experience with instant table reservation embeds, curated menu showcases, and optimized Core Web Vitals for mobile diners.",
    results: [
      { label: "Increase in online reservations", value: "48", suffix: "%" },
      { label: "Google PageSpeed mobile score", value: "98", suffix: "/100" },
      { label: "Increase in dwell time", value: "2.4", suffix: "x" },
    ],
  },
  {
    slug: "chihuahua-sa",
    title: "Chihuahua South Africa",
    tagline: "Two-sided breeder marketplace and verified adoption portal with automated vetting.",
    tags: ["WEB", "CRM", "AUTOMATION"],
    category: "CONCEPT",
    featured: false,
    thumbnail: "/showcase/chihuahua-sa.webp",
    heroImage: "/showcase/chihuahua-sa.webp",
    liveUrl: "https://chihuahuasouthafrica.com",
    meta: {
      timeline: "8 weeks",
      services: "Marketplace Development, CRM Intake, Automation",
      stack: "Next.js, Supabase, Tailwind, WhatsApp API",
      market: "Pet Care & Marketplace",
      year: "2024",
    },
    challenge:
      "Managing pet adoptions and buyer verification manually across WhatsApp and email created severe bottlenecks, lost inquiries, and delayed vetting.",
    solution:
      "We built an end-to-end verified adoption platform with automated applicant screening, real-time litter availability alerts, and instant CRM synchronization.",
    results: [
      { label: "Increase in qualified inquiries", value: "310", suffix: "%" },
      { label: "Reduction in vetting admin time", value: "75", suffix: "%" },
      { label: "Automated sequence response rate", value: "100", suffix: "%" },
    ],
  },
  {
    slug: "sorted",
    title: "Sorted",
    tagline: "Automated rent collection, lease tracking, and landlord dashboard for property managers.",
    tags: ["WEB", "CRM", "AUTOMATION"],
    category: "CONCEPT",
    featured: false,
    thumbnail: "/showcase/sorted.webp",
    heroImage: "/showcase/sorted.webp",
    liveUrl: "https://sorted.pixelithagency.com",
    meta: {
      timeline: "10 weeks",
      services: "SaaS Product Design, Web Application, Payment Flows",
      stack: "Next.js, TypeScript, Stripe, PostgreSQL",
      market: "PropTech SaaS",
      year: "2024",
    },
    challenge:
      "Independent property managers faced high payment delinquency and spent hours every month manually reconciling bank transfers and sending reminders.",
    solution:
      "We engineered an intuitive rent collection SaaS featuring one-click recurring tenant billing, automated late notice sequences, and real-time ledger accounting.",
    results: [
      { label: "On-time rent collection rate", value: "99.2", suffix: "%" },
      { label: "Hours saved per manager monthly", value: "14", suffix: "h" },
      { label: "User satisfaction rating", value: "4.9", suffix: "/5" },
    ],
  },
  {
    slug: "halloway-automotive",
    title: "Halloway Automotive",
    tagline: "High-conversion diagnostic booking and emergency repair engine for European auto care.",
    tags: ["WEB", "LOCAL", "ADS"],
    category: "CONCEPT",
    thumbnail: "/showcase/halloway-automotive.webp",
    heroImage: "/showcase/halloway-automotive.webp",
    meta: {
      timeline: "3 weeks",
      services: "Conversion Funnel, Google Local Ads, Service Booking",
      stack: "Next.js, Tailwind, CallRail, Google Ads",
      market: "Automotive Repair",
      year: "2024",
    },
    challenge:
      "A specialized European auto repair shop was losing inbound repair appointments due to an obsolete contact form and zero mobile urgency.",
    solution:
      "We engineered a rapid diagnostic intake form with click-to-call priority, vehicle make selection, and dynamic Google Call Ad integration.",
    results: [
      { label: "Increase in service bookings", value: "64", suffix: "%" },
      { label: "Average cost per booked lead", value: "42", suffix: " USD" },
      { label: "Google Ads return on spend", value: "3.4", suffix: "x" },
    ],
  },
  {
    slug: "salon-aveline",
    title: "Salon Aveline",
    tagline: "Luxury hair studio mobile booking experience with stylist lookbooks and waitlists.",
    tags: ["WEB", "LOCAL"],
    category: "CONCEPT",
    thumbnail: "/showcase/salon-aveline.webp",
    heroImage: "/showcase/salon-aveline.webp",
    meta: {
      timeline: "4 weeks",
      services: "Mobile Web Design, Stylist Portfolios, Booking Flow",
      stack: "Next.js, Tailwind, Fresha API, Instagram Feed",
      market: "Beauty & Personal Care",
      year: "2024",
    },
    challenge:
      "A boutique salon was fielding over 50 Instagram direct messages daily for appointments, causing double bookings and missed clients.",
    solution:
      "We created a mobile-optimized booking experience with stylist galleries, service menus, and integrated appointment reservation synced to their salon calendar.",
    results: [
      { label: "Appointments moved to self-booking", value: "91", suffix: "%" },
      { label: "Boost in color service add-ons", value: "42", suffix: "%" },
      { label: "Scheduling conflict incidents", value: "0", suffix: "" },
    ],
  },
  {
    slug: "halden-plumbing-heating",
    title: "Halden Plumbing & Heating",
    tagline: "Emergency trade dispatch and localized search capture for heating engineers.",
    tags: ["WEB", "SEO", "LOCAL"],
    category: "CONCEPT",
    thumbnail: "/showcase/halden-plumbing-heating.webp",
    heroImage: "/showcase/halden-plumbing-heating.webp",
    meta: {
      timeline: "3 weeks",
      services: "Emergency Landing Engine, Local SEO, Click-to-Call",
      stack: "Next.js, Tailwind, Twilio Dispatch",
      market: "Home Services & Trades",
      year: "2024",
    },
    challenge:
      "Homeowners with burst pipes or broken boilers needed immediate emergency contact, but previous website took 8 seconds to load on mobile connections.",
    solution:
      "We deployed a lightning-fast sub-second landing architecture with prominent emergency hotline triggers and localized service radius landing pages.",
    results: [
      { label: "Mobile time to interactive", value: "0.6", suffix: "s" },
      { label: "Surge in emergency call volume", value: "135", suffix: "%" },
      { label: "Top 3 Google Map placements", value: "4", suffix: " areas" },
    ],
  },
  {
    slug: "barber-co",
    title: "Barber Co.",
    tagline: "Precision cut booking and grooming product showcase with mobile appointment locks.",
    tags: ["WEB", "LOCAL"],
    category: "CONCEPT",
    thumbnail: "/showcase/barber-co.webp",
    heroImage: "/showcase/barber-co.webp",
    meta: {
      timeline: "3 weeks",
      services: "Digital Brand, Chair Scheduling, Retail Showcase",
      stack: "Next.js, Tailwind, Square Appointments",
      market: "Grooming & Retail",
      year: "2024",
    },
    challenge:
      "Walk-in wait times regularly exceeded an hour on weekends while weekday chairs sat empty, causing uneven barbershop revenue.",
    solution:
      "We established an appointment reservation flow that incentivized weekday bookings and enabled advance grooming package purchases.",
    results: [
      { label: "Weekday chair utilization rate", value: "78", suffix: "%" },
      { label: "Increase in retail product sales", value: "32", suffix: "%" },
      { label: "Average client review score", value: "5.0", suffix: "/5" },
    ],
  },
  {
    slug: "maison-aurelle",
    title: "Maison Aurelle",
    tagline: "Editorial skincare and aesthetic clinic experience crafted for high-tier consultation.",
    tags: ["WEB", "ADS"],
    category: "CONCEPT",
    thumbnail: "/showcase/maison-aurelle.webp",
    heroImage: "/showcase/maison-aurelle.webp",
    meta: {
      timeline: "5 weeks",
      services: "Bespoke Web Design, Consultation Intake, Video Showcase",
      stack: "Next.js, Tailwind, GSAP, HIPAA Form Layer",
      market: "Aesthetics & Skincare",
      year: "2024",
    },
    challenge:
      "A high-tier cosmetic clinic struggled to communicate clinical rigor and artistic discretion through generic medical website templates.",
    solution:
      "We crafted an editorial, typography-driven digital flagship with subtle scroll reveals, procedure guides, and discrete consultation booking.",
    results: [
      { label: "VIP consultation inquiries", value: "160", suffix: "%" },
      { label: "Average session dwell time", value: "4.2", suffix: "m" },
      { label: "Average client ticket increase", value: "28", suffix: "%" },
    ],
  },
  {
    slug: "crestline-dry-cleaners",
    title: "Crestline Dry Cleaners",
    tagline: "Pickup route scheduler and commercial dry cleaning quote portal.",
    tags: ["WEB", "LOCAL", "AUTOMATION"],
    category: "CONCEPT",
    thumbnail: "/showcase/crestline-dry-cleaners.webp",
    heroImage: "/showcase/crestline-dry-cleaners.webp",
    meta: {
      timeline: "3 weeks",
      services: "Pickup Booking Webapp, Route Optimization, Pricing Matrix",
      stack: "Next.js, Tailwind, Google Maps API",
      market: "Local Garment Care",
      year: "2024",
    },
    challenge:
      "Customers wanted door-to-door dry cleaning collection, but route scheduling was handled manually on paper notebooks.",
    solution:
      "We automated zip code route validation, pickup window selection, and garment category estimation into a clean 3-step form.",
    results: [
      { label: "Recurring pickup routes added", value: "220", suffix: "+" },
      { label: "Reduction in dispatch errors", value: "85", suffix: "%" },
      { label: "New revenue in first quarter", value: "18", suffix: "K" },
    ],
  },
  {
    slug: "fenwick-print-works",
    title: "Fenwick Print Works",
    tagline: "Commercial printing spec builder and instant vector file pre-flight uploader.",
    tags: ["WEB", "CRM"],
    category: "CONCEPT",
    thumbnail: "/showcase/fenwick-print-works.webp",
    heroImage: "/showcase/fenwick-print-works.webp",
    meta: {
      timeline: "4 weeks",
      services: "File Pre-flight Engine, Custom Quote Generator, B2B Web",
      stack: "Next.js, Tailwind, AWS S3, Stripe",
      market: "B2B Print & Signage",
      year: "2024",
    },
    challenge:
      "Print estimators wasted hours back and forth requesting bleed margins, CMYK color spaces, and correct resolution PDFs.",
    solution:
      "We built an automated file checking pre-flight uploader that validates artwork resolution before submitting custom quote requests.",
    results: [
      { label: "Proofing revision cycles saved", value: "70", suffix: "%" },
      { label: "Speed to commercial quote", value: "3.2", suffix: "x" },
      { label: "Online corporate accounts opened", value: "45", suffix: "%" },
    ],
  },
  {
    slug: "lumen-tanning-studio",
    title: "Lumen Tanning Studio",
    tagline: "UV bed reservations, skin tone consultation quiz, and prepaid credit packs.",
    tags: ["WEB", "LOCAL"],
    category: "CONCEPT",
    thumbnail: "/showcase/lumen-tanning-studio.webp",
    heroImage: "/showcase/lumen-tanning-studio.webp",
    meta: {
      timeline: "3 weeks",
      services: "Membership Engine, Skin Tone Assessment Quiz, Web App",
      stack: "Next.js, Tailwind, Stripe Elements",
      market: "Wellness & Tanning",
      year: "2024",
    },
    challenge:
      "The studio wanted to transition from transactional single-session walk-ins into recurring monthly tanning memberships.",
    solution:
      "We designed a personalized skin assessment quiz that recommended tailored packages and allowed instant online membership activation.",
    results: [
      { label: "Monthly recurring members added", value: "340", suffix: "+" },
      { label: "Quiz completion to purchase rate", value: "62", suffix: "%" },
      { label: "Zero manual phone bookings", value: "100", suffix: "%" },
    ],
  },
  {
    slug: "kesler-brothers-drain-sewer",
    title: "Kesler Brothers Drain & Sewer",
    tagline: "High-urgency trenchless sewer repair funnel with hydro-jetting instant pricing.",
    tags: ["WEB", "SEO", "LOCAL"],
    category: "CONCEPT",
    thumbnail: "/showcase/kesler-brothers-drain-sewer.webp",
    heroImage: "/showcase/kesler-brothers-drain-sewer.webp",
    meta: {
      timeline: "4 weeks",
      services: "High-Intent SEO, Emergency Hotline, Video Inspection Portal",
      stack: "Next.js, Tailwind, ServiceTitan API",
      market: "Municipal & Residential Plumbing",
      year: "2024",
    },
    challenge:
      "Trenchless sewer jobs represent substantial project revenue, but local search presence was previously dominated by national directories.",
    solution:
      "We built hyper-localized neighborhood landing funnels showcasing video sewer inspection case studies and upfront price guides.",
    results: [
      { label: "Top 3 search ranking in counties", value: "5", suffix: " regions" },
      { label: "High-ticket sewer contracts", value: "18", suffix: " jobs" },
      { label: "Return on digital investment", value: "420", suffix: "%" },
    ],
  },
  {
    slug: "ridgeway-boiler-care",
    title: "Ridgeway Boiler Care",
    tagline: "Winter emergency heating dispatch and annual maintenance subscription funnel.",
    tags: ["WEB", "CRM", "LOCAL"],
    category: "CONCEPT",
    thumbnail: "/showcase/ridgeway-boiler-care.webp",
    heroImage: "/showcase/ridgeway-boiler-care.webp",
    meta: {
      timeline: "3 weeks",
      services: "Service Care Plans, Direct Debit Setup, Fast Quote Engine",
      stack: "Next.js, Tailwind, GoCardless",
      market: "HVAC & Heating",
      year: "2024",
    },
    challenge:
      "An HVAC contractor suffered severe revenue seasonality between cold winter bursts and slow summer months.",
    solution:
      "We built an annual boiler protection subscription portal with automatic monthly direct debit billing and priority emergency dispatch.",
    results: [
      { label: "Annual maintenance contracts sold", value: "410", suffix: "" },
      { label: "Recurring revenue stability", value: "88", suffix: "%" },
      { label: "Emergency response dispatch time", value: "25", suffix: "m" },
    ],
  },
  {
    slug: "the-barbershop",
    title: "The Barbershop",
    tagline: "Timeless gentlemen's grooming experience with hot towel service reservations.",
    tags: ["WEB", "LOCAL"],
    category: "CONCEPT",
    thumbnail: "/showcase/the-barbershop.webp",
    heroImage: "/showcase/the-barbershop.webp",
    meta: {
      timeline: "3 weeks",
      services: "Visual Rebrand, Appointment System, Gift Card Portal",
      stack: "Next.js, Tailwind, Fresha",
      market: "Luxury Grooming",
      year: "2024",
    },
    challenge:
      "A classic barbershop lacked digital presence to sell corporate gift vouchers and manage wedding party groomsmen packages.",
    solution:
      "We designed an atmospheric dark aesthetic site with bespoke service descriptions, digital gift cards, and event bookings.",
    results: [
      { label: "Holiday gift vouchers sold", value: "24", suffix: "K" },
      { label: "Weekend appointments pre-booked", value: "100", suffix: "%" },
      { label: "Verified 5-star customer reviews", value: "380", suffix: "+" },
    ],
  },
];
