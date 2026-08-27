import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";
type ButtonSize = "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  name?: string;
  withArrow?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--primary)] text-[var(--text-inverse)] hover:bg-[var(--primary-hover)] shadow-[var(--shadow-sm)]",
  secondary:
    "bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-muted)] shadow-[var(--shadow-sm)]",
  ghost:
    "bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface-muted)]",
  inverse:
    "bg-[var(--surface)] text-[var(--surface-dark)] hover:bg-[var(--accent-mint)] shadow-[var(--shadow-sm)]",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-[0.9375rem]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  type = "button",
  disabled,
  onClick,
  name,
  withArrow = false,
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] font-medium tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      {children}
      {withArrow ? (
        <ArrowRight
          className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          aria-hidden
        />
      ) : null}
    </>
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={classes}
      type={type}
      disabled={disabled}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      name={name}
    >
      {content}
    </button>
  );
}
