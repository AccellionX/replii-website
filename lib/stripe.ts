import Stripe from "stripe";
import { PRICING_PLANS, type PricingPlanId } from "@/lib/data";

export const WHITE_LABEL_MONTHLY_USD = 79;

export type CheckoutPlanId = PricingPlanId;

const PLAN_IDS = new Set<CheckoutPlanId>(["launch", "growth", "unlimited"]);

export function isCheckoutPlanId(value: string): value is CheckoutPlanId {
  return PLAN_IDS.has(value as CheckoutPlanId);
}

export function getStripe(): Stripe {
  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secret) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }

  const publishable = process.env.STRIPE_PUBLISHABLE_KEY?.trim();
  if (publishable) {
    const secretLive = secret.startsWith("sk_live_");
    const publishableLive = publishable.startsWith("pk_live_");
    if (secretLive !== publishableLive) {
      throw new Error("Stripe secret and publishable keys are not in the same mode");
    }
  }

  return new Stripe(secret);
}

export function planAmountCents(planId: CheckoutPlanId): number {
  const plan = PRICING_PLANS.find((item) => item.id === planId);
  if (!plan) {
    throw new Error(`Unknown plan: ${planId}`);
  }
  return plan.monthly * 100;
}

export function planDisplayName(planId: CheckoutPlanId): string {
  const plan = PRICING_PLANS.find((item) => item.id === planId);
  return plan?.name ?? planId;
}

export type CreateCheckoutInput = {
  planId: CheckoutPlanId;
  whiteLabel: boolean;
  agencyName?: string;
  adminUsername?: string;
  email?: string;
  origin: string;
};

export async function createSubscriptionCheckout(input: CreateCheckoutInput) {
  const stripe = getStripe();
  const plan = PRICING_PLANS.find((item) => item.id === input.planId);
  if (!plan) {
    throw new Error(`Unknown plan: ${input.planId}`);
  }

  const includeWhiteLabel = input.whiteLabel && input.planId === "growth";
  const agencyName = input.agencyName?.trim() || undefined;
  const adminUsername = input.adminUsername?.trim() || undefined;
  const email = input.email?.trim() || undefined;

  const metadata: Record<string, string> = {
    plan: input.planId,
    whiteLabel: includeWhiteLabel ? "true" : "false",
    product: "replii",
  };
  if (agencyName) metadata.agencyName = agencyName;
  if (adminUsername) metadata.adminUsername = adminUsername;

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: planAmountCents(input.planId),
        recurring: { interval: "month" },
        product_data: {
          name: `Replii ${plan.name}`,
          description: plan.bestFor,
        },
      },
    },
  ];

  if (includeWhiteLabel) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: WHITE_LABEL_MONTHLY_USD * 100,
        recurring: { interval: "month" },
        product_data: {
          name: "Replii white-label + branded reports",
          description: "Replace the Replii wordmark with your agency name.",
        },
      },
    });
  }

  const customFields: Stripe.Checkout.SessionCreateParams.CustomField[] = [];
  if (!agencyName) {
    customFields.push({
      key: "agency_name",
      label: { type: "custom", custom: "Agency legal name" },
      type: "text",
    });
  }
  if (!adminUsername) {
    customFields.push({
      key: "admin_username",
      label: { type: "custom", custom: "Admin username" },
      type: "text",
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: lineItems,
    success_url: `${input.origin}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${input.origin}/subscribe/canceled`,
    billing_address_collection: "required",
    allow_promotion_codes: true,
    client_reference_id: agencyName,
    customer_email: email,
    metadata,
    subscription_data: {
      metadata,
    },
    custom_fields: customFields.length ? customFields : undefined,
  });

  if (!session.url) {
    throw new Error("Stripe did not return a Checkout URL");
  }

  return session;
}
