import type { MetadataRoute } from "next";
import { cases } from "@/content/cases";
import { services } from "@/content/services";
import { blogPosts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://streamlinedigitalsolutions.com";

  const staticPages = [
    "",
    "/services",
    "/work",
    "/blog",
    "/pricing",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...services.map((s) => ({
      url: `${baseUrl}/services/${s.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...blogPosts.map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: new Date(b.publishDate),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...cases.map((c) => ({
      url: `${baseUrl}/work/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
