import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "mint" | "dark" | "outline";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
};

const variants: Record<BadgeVariant, string> = {
  default:
    "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]",
  mint: "border-transparent bg-[var(--accent-mint)] text-[var(--primary-dark)]",
  dark: "border-white/10 bg-white/8 text-[var(--text-inverse)]/80",
  outline:
    "border-[var(--border-strong)] bg-transparent text-[var(--text-secondary)]",
};

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.6875rem] font-medium tracking-[0.08em] uppercase",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
