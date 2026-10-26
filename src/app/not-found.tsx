import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div
      data-theme="dark"
      className="min-h-screen bg-ink text-paper flex items-center justify-center pt-24 pb-16 px-4"
    >
      <div className="max-w-xl mx-auto text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-accent px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 inline-block mb-6">
          ERROR 404
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-4">
          Page not found.
        </h1>

        <p className="text-paper/70 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
          The page you are looking for doesn&apos;t exist, has moved, or the URL might have a typo.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Button href="/" label="Return to Home" variant="primary" />
          <Button href="/services" label="Explore Services" variant="outline" />
        </div>

        <div className="border-t border-paper/10 pt-8">
          <p className="font-mono text-xs text-paper/40 mb-4">QUICK NAVIGATION</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-sans uppercase tracking-wider text-paper/60">
            <Link href="/work" className="hover:text-accent transition-colors">
              Case Studies
            </Link>
            <Link href="/pricing" className="hover:text-accent transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-accent transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
