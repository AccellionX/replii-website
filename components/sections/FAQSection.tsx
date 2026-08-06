"use client";

import { useCallback, useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ_GROUPS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const baseId = useId();
  const [openKey, setOpenKey] = useState<string | null>(
    `${FAQ_GROUPS[0]?.id}-0`,
  );

  const handleToggle = useCallback(
    (key: string) => (event: React.SyntheticEvent<HTMLDetailsElement>) => {
      const isOpen = event.currentTarget.open;
      if (isOpen) {
        setOpenKey(key);
      } else if (openKey === key) {
        setOpenKey(null);
      }
    },
    [openKey],
  );

  return (
    <section
      id="faq"
      className="section-pad scroll-mt-header bg-[var(--surface-muted)]"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions before you connect your channels."
          />

          <div className="space-y-10">
            {FAQ_GROUPS.map((group) => (
              <div key={group.id}>
                <h3 className="type-subsection mb-4">{group.title}</h3>
                <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
                  {group.items.map((item, index) => {
                    const key = `${group.id}-${index}`;
                    const panelId = `${baseId}-${key}-panel`;
                    const isOpen = openKey === key;

                    return (
                      <details
                        key={key}
                        className="group/faq faq-details"
                        open={isOpen}
                        onToggle={handleToggle(key)}
                      >
                        <summary
                          className={cn(
                            "flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left marker:content-none sm:py-5",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-muted)]",
                            "[&::-webkit-details-marker]:hidden",
                          )}
                          aria-controls={panelId}
                        >
                          <span className="type-subsection pr-2 !text-base sm:!text-lg">
                            {item.question}
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 shrink-0 text-[var(--text-secondary)] transition-transform duration-200 ease-out motion-reduce:transition-none",
                              "group-open/faq:rotate-180",
                            )}
                            aria-hidden
                          />
                        </summary>
                        <div id={panelId} className="faq-details-panel">
                          <p className="type-body-muted pb-5 pr-8 text-sm">
                            {item.answer}
                          </p>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
