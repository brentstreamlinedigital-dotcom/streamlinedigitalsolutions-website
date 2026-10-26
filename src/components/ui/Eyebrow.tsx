interface EyebrowProps {
  label: string;
  className?: string;
}

/**
 * Right-aligned mono label in accent colour.
 * Pattern: "// SECTION NAME" used before major sections.
 */
export default function Eyebrow({ label, className = "" }: EyebrowProps) {
  return (
    <p
      className={`font-label text-xs text-accent-ink text-right mb-6 md:mb-8 ${className}`}
      aria-hidden="true"
    >
      {label}
    </p>
  );
}
