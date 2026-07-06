import { cn } from "@/lib/utils";

type BadgeVariant = "dark" | "gold" | "light";

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variants: Record<BadgeVariant, string> = {
  dark: "bg-[#0B0B0B] text-[#FFFDF8]",
  gold: "bg-[#C9A24A] text-[#0B0B0B]",
  light: "bg-[#F7F3EA] text-[#252525]",
};

export function Badge({ children, variant = "dark", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}