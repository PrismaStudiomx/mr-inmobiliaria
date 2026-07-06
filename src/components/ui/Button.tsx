import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  external?: boolean;
  type?: "button" | "submit";
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#C9A24A] text-[#0B0B0B] hover:bg-[#E6C875] border border-[#C9A24A]",
  secondary:
    "bg-transparent text-current border border-current hover:bg-black/5",
  ghost:
    "bg-transparent text-current border border-transparent hover:text-[#C9A24A]",
};

export function Button({
  href,
  children,
  className,
  variant = "primary",
  external = false,
  type = "button",
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24A] focus-visible:ring-offset-2",
    variants[variant],
    className
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}