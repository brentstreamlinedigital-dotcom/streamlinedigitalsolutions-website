import type { PricingTier } from "@/types";

export const pricingTiers: PricingTier[] = [
  {
    label: "Launch",
    type: "By project",
    description: "Everything you need to go live with a store that actually converts.",
    includes: [
      "Custom store design and build",
      "CRO setup and conversion tracking",
      "Analytics integration (GA4, Meta Pixel)",
      "SEO foundations and technical audit",
      "Mobile-first responsive development",
      "Two rounds of revisions",
    ],
    engagement: "4 to 8 weeks",
    cta: "Start a project",
  },
  {
    label: "Growth Engine",
    type: "Monthly",
    description: "Ongoing optimisation across ads, SEO, CRO, and CRM. Measured in revenue.",
    includes: [
      "Meta and Google Ads management",
      "SEO content and technical sprints",
      "CRO experiments and A/B testing",
      "CRM flow optimisation",
      "Monthly performance reporting",
      "Dedicated growth strategist",
    ],
    engagement: "Monthly, 3-month minimum", // [CONFIRM]
    cta: "Start growing",
    highlighted: true,
  },
  {
    label: "Custom Systems",
    type: "Quoted",
    description: "AI agents, CRM builds, apps, and automation pipelines scoped to your needs.",
    includes: [
      "AI voice and chat agent builds",
      "Custom CRM development",
      "Mobile app development",
      "Automation pipeline architecture",
      "Third-party integrations",
      "Ongoing support retainer available",
    ],
    engagement: "Scoped per project",
    cta: "Tell us what you need",
  },
];
