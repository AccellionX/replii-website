"use client";

import { useId, useState } from "react";
import { Check, Minus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTA } from "@/lib/constants";
import {
  COMPARISON_ROWS,
  formatUsd,
  PRICING_PLANS,
  type BillingPeriod,
} from "@/lib/data";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const switchId = useId();

  return (
    <section id="pricing" className="section-pad scroll-mt-header">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Add 24/7 lead coverage without adding repetitive inbox work."
          description="Choose a plan based on your channels, lead volume, and number of businesses—not how many hours someone must sit inside your inbox."
          align="center"
        />

        <div className="mt-10 flex flex-col items-center gap-3">
          <div
            role="group"
            aria-labelledby={switchId}
            className="inline-flex rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] p-1 shadow-[var(--shadow-sm)]"
          >
            <span id={switchId} className="sr-only">
              Billing period
            </span>
            {(
              [
                { id: "monthly", label: "Monthly" },
                { id: "annual", label: "Annual" },
              ] as const
            ).map((opt) => {
              const selected = billing === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setBilling(opt.id)}
                  className={cn(
                    "min-h-11 rounded-[calc(var(--radius-control)-2px)] px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                    selected
                      ? "bg-[var(--primary)] text-[var(--text-inverse)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          {billing === "annual" ? (
            <p className="text-sm text-[var(--text-secondary)]">
              <span className="font-medium text-[var(--primary-dark)]">
                2 months free
              </span>
              <span className="mx-1.5 text-[var(--border-strong)]" aria-hidden>
                ·
              </span>
              Annual totals equal ten months of the monthly rate
            </p>
          ) : (
            <p className="text-sm text-[var(--text-secondary)]">
              Switch to annual and get 2 months free
            </p>
          )}
        </div>

        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => {
            const price = billing === "monthly" ? plan.monthly : plan.annual;
            const period = billing === "monthly" ? "/month" : "/year";

            return (
              <div key={plan.id} className="flex h-full">
                <Card
                  className={cn(
                    "flex h-full w-full flex-col",
                    plan.highlighted &&
                      "border-[var(--primary)] bg-[color-mix(in_srgb,var(--accent-mint)_40%,white)] shadow-[var(--shadow-md)]",
                  )}
                  interactive={!plan.highlighted}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="type-subsection">{plan.name}</h3>
                    {plan.highlighted ? (
                      <Badge variant="mint">Most popular</Badge>
                    ) : null}
                  </div>

                  <div className="mt-5 flex flex-wrap items-baseline gap-x-1 gap-y-0">
                    <span className="type-metric-value">{formatUsd(price)}</span>
                    <span className="text-sm text-[var(--text-secondary)]">
                      {period}
                    </span>
                  </div>
                  {billing === "annual" ? (
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      Billed annually · {formatUsd(plan.monthly)}/mo equivalent
                    </p>
                  ) : null}

                  <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    <span className="font-medium text-[var(--text-primary)]">
                      Best for:{" "}
                    </span>
                    {plan.bestFor}
                  </p>

                  <ul className="mt-6 flex-1 space-y-2.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-2.5 text-sm text-[var(--text-primary)]/85"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]"
                          strokeWidth={2}
                          aria-hidden
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    href={plan.ctaHref}
                    variant={plan.highlighted ? "primary" : "secondary"}
                    className="mt-8 w-full"
                    withArrow={plan.highlighted || plan.id === "agency"}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="mt-8 space-y-3">
          <div className="rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface-muted)]/70 px-4 py-3.5 text-sm leading-relaxed text-[var(--text-secondary)] sm:px-5">
            A one-time setup fee may apply depending on channel configuration,
            qualification complexity and integrations.
          </div>
          <div className="rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface-muted)]/70 px-4 py-3.5 text-sm leading-relaxed text-[var(--text-secondary)] sm:px-5">
            Replii is designed to reduce dedicated first-response work. Sales,
            negotiation, and sensitive conversations should still involve your
            team.
          </div>
          <p className="text-center text-sm text-[var(--text-secondary)]">
            Need more conversations, locations or channels?{" "}
            <a
              href={CTA.agency.href}
              className="font-medium text-[var(--primary-dark)] underline underline-offset-2 hover:text-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              We’ll build a plan around your operation.
            </a>
          </p>
        </div>

        <div className="mt-12 sm:mt-14">
          <h3 className="type-subsection text-center">Compare plans</h3>
          <div className="mt-6 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
            <div className="table-scroll">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <caption className="sr-only">Plan feature comparison</caption>
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface-muted)]/50">
                    <th className="px-4 py-3.5 font-medium text-[var(--text-secondary)] sm:px-5">
                      Feature
                    </th>
                    {PRICING_PLANS.map((plan) => (
                      <th
                        key={plan.id}
                        className={cn(
                          "px-3 py-3.5 font-[family-name:var(--font-display)] font-semibold text-[var(--text-primary)]",
                          plan.highlighted && "text-[var(--primary-dark)]",
                        )}
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr
                      key={row.feature}
                      className="border-b border-[var(--border)] last:border-0"
                    >
                      <td className="px-4 py-3 text-[var(--text-primary)]/85 sm:px-5">
                        {row.feature}
                      </td>
                      <CompareCell value={row.starter} />
                      <CompareCell value={row.pro} highlight />
                      <CompareCell value={row.agency} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CompareCell({
  value,
  highlight = false,
}: {
  value: string | boolean;
  highlight?: boolean;
}) {
  return (
    <td className={cn("px-3 py-3", highlight && "bg-[var(--accent-mint)]/20")}>
      {typeof value === "boolean" ? (
        value ? (
          <span className="inline-flex items-center gap-1">
            <Check
              className="h-4 w-4 text-[var(--primary)]"
              strokeWidth={2}
              aria-hidden
            />
            <span className="sr-only">Included</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1">
            <Minus
              className="h-4 w-4 text-[var(--border-strong)]"
              strokeWidth={2}
              aria-hidden
            />
            <span className="sr-only">Not included</span>
          </span>
        )
      ) : (
        <span className="text-[var(--text-primary)]/80">{value}</span>
      )}
    </td>
  );
}
