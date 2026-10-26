import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Streamline Digital Solutions",
  description:
    "Get in touch with Streamline Digital Solutions. Let's discuss scaling your ecommerce store with custom web design, SEO, paid ads, or AI automations.",
  alternates: {
    canonical: "https://streamlinedigitalsolutions.com/contact",
  },
  openGraph: {
    title: "Contact Us | Streamline Digital Solutions",
    description:
      "Get in touch with Streamline Digital Solutions. Let's discuss scaling your ecommerce store.",
    url: "https://streamlinedigitalsolutions.com/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
