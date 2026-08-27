import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const KPIS = [
  { label: "Leads this month", value: "342" },
  { label: "Qualified / booked", value: "214" },
  { label: "AI conversations", value: "1,186" },
  { label: "Median first-response", value: "3 sec" },
  { label: "Orders captured", value: "86" },
  { label: "Human takeovers", value: "37" },
] as const;

const WORKLOAD_AVOIDED = [
  { label: "Initial replies", value: "342" },
  { label: "FAQ responses", value: "518" },
  { label: "Qualification questions", value: "856" },
  { label: "Lead summaries", value: "214" },
  { label: "Routing actions", value: "119" },
] as const;

/** Illustrative 7-day volume — not real customer data */
const WEEK_LEADS = [28, 36, 31, 48, 42, 55, 52] as const;
const WEEK_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const FUNNEL = [
  { label: "Captured", value: 342, width: "100%" },
  { label: "Engaged", value: 298, width: "87%" },
  { label: "Qualified", value: 214, width: "63%" },
  { label: "Booked / handed off", value: 119, width: "35%" },
] as const;

const CHANNELS = [
  { name: "WhatsApp", pct: 48, color: "bg-[var(--accent-mint)]" },
  { name: "Instagram", pct: 31, color: "bg-[var(--primary)]" },
  { name: "Facebook", pct: 21, color: "bg-white/35" },
] as const;

const CAMPAIGNS = [
  { name: "Dental Implants — Aug", leads: 86, qualified: 54, rate: "63%" },
  { name: "Downtown Apartments", leads: 71, qualified: 42, rate: "59%" },
  { name: "Emergency Plumbing", leads: 64, qualified: 48, rate: "75%" },
  { name: "Whitening Consult", leads: 52, qualified: 31, rate: "60%" },
] as const;

const LEADS = [
  {
    lead: "Amina",
    channel: "WhatsApp",
    campaign: "Emergency Plumbing",
    intent: "High",
    status: "Human takeover",
    activity: "2m ago",
  },
  {
    lead: "Jordan",
    channel: "Instagram",
    campaign: "Dental Implants — Aug",
    intent: "High",
    status: "Appointment requested",
    activity: "11m ago",
  },
  {
    lead: "Priya",
    channel: "Facebook",
    campaign: "Downtown Apartments",
    intent: "Medium",
    status: "Qualified",
    activity: "24m ago",
  },
  {
    lead: "Noah",
    channel: "Instagram",
    campaign: "Whitening Consult",
    intent: "Medium",
    status: "Follow-up required",
    activity: "1h ago",
  },
  {
    lead: "Elena",
    channel: "WhatsApp",
    campaign: "Dental Implants — Aug",
    intent: "High",
    status: "Qualified",
    activity: "2h ago",
  },
] as const;

function statusStyles(status: string) {
  switch (status) {
    case "Qualified":
      return "bg-[var(--accent-mint)]/20 text-[var(--accent-mint)]";
    case "Appointment requested":
      return "bg-[var(--primary)]/25 text-[var(--accent-mint)]";
    case "Human takeover":
      return "bg-amber-400/15 text-amber-200";
    case "Follow-up required":
      return "bg-white/10 text-[var(--text-inverse)]/70";
    default:
      return "bg-white/10 text-[var(--text-inverse)]/70";
  }
}

