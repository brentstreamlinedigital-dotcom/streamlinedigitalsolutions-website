export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  tags: string[];
  category?: "CLIENT" | "PRODUCT" | "AGENCY" | "MARKETING" | "CONCEPT";
  featured?: boolean;
  thumbnail: string;
  heroImage: string;
  liveUrl?: string;
  meta: {
    timeline: string;
    services: string;
    stack: string;
    market: string;
    year: string;
  };
  challenge: string;
  solution: string;
  results: {
    label: string;
    value: string;
    suffix: string;
  }[];
}

export interface Service {
  id: string;
  title: string;
  outcome: string;
  deliverables: string[];
  relatedCase?: string;
  icon?: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubhead: string;
  keywords: string[];
  benefits: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  techStack: string[];
  faqs: { question: string; answer: string }[];
}

export interface PricingTier {
  label: string;
  type: string;
  description: string;
  includes: string[];
  engagement: string;
  cta: string;
  highlighted?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Client {
  name: string;
  logo?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  bio?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "ARCHITECTURE" | "CRO & CONVERSION" | "AI & AUTOMATION";
  publishDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  featured?: boolean;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  takeaways: string[];
  content: {
    heading: string;
    paragraphs: string[];
    callout?: {
      quote: string;
      source?: string;
    };
    bullets?: string[];
  }[];
}
