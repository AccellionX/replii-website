import { Check, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  PROBLEM_TIMELINE,
  PROBLEM_WITH,
  PROBLEM_WITHOUT,
} from "@/lib/data";
import { cn } from "@/lib/utils";

export function ProblemSection() {
  return (
    <section className="section-pad bg-[var(--surface-dark)] text-[var(--text-inverse)]">
      <Container>
        <div className="max-w-2xl">
          <p className="type-eyebrow !text-[var(--accent-mint)]">
            The problem agencies actually have
          </p>
          <h2 className="type-section mt-3 !text-[var(--text-inverse)]">
            The click is not the problem — the first reply is.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-inverse-muted)] sm:text-lg">
            Paid traffic on Meta is expensive. When a restaurant, clinic, or
            retailer runs WhatsApp, Instagram, or Facebook ads, most leads sit
            unread. After 5–10 minutes, intent dies. Agencies lose retainers
            because “the ads didn’t work,” when the real leak was the inbox.
          </p>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {PROBLEM_TIMELINE.map((item, i) => (
            <li
              key={`${item.time}-${item.label}`}
              className={cn(
                "rounded-[var(--radius-card)] border p-5",
                item.accent
                  ? "border-[var(--accent-mint)]/35 bg-[var(--accent-mint)]/10"
                  : "border-white/10 bg-white/[0.04]",
              )}
            >
              <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--accent-mint)]">
                {item.time}
              </p>
              <p className="mt-2 text-sm font-medium leading-snug text-[var(--text-inverse)]">
                <span className="mr-1.5 text-[var(--text-inverse-muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5">
          <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.03] p-6">
            <p className="type-metric-label !text-[var(--text-inverse-muted)]">
              Agencies without Replii
            </p>
            <ul className="mt-4 space-y-3">
              {PROBLEM_WITHOUT.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm text-[var(--text-inverse-muted)]"
                >
                  <X
                    className="mt-0.5 h-4 w-4 shrink-0 text-red-400/90"
                    strokeWidth={2}
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--radius-card)] border border-[var(--accent-mint)]/30 bg-[var(--accent-mint)]/10 p-6">
            <p className="type-metric-label !text-[var(--accent-mint)]">
              With Replii
            </p>
            <ul className="mt-4 space-y-3">
              {PROBLEM_WITH.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm text-[var(--text-inverse)]"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-mint)]"
                    strokeWidth={2}
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 rounded-[var(--radius-card)] border border-[var(--accent-mint)]/25 bg-[var(--accent-mint)]/10 px-5 py-4 text-sm leading-relaxed text-[var(--accent-mint)] sm:text-base">
          Replii does not remove the human relationship. It staffs the first
          reply so the ads — and the retainer — actually work.
        </p>
      </Container>
    </section>
  );
}
