import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CONTACT_EMAIL, DASHBOARD_URL } from "@/lib/constants";
import { getStripe, isCheckoutPlanId, planDisplayName } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Subscription started",
  robots: { index: false, follow: false },
};

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function SubscribeSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;
  let planName: string | null = null;
  let email: string | null = null;
  let complete = false;

  if (sessionId) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      complete =
        session.status === "complete" || session.payment_status === "paid";
      const plan = session.metadata?.plan;
      if (plan && isCheckoutPlanId(plan)) planName = planDisplayName(plan);
      email =
        session.customer_details?.email ?? session.customer_email ?? null;
    } catch {
      complete = false;
    }
  }

  return (
    <section className="section-pad pt-[calc(var(--header-height)+2rem)]">
      <Container className="max-w-xl">
        <p className="type-eyebrow">Stripe Checkout</p>
        <h1 className="type-section mt-3">
          {complete ? "Payment received." : "Thanks — we’re confirming your payment."}
        </h1>
        <p className="type-body-muted mt-4">
          {planName
            ? `Your ${planName} subscription is set up in Stripe.`
            : "Your agency subscription is set up in Stripe."}{" "}
          AccellionX will create an isolated workspace
          {email ? ` and send login details to ${email}` : ""}. After that, open
          the dashboard and invite your first client.
        </p>
        <p className="type-body-muted mt-3">
          Cancel or change plan any time in the Stripe customer portal from the
          receipt email.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={DASHBOARD_URL} withArrow>
            Open the dashboard
          </Button>
          <Button href={`mailto:${CONTACT_EMAIL}`} variant="secondary">
            Email AccellionX
          </Button>
        </div>
      </Container>
    </section>
  );
}
