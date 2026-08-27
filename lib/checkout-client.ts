import type { PricingPlanId } from "@/lib/data";

export type CheckoutPayload = {
  plan: PricingPlanId;
  whiteLabel?: boolean;
  agencyName?: string;
  adminUsername?: string;
  email?: string;
};

export async function startCheckout(payload: CheckoutPayload): Promise<string> {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await response.json()) as { url?: string; error?: string };
  if (!response.ok || !data.url) {
    throw new Error(data.error || "Unable to start Checkout");
  }
  return data.url;
}
