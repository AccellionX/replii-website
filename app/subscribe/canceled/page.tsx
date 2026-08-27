import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Checkout canceled",
  robots: { index: false, follow: false },
};

export default function SubscribeCanceledPage() {
  return (
    <section className="section-pad pt-[calc(var(--header-height)+2rem)]">
      <Container className="max-w-xl">
        <p className="type-eyebrow">Stripe Checkout</p>
        <h1 className="type-section mt-3">Checkout canceled.</h1>
        <p className="type-body-muted mt-4">
          No charge was made. You can pick a plan again whenever you’re ready —
          Launch, Growth, or Agency Unlimited.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/#pricing" withArrow>
            Back to plans
          </Button>
          <Button href="/#order" variant="secondary">
            Use the order form
          </Button>
        </div>
      </Container>
    </section>
  );
}
