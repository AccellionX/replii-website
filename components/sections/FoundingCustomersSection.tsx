import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/lib/constants";
import { FOUNDING_BENEFITS } from "@/lib/data";

export function FoundingCustomersSection() {
  return (
    <section
      id="founding"
      className="section-pad scroll-mt-header"
    >
      <Container>
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-strong)]/20 bg-[var(--surface-dark)] px-6 py-12 shadow-[var(--shadow-lg)] sm:px-10 sm:py-14">
          <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div className="max-w-xl">
              <p className="type-eyebrow !text-[var(--accent-mint)]">
                Founding customer program
              </p>
              <h2 className="type-section mt-3 !text-[var(--text-inverse)]">
                Help us build the best AI reply team for Meta advertisers.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-inverse-muted)] sm:text-lg">
                We’re working closely with businesses that currently rely on
                owners, receptionists, salespeople, or inbox assistants to answer
                repetitive ad inquiries.
              </p>

              <ul className="mt-8 space-y-3">
                {FOUNDING_BENEFITS.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex gap-3 text-sm text-[var(--text-inverse)]/85"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-mint)]"
                      aria-hidden
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <p className="type-subsection !text-[var(--text-inverse)]">
                Apply for founding access
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-inverse-muted)]">
                If you run Meta ads into Instagram, Messenger or WhatsApp and
                want to help refine Replii on live traffic, we’d like to hear
                from you.
              </p>
              <Button href={CTA.founding.href} variant="inverse" className="mt-7" withArrow>
                {CTA.founding.label}
              </Button>
              <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-relaxed text-[var(--text-inverse-muted)]">
                Case studies will be published only with verified customer
                permission and results.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
