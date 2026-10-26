import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Streamline Digital Solutions",
  description: "Privacy policy for Streamline Digital Solutions. POPIA (South Africa) and GDPR compliant.",
  alternates: {
    canonical: "https://streamlinedigitalsolutions.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section data-theme="light" className="bg-paper text-ink pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="grid-container">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-12">
          Privacy Policy.
        </h1>

        <div className="prose max-w-3xl space-y-8 text-grey-700 leading-relaxed">
          <h2 className="text-xl font-medium text-ink mt-8">1. Introduction</h2>
          <p>
            Streamline Digital Solutions (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects your privacy and is committed to protecting your personal data in accordance with the Protection of Personal Information Act (POPIA) of South Africa and international data protection standards including the GDPR. This privacy policy explains how we collect, use, store, and protect your information when you visit our website or engage our digital services.
          </p>

          <h2 className="text-xl font-medium text-ink">2. Information we collect</h2>
          <p>
            We collect information you provide directly to us, including your name, email address, company name, store URL, budget details, and any message content you transmit through our contact or enquiry forms. We also collect anonymized technical and usage data through web analytics tools including page views, referrer sources, and device characteristics.
          </p>

          <h2 className="text-xl font-medium text-ink">3. How we use your information</h2>
          <p>
            We use your information exclusively to respond to enquiries, scope and deliver client engagements, send relevant operational communications, continuously improve our digital properties, and fulfill legal requirements.
          </p>

          <h2 className="text-xl font-medium text-ink">4. Data storage and security</h2>
          <p>
            Your data is stored securely using industry-standard encryption protocols. We utilize hardened infrastructure providers including Cloudflare and encrypted database environments. We never sell, lease, or monetize your personal data to any third party.
          </p>

          <h2 className="text-xl font-medium text-ink">5. Your rights</h2>
          <p>
            Under POPIA and GDPR, you have the right to access, correct, delete, or port your personal data. You may also object to or restrict processing. To exercise these rights, contact us at brent@streamlinedigitalsolutions.com.
          </p>

          <h2 className="text-xl font-medium text-ink">6. Cookies</h2>
          <p>
            We use essential cookies for site functionality and analytics cookies (Google Analytics, Meta Pixel) with your consent. You can manage cookie preferences through your browser settings.
          </p>

          <h2 className="text-xl font-medium text-ink">7. Contact</h2>
          <p>
            For privacy-related enquiries, contact Streamline Digital Solutions at brent@streamlinedigitalsolutions.com, Cape Town, South Africa.
          </p>

          <p className="text-sm text-grey-400 mt-12">
            Last updated: {new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>
    </section>
  );
}
