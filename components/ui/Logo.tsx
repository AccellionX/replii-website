import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
};

/**
 * Custom Replii mark: three staggered reply arcs suggesting
 * fast conversation flow across Instagram, Messenger, and WhatsApp.
 */
export function Logo({
  className,
  markClassName,
  showWordmark = true,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-8 w-8 shrink-0", markClassName)}
        aria-hidden={showWordmark}
        role={showWordmark ? undefined : "img"}
        aria-label={showWordmark ? undefined : "Replii"}
      >
        <rect width="32" height="32" rx="9" fill="var(--surface-dark)" />
        {/* Channel 1 — outer arc (fast reply sweep) */}
        <path
          d="M9 11.5c4.2-3.2 9.8-3.2 14 0"
          stroke="var(--accent-mint)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.45"
        />
        {/* Channel 2 — middle arc */}
        <path
          d="M10.5 16c3.2-2.4 7.8-2.4 11 0"
          stroke="var(--accent-mint)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.75"
        />
        {/* Channel 3 — inner arc + reply tip */}
        <path
          d="M12 20.5c2.2-1.6 5.8-1.6 8 0"
          stroke="var(--accent-mint)"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
        <circle cx="22.5" cy="21.25" r="1.65" fill="var(--primary)" />
      </svg>
      {showWordmark ? (
        <span className="font-[family-name:var(--font-display)] text-[1.2rem] font-semibold tracking-tight text-[var(--text-primary)]">
          Replii
        </span>
      ) : null}
    </span>
  );
}
