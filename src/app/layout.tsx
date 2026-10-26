import type { Metadata } from "next";
import Script from "next/script";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import GridOverlay from "@/components/ui/GridOverlay";
import Loader from "@/components/motion/Loader";
import RouteTransition from "@/components/motion/RouteTransition";
import LenisProvider from "@/providers/LenisProvider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Streamline Digital Solutions | The Ecommerce Growth Engine",
    template: "%s | Streamline Digital Solutions",
  },
  description:
    "We build, market and automate online stores. We do the heavy lifting, you keep the margin. Cape Town based, scaling stores worldwide.",
  metadataBase: new URL("https://streamlinedigitalsolutions.com"),
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Streamline Digital Solutions",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L3JWPV80TQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L3JWPV80TQ');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Streamline Digital Solutions",
              url: "https://streamlinedigitalsolutions.com",
              logo: "https://streamlinedigitalsolutions.com/logo.svg",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Cape Town",
                addressCountry: "ZA",
              },
              sameAs: [
                "https://instagram.com/streamlinedigital",
                "https://linkedin.com/company/streamlinedigital",
                "https://github.com/streamlinedigital",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Streamline Digital Solutions",
              url: "https://streamlinedigitalsolutions.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Cape Town",
                addressRegion: "Western Cape",
                addressCountry: "ZA",
              },
              description:
                "AI-native ecommerce growth agency. Web, SEO, ads, CRM, apps, automation, and AI solutions.",
            }),
          }}
        />
      </head>
      <body className="bg-ink text-paper antialiased">
        <LenisProvider>
          <Loader />
          <RouteTransition />
          <Header />
          <main className="relative z-[1]">{children}</main>
          <Footer />
          <GridOverlay />
        </LenisProvider>
      </body>
    </html>
  );
}
