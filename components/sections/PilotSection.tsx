"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT_EMAIL, CTA, mailtoHref } from "@/lib/constants";
import { PILOT_REVIEW_METRICS, PILOT_SCOPE, PILOT_STEPS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function PilotSection() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="pilot"
      className="section-pad scroll-mt-header bg-[var(--surface-muted)]"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="14-day pilot"
              title="Put Replii beside your current inbox process for 14 days."
              description="Compare how many initial replies, common questions, qualification steps, and after-hours inquiries Replii handles before your team needs to intervene."
            />

            <div className="mt-10">
              <p className="type-metric-label">What you’ll review</p>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {PILOT_REVIEW_METRICS.map((metric) => (
                  <li
                    key={metric}
                    className="flex items-start gap-2 text-sm text-[var(--text-primary)]/85"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]"
                      strokeWidth={2}
                      aria-hidden
                    />
                    {metric}
                  </li>
                ))}
              </ul>
            </div>

            <ol className="mt-10 space-y-0">
              {PILOT_STEPS.map((step, i) => (
                <li key={step} className="relative flex gap-4 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--primary)]/30 bg-[var(--accent-mint)] font-[family-name:var(--font-mono)] text-xs font-medium text-[var(--primary-dark)]">
                      0{i + 1}
                    </span>
                    {i < PILOT_STEPS.length - 1 ? (
                      <span
                        aria-hidden
                        className="mt-1 w-px flex-1 bg-[var(--border-strong)]/50"
                      />
                    ) : null}
                  </div>
                  <p className="type-subsection pt-1.5 !text-base">{step}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] sm:p-6">
              <p className="type-metric-label">Pilot scope</p>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {PILOT_SCOPE.map((item) => (
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
              Pilot terms, setup scope and eligibility are confirmed before
              activation.
            </p>
          </div>

          <div>
            <Card className="shadow-[var(--shadow-md)]">
              {submitted ? (
                <div className="flex min-h-[280px] flex-col justify-center">
                  <p className="type-subsection !text-2xl">Request received.</p>
                  <p className="type-body-muted mt-3">
                    Thanks — we’ll follow up to confirm pilot terms, setup scope
                    and eligibility before anything goes live.
                  </p>
                  <a
                    href={mailtoHref("pilot")}
                    className="mt-6 text-sm font-medium text-[var(--primary)] hover:underline"
                  >
                    Or email {CONTACT_EMAIL} directly
                  </a>
                </div>
              ) : (
                <>
                  <h3 className="type-subsection">Discuss a 14-day pilot</h3>
                  <p className="type-body-muted mt-2 text-sm">
                    Tell us about your Meta channels and primary use case. We’ll
                    confirm fit before activation.
                  </p>
                  <form onSubmit={onSubmit} className="mt-6 space-y-4">
                    <Field label="Name" name="name" required autoComplete="name" />
                    <Field
                      label="Work email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                    />
                    <Field
                      label="Company"
                      name="company"
                      required
                      autoComplete="organization"
                    />
                    <Field
                      label="Primary use case"
                      name="use_case"
                      as="textarea"
                      required
                      placeholder="e.g. Dental implant consults from Instagram ads"
                    />
                    <Button type="submit" className="w-full" size="lg" withArrow>
                      {CTA.pilot.label}
                    </Button>
                  </form>
                </>
              )}
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
  as = "input",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  as?: "input" | "textarea";
  placeholder?: string;
}) {
  const base = cn(
    "mt-1.5 w-full rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-secondary)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/15",
  );

  return (
    <label className="block text-sm font-medium text-[var(--text-primary)]/80">
      {label}
      {as === "textarea" ? (
        <textarea
          name={name}
          required={required}
          rows={3}
          placeholder={placeholder}
          className={base}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          className={base}
        />
      )}
    </label>
  );
}
