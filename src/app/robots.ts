import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://streamlinedigitalsolutions.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/hero-concepts"],
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: ["/hero-concepts"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
