import {
  Camera,
  MessageCircle,
  MessagesSquare,
  Sheet,
  Database,
  Webhook,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CREDIBILITY_CHANNELS } from "@/lib/data";

const CHANNEL_ICONS: Record<(typeof CREDIBILITY_CHANNELS)[number], LucideIcon> =
  {
    Instagram: Camera,
    Messenger: MessagesSquare,
    WhatsApp: MessageCircle,
    "Google Sheets": Sheet,
    CRM: Database,
    Webhooks: Webhook,
  };

export function PlatformStrip() {
  return (
    <section
      className="border-y border-[var(--border)] bg-[var(--surface)]"
      aria-label="Supported channels and integrations"
    >
      <Container className="py-10 sm:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-base font-medium tracking-tight text-[var(--text-primary)] sm:text-lg">
            One AI reply team across every messaging channel
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[0.95rem]">
            Replii monitors Instagram, Messenger, and WhatsApp so your staff does
            not have to switch between inboxes all day.
          </p>
        </div>

        <ul className="mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {CREDIBILITY_CHANNELS.map((name) => {
            const Icon = CHANNEL_ICONS[name];
            return (
              <li key={name}>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)] px-3.5 py-2 text-sm text-[var(--text-primary)] shadow-[var(--shadow-sm)]">
                  <Icon
                    className="h-4 w-4 text-[var(--primary)]"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  {name}
                </span>
              </li>
            );
          })}
        </ul>

        <p className="sr-only">
          Channel and integration names indicate compatibility only and do not
          imply endorsement by those companies.
        </p>
      </Container>
    </section>
  );
}
