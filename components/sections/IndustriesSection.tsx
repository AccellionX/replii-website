import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industryUseCases, NICHE_TEMPLATE_CATEGORIES } from "@/lib/data";

export function IndustriesSection() {
  return (
    <section
      id="industries"
      className="section-pad scroll-mt-header bg-[var(--surface-muted)]"
    >
      <Container>
        <SectionHeading
          eyebrow="Niche templates"
          title="Start from a vertical, then edit."
          description="40+ niche starter packs seed greeting, questions, FAQs, and menus. Every line is editable — English, Urdu, or Roman Urdu."
        />

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {NICHE_TEMPLATE_CATEGORIES.map((item) => (
            <li
              key={item.category}
              className="rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-sm)]"
            >
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {item.category}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                {item.packs}
              </p>
            </li>
          ))}
        </ul>

        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {industryUseCases.map((item) => (
            <li
              key={item.name}
              className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]"
            >
              <div className="border-b border-[var(--border)] px-5 py-4">
                <h3 className="type-subsection">{item.name}</h3>
              </div>

              <div
                className="space-y-2.5 bg-[var(--background)]/60 px-4 py-4"
                aria-hidden
              >
                <div className="max-w-[92%] rounded-2xl rounded-bl-md bg-[var(--surface-muted)] px-3 py-2 text-[0.8125rem] leading-relaxed text-[var(--text-primary)]">
                  <span className="mb-0.5 block font-[family-name:var(--font-mono)] text-[0.5625rem] uppercase tracking-[0.1em] text-[var(--text-secondary)]">
                    Incoming
                  </span>
                  {item.question}
                </div>
                <div className="ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-[var(--accent-mint)] px-3 py-2 text-[0.8125rem] leading-relaxed text-[var(--primary-dark)]">
                  <span className="mb-0.5 block font-[family-name:var(--font-mono)] text-[0.5625rem] uppercase tracking-[0.1em] text-[var(--primary-dark)]/65">
                    Replii
                  </span>
                  Qualifying now…
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 px-5 py-4">
                <div>
                  <p className="font-[family-name:var(--font-mono)] text-[0.625rem] font-medium uppercase tracking-[0.1em] text-[var(--text-secondary)]">
                    What staff usually answer
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-primary)]">
                    {item.staffUsuallyAnswer}
                  </p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-mono)] text-[0.625rem] font-medium uppercase tracking-[0.1em] text-[var(--text-secondary)]">
                    What Replii handles
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-primary)]">
                    {item.repliiHandles}
                  </p>
                </div>
                <div className="mt-auto flex items-start gap-2 rounded-[var(--radius-control)] border border-[var(--primary)]/20 bg-[var(--accent-mint)]/35 px-3 py-2.5">
                  <ArrowRight
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--primary-dark)]"
                    aria-hidden
                  />
                  <div>
                    <p className="font-[family-name:var(--font-mono)] text-[0.625rem] font-medium uppercase tracking-[0.1em] text-[var(--primary-dark)]/70">
                      Action
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-[var(--primary-dark)]">
                      {item.action}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
