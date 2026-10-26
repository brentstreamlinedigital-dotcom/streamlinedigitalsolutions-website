import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Streamline Digital Solutions. POPIA and GDPR compliant.",
};

export default function PrivacyPolicyPage() {
  return (
    <section data-theme="light" className="bg-paper text-ink pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="grid-container">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-12">
          Privacy Policy.
        </h1>

        <div className="prose max-w-3xl space-y-8 text-grey-700 leading-relaxed">
          <p className="text-accent-ink font-label text-xs">
            [LEGAL REVIEW] This is placeholder privacy policy copy. Must be reviewed by a legal professional before launch. Must comply with POPIA (South Africa) and GDPR (EU).
          </p>

          <h2 className="text-xl font-medium text-ink mt-8">1. Introduction</h2>
          <p>
            Streamline Digital Solutions ("we", "our", "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, store, and protect your information when you visit our website or use our services.
          </p>

          <h2 className="text-xl font-medium text-ink">2. Information we collect</h2>
          <p>
            We collect information you provide directly to us, including your name, email address, company name, store URL, and any messages you send through our contact form. We also collect usage data through analytics tools including page views, referral sources, and device information.
          </p>

          <h2 className="text-xl font-medium text-ink">3. How we use your information</h2>
          <p>
            We use your information to respond to enquiries, provide our services, send relevant communications (with your consent), improve our website, and comply with legal obligations.
          </p>

          <h2 className="text-xl font-medium text-ink">4. Data storage and security</h2>
          <p>
            Your data is stored securely using industry-standard encryption. We use Supabase for data storage and Vercel for hosting. We do not sell your personal data to third parties.
          </p>

          <h2 className="text-xl font-medium text-ink">5. Your rights</h2>
          <p>
            Under POPIA and GDPR, you have the right to access, correct, delete, or port your personal data. You may also object to or restrict processing. To exercise these rights, contact us at hello@streamlinedigitalsolutions.com.
          </p>

          <h2 className="text-xl font-medium text-ink">6. Cookies</h2>
          <p>
            We use essential cookies for site functionality and analytics cookies (Google Analytics, Meta Pixel) with your consent. You can manage cookie preferences through your browser settings.
          </p>

          <h2 className="text-xl font-medium text-ink">7. Contact</h2>
          <p>
            For privacy-related enquiries, contact Streamline Digital Solutions at hello@streamlinedigitalsolutions.com, Cape Town, South Africa.
          </p>

          <p className="text-sm text-grey-400 mt-12">
            Last updated: {new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>
    </section>
  );
}