export function DashboardSection() {
  const maxLeads = Math.max(...WEEK_LEADS);

  return (
    <section
      id="results"
      className="section-pad scroll-mt-header bg-[var(--surface-dark)] text-[var(--text-inverse)]"
    >
      <Container className="min-w-0">
        <div className="max-w-2xl">
          <p className="type-eyebrow !text-[var(--accent-mint)]">
            Client analytics
          </p>
          <h2 className="type-section mt-3 !text-[var(--text-inverse)]">
            Usage and analytics you can show in monthly reports.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-inverse-muted)] sm:text-lg">
            Leads today and this month, conversations, channel mix, and human
            takeovers — pooled across the clients on your agency plan.
          </p>
        </div>

        <div className="mt-10 min-w-0 sm:mt-12">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
            <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[var(--accent-mint)]/80">
              Sample dashboard
            </p>
            <p className="text-xs text-[var(--text-inverse-muted)]">
              Illustrative data shown for product demonstration.
            </p>
          </div>

          {/* Browser mockup */}
          <div className="min-w-0 overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-[#0a1210] shadow-[var(--shadow-lg)]">
            {/* Chrome — simplified on mobile */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-3 py-2.5 sm:px-4">
              <div className="hidden items-center gap-1.5 sm:flex" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
              <div className="min-w-0 flex-1 rounded-md border border-white/10 bg-black/30 px-3 py-1.5">
                <p className="truncate font-[family-name:var(--font-mono)] text-[0.6875rem] text-[var(--text-inverse)]/50">
                  app.replii.accellionx.com / dashboard
                </p>
              </div>
            </div>

            <div className="space-y-4 p-3 sm:space-y-5 sm:p-5 lg:p-6">
              {/* KPIs */}
              <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                {KPIS.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-[var(--radius-control)] border border-white/10 bg-white/[0.04] px-4 py-4"
                  >
                    <p className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.1em] text-[var(--text-inverse-muted)]">
                      {kpi.label}
                    </p>
                    <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--text-inverse)] sm:text-[1.65rem]">
                      {kpi.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Manual inbox work avoided */}
              <div className="rounded-[var(--radius-control)] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                <p className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.1em] text-[var(--text-inverse-muted)]">
                  First-response work handled
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {WORKLOAD_AVOIDED.map((item) => (
                    <li
                      key={item.label}
                      className="rounded-[var(--radius-control)] border border-white/10 bg-white/[0.04] px-3 py-3"
                    >
                      <p className="text-xs text-[var(--text-inverse-muted)]">
                        {item.label}
                      </p>
                      <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--accent-mint)]">
                        {item.value}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Charts row */}
              <div className="grid min-w-0 gap-4 lg:grid-cols-2">
                {/* 7-day chart */}
                <div className="min-w-0 rounded-[var(--radius-control)] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                  <p className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.1em] text-[var(--text-inverse-muted)]">
                    Seven-day leads
                  </p>
                  <div
                    className="mt-5 flex h-36 items-end gap-1.5 sm:gap-2"
                    role="img"
                    aria-label="Bar chart of illustrative lead volume over seven days"
                  >
                    {WEEK_LEADS.map((value, i) => {
                      const pct = (value / maxLeads) * 100;
                      return (
                        <div
                          key={WEEK_LABELS[i]}
                          className="flex min-w-0 flex-1 flex-col items-center gap-2"
                        >
                          <div
                            className="w-full max-w-[2.25rem] rounded-t-md bg-[linear-gradient(180deg,var(--accent-mint),var(--primary))] opacity-90"
                            style={{ height: `${pct}%`, minHeight: 4 }}
                          />
                          <span className="font-[family-name:var(--font-mono)] text-[0.5625rem] text-[var(--text-inverse-muted)]">
                            {WEEK_LABELS[i]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Funnel */}
                <div className="min-w-0 rounded-[var(--radius-control)] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                  <p className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.1em] text-[var(--text-inverse-muted)]">
                    Qualification funnel
                  </p>
                  <ul className="mt-5 space-y-3">
                    {FUNNEL.map((step) => (
                      <li key={step.label}>
                        <div className="mb-1 flex items-center justify-between gap-2 text-xs">
                          <span className="text-[var(--text-inverse)]/70">
                            {step.label}
                          </span>
                          <span className="font-[family-name:var(--font-mono)] text-[var(--accent-mint)]">
                            {step.value}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/5">
                          <div
                            className="h-full rounded-full bg-[var(--primary)]"
                            style={{ width: step.width }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Channel + campaigns */}
              <div className="grid min-w-0 gap-4 lg:grid-cols-2">
                <div className="rounded-[var(--radius-control)] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                  <p className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.1em] text-[var(--text-inverse-muted)]">
                    Channel breakdown
                  </p>
                  <ul className="mt-5 space-y-4">
                    {CHANNELS.map((ch) => (
                      <li key={ch.name}>
                        <div className="mb-1.5 flex justify-between text-sm">
                          <span className="text-[var(--text-inverse)]/80">
                            {ch.name}
                          </span>
                          <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-inverse)]/50">
                            {ch.pct}%
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/5">
                          <div
                            className={cn("h-full rounded-full", ch.color)}
                            style={{ width: `${ch.pct}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="min-w-0 rounded-[var(--radius-control)] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                  <p className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.1em] text-[var(--text-inverse-muted)]">
                    Campaign performance
                  </p>
                  <ul className="mt-4 divide-y divide-white/10">
                    {CAMPAIGNS.map((c) => (
                      <li
                        key={c.name}
                        className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm first:pt-0 last:pb-0"
                      >
                        <span className="min-w-0 flex-1 truncate text-[var(--text-inverse)]/85">
                          {c.name}
                        </span>
                        <span className="shrink-0 font-[family-name:var(--font-mono)] text-[0.6875rem] text-[var(--text-inverse-muted)]">
                          {c.leads} leads · {c.qualified} qual · {c.rate}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recent leads table */}
              <div className="min-w-0 rounded-[var(--radius-control)] border border-white/10 bg-white/[0.03]">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3 sm:px-5">
                  <p className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.1em] text-[var(--text-inverse-muted)]">
                    Recent leads
                  </p>
                  <p className="text-[0.6875rem] text-[var(--text-inverse-muted)]">
                    Sample names for demonstration only
                  </p>
                </div>
                <div className="table-scroll">
                  <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                    <caption className="sr-only">
                      Sample recent leads for product demonstration
                    </caption>
                    <thead>
                      <tr className="border-b border-white/10 text-[0.6875rem] text-[var(--text-inverse-muted)]">
                        <th className="px-4 py-3 font-medium sm:px-5">Lead</th>
                        <th className="px-3 py-3 font-medium">Channel</th>
                        <th className="px-3 py-3 font-medium">Campaign</th>
                        <th className="px-3 py-3 font-medium">Intent</th>
                        <th className="px-3 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium sm:px-5">
                          Last activity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {LEADS.map((row) => (
                        <tr
                          key={row.lead}
                          className="border-b border-white/5 last:border-0"
                        >
                          <td className="px-4 py-3 font-medium text-[var(--text-inverse)] sm:px-5">
                            {row.lead}
                          </td>
                          <td className="px-3 py-3 text-[var(--text-inverse)]/70">
                            {row.channel}
                          </td>
                          <td className="max-w-[10rem] truncate px-3 py-3 text-[var(--text-inverse)]/70">
                            {row.campaign}
                          </td>
                          <td className="px-3 py-3 text-[var(--text-inverse)]/70">
                            {row.intent}
                          </td>
                          <td className="px-3 py-3">
                            <span
                              className={cn(
                                "inline-flex rounded-md px-2 py-1 text-[0.6875rem] font-medium",
                                statusStyles(row.status),
                              )}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-[family-name:var(--font-mono)] text-xs text-[var(--text-inverse-muted)] sm:px-5">
                            {row.activity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Callout */}
              <p className="rounded-[var(--radius-control)] border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-3.5 text-sm leading-relaxed text-[var(--accent-mint)]/90 sm:px-5">
                Open any lead to see the source ad, full conversation,
                qualification path and outcome.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
