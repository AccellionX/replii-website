import {
  CalendarCheck,
  Camera,
  Check,
  FileText,
  Globe,
  HelpCircle,
  ListChecks,
  MessageCircle,
  MessagesSquare,
  Plug,
  RefreshCw,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STAGES = [
  {
    step: "01",
    title: "Connect",
    body: "The owner connects WhatsApp, Instagram, and Facebook on their own brand — not a shared AccellionX number.",
    Visual: ConnectVisual,
  },
  {
    step: "02",
    title: "Template",
    body: "Pick a niche pack. Greeting, questions, FAQs, and menus load in English, Urdu, or Roman Urdu. Edit any line.",
    Visual: TrainVisual,
  },
  {
    step: "03",
    title: "Qualify",
    body: "Ads and organic DMs hit the same operator. It answers from the knowledge base, offers demo slots, or builds a cart.",
    Visual: RespondVisual,
  },
  {
    step: "04",
    title: "Inbox",
    body: "A teammate takes over any chat. Leads, bookings, and orders land in CRM — with an optional Google Sheet upsert.",
    Visual: ConvertVisual,
  },
] as const;

export function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="section-pad scroll-mt-header bg-[var(--surface-muted)]"
    >
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From ad click to booked lead or paid order."
          description="Connect the client’s channels → Template → AI qualifies → Human takeover"
        />

        {/* Mobile: vertical stepper */}
        <ol className="relative mt-12 space-y-0 md:hidden">
          {STAGES.map((stage, i) => {
            const Visual = stage.Visual;
            const isLast = i === STAGES.length - 1;
            return (
              <li
                key={stage.step}
                className="relative flex gap-4 pb-10 last:pb-0"
              >
                <div className="flex flex-col items-center">
                  <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--primary)]/30 bg-[var(--accent-mint)] font-[family-name:var(--font-mono)] text-xs font-medium text-[var(--primary-dark)]">
                    {stage.step}
                  </span>
                  {!isLast ? (
                    <span
                      aria-hidden
                      className="mt-1 w-px flex-1 bg-[var(--border-strong)]/50"
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="type-subsection">{stage.title}</h3>
                  <p className="type-body-muted mt-1.5 text-sm">{stage.body}</p>
                  <div className="mt-4 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[var(--shadow-sm)]">
                    <Visual />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Desktop: connected horizontal flow */}
        <div className="relative mt-14 hidden md:block">
          {/* Connector line */}
          <div
            aria-hidden
            className="absolute top-[1.15rem] right-[12.5%] left-[12.5%] h-px bg-[var(--border-strong)]/60"
          />
          <ol className="relative grid grid-cols-4 gap-5 lg:gap-6">
            {STAGES.map((stage) => {
              const Visual = stage.Visual;
              return (
                <li
                  key={stage.step}
                  className="relative flex flex-col"
                >
                  <div className="mb-5 flex justify-center">
                    <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--primary)]/30 bg-[var(--accent-mint)] font-[family-name:var(--font-mono)] text-xs font-medium text-[var(--primary-dark)] shadow-[var(--shadow-sm)]">
                      {stage.step}
                    </span>
                  </div>
                  <div className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
                    <div className="border-b border-[var(--border)] bg-[var(--background)]/50 px-4 py-4">
                      <h3 className="type-subsection text-center">{stage.title}</h3>
                      <p className="type-body-muted mt-2 text-center text-sm">
                        {stage.body}
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col justify-center p-3.5 lg:p-4">
                      <Visual />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Button href="#product-demo" variant="secondary" size="lg" withArrow>
            See the full product flow
          </Button>
        </div>
      </Container>
    </section>
  );
}

function ConnectVisual() {
  const channels = [
    { name: "WhatsApp", icon: MessageCircle, status: "Connected" },
    { name: "Instagram", icon: Camera, status: "Connected" },
    { name: "Facebook", icon: MessagesSquare, status: "Connected" },
  ];

  return (
    <ul className="space-y-2" aria-label="Channel connections">
      {channels.map((ch) => {
        const Icon = ch.icon;
        return (
          <li
            key={ch.name}
            className="flex items-center justify-between gap-2 rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--background)] px-2.5 py-2"
          >
            <span className="flex min-w-0 items-center gap-2 text-xs font-medium text-[var(--text-primary)]">
              <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--primary)]" />
              <span className="truncate">{ch.name}</span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.06em] text-[var(--success)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
              {ch.status}
            </span>
          </li>
        );
      })}
      <li className="flex items-center gap-2 px-1 pt-1 text-[0.6875rem] text-[var(--text-secondary)]">
        <Plug className="h-3 w-3 text-[var(--primary)]" />
        Own WABA · Embedded Signup
      </li>
    </ul>
  );
}

function TrainVisual() {
  const sources = [
    { name: "Clinic", icon: HelpCircle },
    { name: "Restaurant", icon: Globe },
    { name: "Retail", icon: FileText },
    { name: "Services", icon: ListChecks },
  ];

  return (
    <div aria-label="Knowledge sources">
      <div className="grid grid-cols-2 gap-2">
        {sources.map((src) => {
          const Icon = src.icon;
          return (
            <div
              key={src.name}
              className="flex flex-col items-start gap-1.5 rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--background)] px-2.5 py-2.5"
            >
              <Icon className="h-3.5 w-3.5 text-[var(--primary)]" />
              <span className="text-xs font-medium text-[var(--text-primary)]">
                {src.name}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-2.5 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.08em] text-[var(--text-secondary)]">
        40+ packs · EN · Urdu · Roman Urdu
      </p>
    </div>
  );
}

function RespondVisual() {
  return (
    <div className="space-y-2.5" aria-label="Live response thread">
      <div className="rounded-2xl rounded-bl-md bg-[var(--surface-muted)] px-2.5 py-2 text-[0.6875rem] leading-relaxed text-[var(--text-primary)]">
        Do you deliver biryani tonight?
      </div>
      <div className="ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-[var(--accent-mint)] px-2.5 py-2 text-[0.6875rem] leading-relaxed text-[var(--primary-dark)]">
        Yes — chicken or mutton? I can take the order here.
      </div>
      <div className="flex flex-wrap gap-1.5 pt-0.5">
        <span className="rounded-full bg-[var(--accent-mint)]/70 px-2 py-0.5 font-[family-name:var(--font-mono)] text-[0.5625rem] uppercase tracking-[0.06em] text-[var(--primary-dark)]">
          Channel: WhatsApp
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[0.5625rem] uppercase tracking-[0.06em] text-[var(--text-secondary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
          Cart open
        </span>
      </div>
    </div>
  );
}

function ConvertVisual() {
  const actions = [
    { label: "Lead in pipeline", icon: CalendarCheck },
    { label: "Optional Sheet upsert", icon: RefreshCw },
    { label: "Human takeover ready", icon: UserRound },
  ];

  return (
    <ul className="space-y-2" aria-label="Conversion outcomes">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <li
            key={action.label}
            className="flex items-center gap-2 rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--background)] px-2.5 py-2"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--accent-mint)] text-[var(--primary-dark)]">
              <Icon className="h-3 w-3" />
            </span>
            <span className="min-w-0 flex-1 truncate text-xs font-medium text-[var(--text-primary)]">
              {action.label}
            </span>
            <Check className="h-3.5 w-3.5 shrink-0 text-[var(--success)]" />
          </li>
        );
      })}
    </ul>
  );
}
