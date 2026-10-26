// Navigation links used across Header and MenuOverlay
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/streamlinedigital", icon: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com/company/streamlinedigital", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/streamlinedigital", icon: "github" },
] as const;

export const CONTACT_EMAIL = "brent@streamlinedigitalsolutions.com";
export const CONTACT_PHONE = "+27 67 549 9364";
export const CONTACT_PHONE_RAW = "+27675499364";
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "/contact";
export const SITE_URL = "https://streamlinedigitalsolutions.com";
export const SITE_NAME = "Streamline Digital Solutions";
