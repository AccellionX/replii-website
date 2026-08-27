"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { PricingPlanId } from "@/lib/data";
import { startCheckout } from "@/lib/checkout-client";
import { cn } from "@/lib/utils";

type CheckoutButtonProps = {
  plan: PricingPlanId;
  label: string;
  variant?: "primary" | "secondary";
  withArrow?: boolean;
  allowWhiteLabel?: boolean;
  className?: string;
};

export function CheckoutButton({
  plan,
  label,
  variant = "primary",
  withArrow = false,
  allowWhiteLabel = false,
  className,
}: CheckoutButtonProps) {
  const [whiteLabel, setWhiteLabel] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setPending(true);
    setError(null);

    try {
      const url = await startCheckout({
        plan,
        whiteLabel: allowWhiteLabel && whiteLabel,
      });
      window.location.assign(url);
    } catch (err) {
      setPending(false);
      setError(err instanceof Error ? err.message : "Unable to start Checkout");
    }
  }

  return (
    <div className="mt-8">
      {allowWhiteLabel ? (
        <label className="mb-3 flex items-start gap-2.5 text-sm text-[var(--text-primary)]/85">
          <input
            type="checkbox"
            checked={whiteLabel}
            onChange={(event) => setWhiteLabel(event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
          />
          Add white-label + branded reports ($79/mo)
        </label>
      ) : null}

      <Button
        type="button"
        variant={variant}
        className={cn("w-full", className)}
        withArrow={withArrow}
        disabled={pending}
        onClick={handleCheckout}
      >
        {pending ? "Redirecting to Stripe…" : label}
      </Button>

      {error ? (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
