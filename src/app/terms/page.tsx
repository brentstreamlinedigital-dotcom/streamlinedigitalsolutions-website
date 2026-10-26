import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Streamline Digital Solutions",
  description: "Terms of use for Streamline Digital Solutions website and client digital services.",
  alternates: {
    canonical: "https://streamlinedigitalsolutions.com/terms",
  },
};

export default function TermsPage() {
  return (
    <section data-theme="light" className="bg-paper text-ink pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="grid-container">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-12">
          Terms of Use.
        </h1>

        <div className="prose max-w-3xl space-y-8 text-grey-700 leading-relaxed">
          <h2 className="text-xl font-medium text-ink mt-8">1. Acceptance of terms</h2>
          <p>
            By accessing and using the Streamline Digital Solutions website, you accept and agree to be bound by these Terms of Use. If you do not agree, please do not use this website.
          </p>

          <h2 className="text-xl font-medium text-ink">2. Services</h2>
          <p>
            Streamline Digital Solutions provides ecommerce growth services including web design and development, SEO, paid advertising, app development, CRM development, automation, and AI solutions. Specific service terms are agreed upon in individual project agreements.
          </p>

          <h2 className="text-xl font-medium text-ink">3. Intellectual property</h2>
          <p>
            All content on this website, including text, graphics, logos, and code, is the property of Streamline Digital Solutions unless otherwise stated. You may not reproduce, distribute, or create derivative works without our written permission.
          </p>

          <h2 className="text-xl font-medium text-ink">4. Limitation of liability</h2>
          <p>
            Streamline Digital Solutions provides this website "as is" without warranties of any kind. We are not liable for any damages arising from your use of this website or our services beyond the amount paid for those services.
          </p>

          <h2 className="text-xl font-medium text-ink">5. Governing law</h2>
          <p>
            These terms are governed by the laws of the Republic of South Africa. Any disputes will be resolved in the courts of the Western Cape, South Africa.
          </p>

          <h2 className="text-xl font-medium text-ink">6. Contact</h2>
          <p>
            For questions about these terms, contact Streamline Digital Solutions at brent@streamlinedigitalsolutions.com.
          </p>

          <p className="text-sm text-grey-400 mt-12">
            Last updated: {new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>
    </section>
  );
}
