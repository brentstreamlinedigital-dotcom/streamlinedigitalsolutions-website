import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#0B0F10",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

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
  verification: {
    other: {
      "msvalidate.01": "F89692437D14CC37D89D336DEC7DF860",
    },
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
              email: "brent@streamlinedigitalsolutions.com",
              telephone: "+27 67 549 9364",
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
              email: "brent@streamlinedigitalsolutions.com",
              telephone: "+27 67 549 9364",
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-accent focus:text-ink focus:rounded-md focus:font-sans focus:font-semibold focus:text-xs focus:uppercase focus:tracking-wider focus:shadow-xl focus:outline-none"
        >
          Skip to main content
        </a>
        <LenisProvider>
          <Loader />
          <RouteTransition />
          <Header />
          <main id="main-content" className="relative z-[1]">{children}</main>
          <Footer />
          <GridOverlay />
        </LenisProvider>
      </body>
    </html>
  );
}
