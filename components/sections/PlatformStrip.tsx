import {
  Camera,
  CreditCard,
  Inbox,
  MessageCircle,
  MessagesSquare,
  Sheet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CREDIBILITY_CHANNELS } from "@/lib/data";

const CHANNEL_ICONS: Record<(typeof CREDIBILITY_CHANNELS)[number], LucideIcon> =
  {
    WhatsApp: MessageCircle,
    Instagram: Camera,
    Facebook: MessagesSquare,
    "Live inbox": Inbox,
    "Google Sheets": Sheet,
    "Agency billing": CreditCard,
  };

export function PlatformStrip() {
  return (
    <section
      className="border-y border-[var(--border)] bg-[var(--surface)]"
      aria-label="Supported channels and platform"
    >
      <Container className="py-10 sm:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-base font-medium tracking-tight text-[var(--text-primary)] sm:text-lg">
            WhatsApp, Instagram, and Facebook — one brain
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[0.95rem]">
            The same lead flow, knowledge base, inbox, and human takeover run
            across every client’s own Meta channels. You sell a three-channel
            inbox, not a WhatsApp-only gadget.
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
