import { Check, Minus } from "lucide-react";
import { CheckoutButton } from "@/components/checkout/CheckoutButton";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COMPARISON_ROWS, formatUsd, PRICING_PLANS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <section id="pricing" className="section-pad scroll-mt-header">
      <Container>
        <SectionHeading
          eyebrow="Agency plans"
          title="Agencies subscribe. Consumers never pay Replii."
          description="Launch $97 · Growth $297 · Unlimited $497 per month. Stripe bills the agency. Advertisers get a workspace — never a card on file."
          align="center"
        />

        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
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
                  <span className="type-metric-value">{formatUsd(plan.monthly)}</span>
                  <span className="text-sm text-[var(--text-secondary)]">
                    /month
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
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

                <CheckoutButton
                  plan={plan.id}
                  label={plan.cta}
                  variant={plan.highlighted ? "primary" : "secondary"}
                  withArrow={plan.highlighted || plan.id === "unlimited"}
                  allowWhiteLabel={plan.id === "growth"}
                />
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          <div className="rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface-muted)]/70 px-4 py-3.5 text-sm leading-relaxed text-[var(--text-secondary)] sm:px-5">
            Hitting the client cap blocks new invites until you upgrade. Hitting
            the conversation cap pauses AI replies for the rest of the month
            (keyword FAQs still work). Upgrade or wait for the next period.
          </div>
          <div className="rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface-muted)]/70 px-4 py-3.5 text-sm leading-relaxed text-[var(--text-secondary)] sm:px-5">
            Who Stripe charges: the agency only. Advertisers and shop owners are
            never billed by Replii. Cancel or change plan any time in the Stripe
            customer portal after the first subscription.
          </div>
          <p className="text-center text-sm text-[var(--text-secondary)]">
            Reselling under your own brand? Take Unlimited, or add white-label
            on Growth for $79/mo before Checkout.
          </p>
        </div>

        <div className="mt-12 sm:mt-14">
          <h3 className="type-subsection text-center">Compare plans</h3>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-[var(--text-secondary)]">
            Limits that are enforced — not brochure copy.
          </p>
          <div className="mt-6 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
            <div className="table-scroll">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <caption className="sr-only">Plan feature comparison</caption>
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface-muted)]/50">
                    <th className="px-4 py-3.5 font-medium text-[var(--text-secondary)] sm:px-5">
                      Capability
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
                      {PRICING_PLANS.map((plan) => (
                        <CompareCell
                          key={plan.id}
                          value={row[plan.id]}
                          highlight={Boolean(plan.highlighted)}
                        />
                      ))}
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
