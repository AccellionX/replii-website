import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AUDIENCE_BUYERS, AUDIENCE_CLIENTS, AUDIENCE_ROLES } from "@/lib/data";

export function AudienceSection() {
  return (
    <section id="audience" className="section-pad scroll-mt-header">
      <Container>
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-strong)]/20 bg-[var(--surface-dark)] px-6 py-12 shadow-[var(--shadow-lg)] sm:px-10 sm:py-14">
          <div className="max-w-2xl">
            <p className="type-eyebrow !text-[var(--accent-mint)]">
              Who this is for
            </p>
            <h2 className="type-section mt-3 !text-[var(--text-inverse)]">
              Sold to agencies. Used by their clients. Never billed to the shop.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-inverse-muted)] sm:text-lg">
              If you do not run ads or DMs for other businesses, you are not the
              buyer. Ask your agency to subscribe, or become an agency on Launch.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-6">
              <p className="type-metric-label !text-[var(--accent-mint)]">
                Primary buyer — the agency
              </p>
              <ul className="mt-4 space-y-3">
                {AUDIENCE_BUYERS.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm text-[var(--text-inverse)]/85"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-mint)]"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-6">
              <p className="type-metric-label !text-[var(--text-inverse-muted)]">
                End users — the agency’s clients
              </p>
              <ul className="mt-4 space-y-3">
                {AUDIENCE_CLIENTS.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm text-[var(--text-inverse)]/85"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-mint)]"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {AUDIENCE_ROLES.map((role) => (
              <li
                key={role.title}
                className="rounded-[var(--radius-control)] border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--text-inverse)]">
                  {role.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-inverse-muted)]">
                  {role.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
