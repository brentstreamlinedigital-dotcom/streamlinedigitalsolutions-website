import type { Metadata } from "next";
import BlogIndexClient from "./BlogIndexClient";
import { blogPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Insights & Technical Playbooks | Streamline Digital Solutions",
  description:
    "Unfiltered technical playbooks, architectural teardowns, and ecommerce growth strategies for high-scale DTC brands. Headless commerce, mobile CRO, and autonomous AI workflows.",
  openGraph: {
    title: "Insights & Technical Playbooks | Streamline Digital Solutions",
    description:
      "Unfiltered technical playbooks, architectural teardowns, and ecommerce growth strategies for high-scale DTC brands.",
    url: "https://streamlinedigitalsolutions.com/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogIndexClient initialPosts={blogPosts} />;
}
