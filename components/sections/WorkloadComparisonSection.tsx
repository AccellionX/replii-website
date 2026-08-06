import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WORKLOAD_COMPARISON_ROWS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function WorkloadComparisonSection() {
  return (
    <section
      id="workload"
      className="section-pad scroll-mt-header"
    >
      <Container>
        <SectionHeading
          eyebrow="Before you add another inbox role"
          title="Compare the work, not just the software."
          description="Replii handles the repetitive workload. Your team keeps the conversations that require experience, trust, and judgment."
          align="center"
        />

        {/* Desktop / tablet table */}
        <div className="mt-10 hidden overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)] md:block">
          <div className="table-scroll">
            <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                Comparison of manual inbox work versus Replii
              </caption>
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface-muted)]/50">
                  <th className="px-4 py-3.5 font-medium text-[var(--text-secondary)] sm:px-5">
                    Daily responsibility
                  </th>
                  <th className="px-3 py-3.5 font-[family-name:var(--font-display)] font-semibold text-[var(--text-primary)]">
                    Manual team member
                  </th>
                  <th className="px-3 py-3.5 font-[family-name:var(--font-display)] font-semibold text-[var(--primary-dark)]">
                    Replii
                  </th>
                  <th className="px-3 py-3.5 font-medium text-[var(--text-secondary)] sm:px-5">
                    Human still involved?
                  </th>
                </tr>
              </thead>
              <tbody>
                {WORKLOAD_COMPARISON_ROWS.map((row) => (
                  <tr
                    key={row.responsibility}
                    className="border-b border-[var(--border)] last:border-0"
                  >
                    <td className="px-4 py-3.5 font-medium text-[var(--text-primary)] sm:px-5">
                      {row.responsibility}
                    </td>
                    <td className="px-3 py-3.5 text-[var(--text-secondary)]">
                      {row.manual}
                    </td>
                    <td className="bg-[var(--accent-mint)]/20 px-3 py-3.5 text-[var(--text-primary)]/90">
                      {row.replii}
                    </td>
                    <td className="px-3 py-3.5 sm:px-5">
                      <HumanBadge value={row.human} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile stacked cards */}
        <ul className="mt-10 space-y-4 md:hidden">
          {WORKLOAD_COMPARISON_ROWS.map((row) => (
            <li
              key={row.responsibility}
              className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)]"
            >
              <h3 className="type-subsection !text-base">{row.responsibility}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.1em] text-[var(--text-secondary)]">
                    Manual team member
                  </dt>
                  <dd className="mt-1 text-[var(--text-primary)]/85">
                    {row.manual}
                  </dd>
                </div>
                <div className="rounded-[var(--radius-control)] bg-[var(--accent-mint)]/35 px-3 py-2.5">
                  <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.1em] text-[var(--primary-dark)]/70">
                    Replii
                  </dt>
                  <dd className="mt-1 text-[var(--primary-dark)]">{row.replii}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.1em] text-[var(--text-secondary)]">
                    Human still involved?
                  </dt>
                  <dd>
                    <HumanBadge value={row.human} />
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          Replii handles the repetitive workload. Your team keeps the
          conversations that require experience, trust, and judgment.
        </p>
      </Container>
    </section>
  );
}

function HumanBadge({ value }: { value: string }) {
  const yes = value === "Yes";
  const no = value === "No";
  return (
    <span
      className={cn(
        "inline-flex rounded-md px-2 py-1 text-xs font-medium",
        yes && "bg-[var(--accent-mint)] text-[var(--primary-dark)]",
        no && "bg-[var(--surface-muted)] text-[var(--text-secondary)]",
        !yes && !no && "bg-[var(--primary-soft)] text-[var(--primary-dark)]",
      )}
    >
      {value}
    </span>
  );
}
