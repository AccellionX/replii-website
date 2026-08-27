import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/lib/constants";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--surface-dark)] text-[var(--text-inverse)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(13,148,136,0.22),transparent_55%)]"
      />
      <div
        aria-hidden
        className="hero-grid pointer-events-none absolute inset-0 opacity-[0.12] invert"
      />

      <Container className="relative section-pad">
        <div className="mx-auto max-w-2xl text-center">
          <p className="type-eyebrow !text-[var(--accent-mint)]">
            Subscribe as an agency
          </p>
          <h2 className="type-section mt-4 !text-[var(--text-inverse)]">
            Put an AI inbox on every client’s Meta channels.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--text-inverse-muted)] sm:text-lg">
            Answers ad leads in seconds, books demos, takes orders, and lets a
            human jump in — billed to the agency, never the end customer.
          </p>

          <div className="mt-9 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button
              href={CTA.final.href}
              size="lg"
              withArrow
              className="w-full focus-visible:ring-offset-[var(--surface-dark)] sm:w-auto"
            >
              {CTA.final.label}
            </Button>
            <Button
              href={CTA.discuss.href}
              variant="inverse"
              size="lg"
              className="w-full focus-visible:ring-offset-[var(--surface-dark)] sm:w-auto"
            >
              {CTA.discuss.label}
            </Button>
          </div>

          <p className="mx-auto mt-7 max-w-md text-sm leading-relaxed text-[var(--text-inverse-muted)]">
            Launch $97 · Growth $297 · Unlimited $497 / month. Dashboard at
            app.replii.accellionx.com.
          </p>
        </div>
      </Container>
    </section>
  );
}
