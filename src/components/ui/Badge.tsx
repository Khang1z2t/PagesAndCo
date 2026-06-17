import { cn } from "@/lib/utils";
import type { BookBadge } from "@/types";

interface BadgeProps {
  label: BookBadge;
  className?: string;
}

export function Badge({ label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] shadow-sm",
        label === "BESTSELLER"
          ? "bg-[var(--color-gold)] text-[var(--color-charcoal)]"
          : "bg-white text-[var(--color-crimson)]",
        className,
      )}
    >
      {label}
    </span>
  );
}
