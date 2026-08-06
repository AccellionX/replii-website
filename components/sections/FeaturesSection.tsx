import {
  BarChart3,
  BookOpen,
  Building2,
  CalendarCheck,
  FileText,
  Globe2,
  LayoutTemplate,
  Megaphone,
  MessagesSquare,
  Sheet,
  Sparkles,
  Webhook,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  MEDIUM_FEATURES as MEDIUM_FEATURE_COPY,
  SMALL_FEATURES as SMALL_FEATURE_TITLES,
} from "@/lib/data";
import { cn } from "@/lib/utils";

const MEDIUM_ICONS: LucideIcon[] = [BookOpen, CalendarCheck, Sheet];

const SMALL_ICONS: LucideIcon[] = [
  FileText,
  Megaphone,
  Building2,
  Globe2,
  BarChart3,
  Workflow,
  LayoutTemplate,
  Webhook,
];

const MEDIUM_FEATURES = MEDIUM_FEATURE_COPY.map((feature, i) => ({
  ...feature,
  icon: MEDIUM_ICONS[i]!,
}));

const SMALL_FEATURES = SMALL_FEATURE_TITLES.map((feature, i) => ({
  ...feature,
  icon: SMALL_ICONS[i]!,
}));

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="section-pad scroll-mt-header bg-[var(--surface-muted)]"
    >
      <Container>
        <SectionHeading
          eyebrow="The Replii platform"
          title="Everything an inbox assistant handles before the sale."
          description="Replii covers the repetitive first-response layer while keeping your team in full control of every important conversation."
        />

        {/* Bento grid */}
        <div className="mt-12 grid gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-6">
          {/* Large: 24/7 + instant response */}
          <article className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)] lg:col-span-4 lg:row-span-2">
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] bg-[var(--accent-mint)] text-[var(--primary-dark)]">
                <Sparkles className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="type-subsection mt-5 !text-xl sm:!text-[1.35rem]">
                24/7 inbox monitoring and instant first response
              </h3>
              <p className="type-body-muted mt-3 max-w-xl text-sm sm:text-[0.95rem]">
                Reduce the need for someone to sit in Instagram, Messenger and
                WhatsApp all day. Replii watches connected channels and answers
                common questions the moment a lead writes in.
              </p>
            </div>
            <div className="border-t border-[var(--border)] bg-[var(--background)]/70 p-4 sm:p-5">
              <QualificationFlowVisual />
            </div>
          </article>

          {/* Large: Live inbox */}
          <article className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)] lg:col-span-2 lg:row-span-2">
            <div className="p-6 sm:p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] bg-[var(--accent-mint)] text-[var(--primary-dark)]">
                <MessagesSquare className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="type-subsection mt-5">
                Automated qualification and human takeover
              </h3>
              <p className="type-body-muted mt-3 text-sm">
                Collect the details your team normally asks by hand, then step
                in whenever a lead needs a person.
              </p>
            </div>
            <div className="mt-auto border-t border-[var(--border)] bg-[var(--background)]/70 p-4">
              <InboxPreviewVisual />
            </div>
          </article>

          {/* Large: Ad attribution */}
          <article className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)] lg:col-span-6">
            <div className="grid gap-0 md:grid-cols-[1fr_1.1fr]">
              <div className="p-6 sm:p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] bg-[var(--accent-mint)] text-[var(--primary-dark)]">
                  <BarChart3 className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="type-subsection mt-5 !text-xl">
                  Lead summaries and ad attribution
                </h3>
                <p className="type-body-muted mt-3 max-w-md text-sm sm:text-[0.95rem]">
                  Stop rebuilding context from scratch—open the summary, source
                  ad and recommended next step before your team replies.
                </p>
              </div>
              <div className="border-t border-[var(--border)] bg-[var(--surface-dark)] p-4 sm:p-5 md:border-t-0 md:border-l">
                <AttributionVisual />
              </div>
            </div>
          </article>

          {/* Medium cards */}
          {MEDIUM_FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] sm:p-7 lg:col-span-2"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--background)] text-[var(--primary)]">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <h3 className="type-subsection mt-4">{feature.title}</h3>
                <p className="type-body-muted mt-2 text-sm">{feature.body}</p>
              </article>
            );
          })}
        </div>

        {/* Smaller capability chips / cards */}
        <div className="mt-4 sm:mt-5">
          <p className="type-metric-label mb-4">Also included</p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SMALL_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <li
                  key={feature.title}
                  className="flex items-center gap-3 rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 shadow-[var(--shadow-sm)]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--accent-mint)]/60 text-[var(--primary-dark)]">
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </span>
                  <span className="text-sm font-medium leading-snug text-[var(--text-primary)]">
                    {feature.title}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function QualificationFlowVisual() {
  const steps = [
    { q: "Service needed?", a: "Single implant" },
    { q: "Timeline?", a: "This month" },
    { q: "Score", a: "High intent · 92" },
  ];

  return (
    <div aria-hidden className="space-y-2">
      <div className="mb-3 flex flex-wrap gap-1.5">
        <Badge variant="mint">Instagram</Badge>
        <Badge variant="outline">Messenger</Badge>
        <Badge variant="outline">WhatsApp</Badge>
      </div>
      {steps.map((step, i) => (
        <div
          key={step.q}
          className={cn(
            "flex items-center justify-between gap-3 rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-xs sm:text-sm",
            i === steps.length - 1 && "border-[var(--primary)]/25 bg-[var(--accent-mint)]/40",
          )}
        >
          <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.08em] text-[var(--text-secondary)]">
            {step.q}
          </span>
          <span className="font-medium text-[var(--text-primary)]">{step.a}</span>
        </div>
      ))}
    </div>
  );
}

function InboxPreviewVisual() {
  const rows = [
    { name: "Amina", status: "Needs human", hot: true },
    { name: "Jordan", status: "Qualifying", hot: false },
    { name: "Priya", status: "Booked", hot: false },
  ];

  return (
    <ul aria-hidden className="space-y-2">
      {rows.map((row) => (
        <li
          key={row.name}
          className="flex items-center justify-between gap-2 rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2"
        >
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-[var(--text-primary)]">
              {row.name}
            </p>
            <p className="text-[0.6875rem] text-[var(--text-secondary)]">
              {row.status}
            </p>
          </div>
          {row.hot ? (
            <span className="shrink-0 rounded-md bg-[var(--primary)] px-2 py-1 text-[0.625rem] font-medium text-[var(--text-inverse)]">
              Take over
            </span>
          ) : (
            <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--border-strong)]" />
          )}
        </li>
      ))}
    </ul>
  );
}

function AttributionVisual() {
  const rows = [
    ["Campaign", "Dental Implants — August"],
    ["Ad set", "Implant intent · Lookalike"],
    ["Creative", "Before/after · Reel"],
    ["Channel", "Instagram click-to-DM"],
  ] as const;

  return (
    <div aria-hidden>
      <p className="font-[family-name:var(--font-mono)] text-[0.625rem] font-medium uppercase tracking-[0.12em] text-[var(--accent-mint)]/75">
        Conversation source
      </p>
      <ul className="mt-4 space-y-3">
        {rows.map(([label, value]) => (
          <li
            key={label}
            className="flex items-start justify-between gap-4 border-b border-white/10 pb-2.5 text-sm last:border-0 last:pb-0"
          >
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.08em] text-[var(--text-inverse-muted)]">
              {label}
            </span>
            <span className="text-right font-medium text-[var(--text-inverse)]">
              {value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
