import Link from "next/link";

interface ButtonProps {
  href?: string;
  label: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "default" | "small";
  className?: string;
  type?: "button" | "submit";
}

/**
 * Streamline clean CTA button: General Sans typography, no detached icons or plus artifacts.
 */
export default function Button({
  href,
  label,
  onClick,
  variant = "primary",
  size = "default",
  className = "",
  type = "button",
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-sans font-semibold tracking-wider uppercase transition-all duration-200 select-none";

  const variants = {
    primary: "bg-accent text-ink hover:bg-accent-hover shadow-sm hover:shadow",
    outline: "border border-current text-current hover:bg-accent hover:text-ink hover:border-accent",
    ghost: "text-current hover:text-accent",
  };

  const sizes = {
    default: "px-6 py-3 rounded-lg text-xs md:text-sm",
    small: "px-4 py-2 rounded-md text-xs",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type={type} className={classes}>
      {label}
    </button>
  );
}
