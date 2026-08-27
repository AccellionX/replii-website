import { NextRequest, NextResponse } from "next/server";
import {
  createSubscriptionCheckout,
  isCheckoutPlanId,
} from "@/lib/stripe";

function originFrom(request: NextRequest): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (env) return env;
  return request.nextUrl.origin;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const {
    plan,
    whiteLabel,
    agencyName,
    adminUsername,
    email,
  } = body as Record<string, unknown>;

  if (typeof plan !== "string" || !isCheckoutPlanId(plan)) {
    return NextResponse.json({ error: "Choose a valid plan" }, { status: 400 });
  }

  if (email !== undefined && email !== "" && typeof email === "string") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid billing email" }, { status: 400 });
    }
  }

  try {
    const session = await createSubscriptionCheckout({
      planId: plan,
      whiteLabel: whiteLabel === true,
      agencyName: typeof agencyName === "string" ? agencyName : undefined,
      adminUsername: typeof adminUsername === "string" ? adminUsername : undefined,
      email: typeof email === "string" ? email : undefined,
      origin: originFrom(request),
    });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to start Checkout";
    const missingKeys = message.includes("STRIPE_SECRET_KEY");
    return NextResponse.json(
      { error: missingKeys ? "Stripe is not configured" : "Unable to start Checkout" },
      { status: missingKeys ? 503 : 500 },
    );
  }
}
