"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT_EMAIL, DASHBOARD_URL } from "@/lib/constants";
import { startCheckout } from "@/lib/checkout-client";
import { ORDER_SCOPE, ORDER_STEPS, type PricingPlanId } from "@/lib/data";
import { cn } from "@/lib/utils";

const PLAN_OPTIONS: { id: PricingPlanId; label: string }[] = [
  { id: "launch", label: "Launch — $97/mo" },
  { id: "growth", label: "Growth — $297/mo" },
  { id: "unlimited", label: "Agency Unlimited — $497/mo" },
];

export function OrderSection() {
  const [plan, setPlan] = useState<PricingPlanId>("growth");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const selectedPlan = String(data.get("plan") ?? "") as PricingPlanId;
    const whiteLabelValue = String(data.get("white_label") ?? "No");

    setPending(true);
    setError(null);

    try {
      const url = await startCheckout({
        plan: selectedPlan,
        whiteLabel: selectedPlan === "growth" && whiteLabelValue === "Yes",
        agencyName: String(data.get("agency_name") ?? ""),
        adminUsername: String(data.get("admin_username") ?? ""),
        email: String(data.get("billing_email") ?? ""),
      });
      window.location.assign(url);
    } catch (err) {
      setPending(false);
      setError(err instanceof Error ? err.message : "Unable to start Checkout");
    }
  }

  return (
    <section
      id="order"
      className="section-pad scroll-mt-header bg-[var(--surface-muted)]"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="How to order"
              title="From this page to a live agency workspace."
              description="Choose a plan, pay with Stripe Checkout, and send the agency name plus the admin login you want. AccellionX provisions an isolated workspace after payment."
            />

            <ol className="mt-10 space-y-0">
              {ORDER_STEPS.map((step, i) => (
                <li key={step} className="relative flex gap-4 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--primary)]/30 bg-[var(--accent-mint)] font-[family-name:var(--font-mono)] text-xs font-medium text-[var(--primary-dark)]">
                      0{i + 1}
                    </span>
                    {i < ORDER_STEPS.length - 1 ? (
                      <span
                        aria-hidden
                        className="mt-1 w-px flex-1 bg-[var(--border-strong)]/50"
                      />
                    ) : null}
                  </div>
                  <p className="pt-1.5 text-sm leading-relaxed text-[var(--text-primary)]/90 sm:text-base">
                    {step}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] sm:p-6">
              <p className="type-metric-label">Commercial terms</p>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {ORDER_SCOPE.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-[var(--text-primary)]/85"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]"
                      strokeWidth={2}
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-[var(--text-secondary)]">
              Already provisioned?{" "}
              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[var(--primary-dark)] underline underline-offset-2 hover:text-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                Open the dashboard
              </a>
              .
            </p>
          </div>

          <div>
            <Card className="shadow-[var(--shadow-md)]">
              <h3 className="type-subsection">Subscribe as an agency</h3>
              <p className="type-body-muted mt-2 text-sm">
                You’ll complete Stripe Checkout on the next screen. AccellionX
                then creates the workspace and emails the admin login.
              </p>
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <Field
                  label="Agency legal name"
                  name="agency_name"
                  required
                  autoComplete="organization"
                />
                <Field
                  label="Admin username"
                  name="admin_username"
                  required
                  autoComplete="username"
                />
                <Field
                  label="Billing email"
                  name="billing_email"
                  type="email"
                  required
                  autoComplete="email"
                />
                <label className="block text-sm font-medium text-[var(--text-primary)]/80">
                  Plan
                  <select
                    name="plan"
                    required
                    value={plan}
                    onChange={(event) =>
                      setPlan(event.target.value as PricingPlanId)
                    }
                    className="mt-1.5 w-full rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/15"
                  >
                    {PLAN_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
                {plan === "growth" ? (
                  <label className="block text-sm font-medium text-[var(--text-primary)]/80">
                    White-label add-on ($79/mo)
                    <select
                      name="white_label"
                      defaultValue="No"
                      className="mt-1.5 w-full rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/15"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </label>
                ) : (
                  <p className="text-sm text-[var(--text-secondary)]">
                    {plan === "unlimited"
                      ? "White-label is included on Agency Unlimited."
                      : "White-label is available on Growth (+$79/mo) or Unlimited."}
                  </p>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  withArrow
                  disabled={pending}
                >
                  {pending ? "Redirecting to Stripe…" : "Continue to Stripe"}
                </Button>
                {error ? (
                  <p className="text-sm text-red-700" role="alert">
                    {error}
                  </p>
                ) : (
                  <p className="text-sm text-[var(--text-secondary)]">
                    You’ll pay on Stripe’s hosted Checkout. Questions?{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="font-medium text-[var(--primary-dark)] underline underline-offset-2"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                )}
              </form>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const base = cn(
    "mt-1.5 w-full rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-secondary)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/15",
  );

  return (
    <label className="block text-sm font-medium text-[var(--text-primary)]/80">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className={base}
      />
    </label>
  );
}
