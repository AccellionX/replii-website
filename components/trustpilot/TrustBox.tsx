"use client";

import { useEffect, useRef } from "react";
import { TRUSTPILOT } from "@/lib/constants";

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, forceReload?: boolean) => void;
    };
  }
}

export function TrustBox() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    window.Trustpilot?.loadFromElement(el, true);
  }, []);

  return (
    <div
      ref={ref}
      className="trustpilot-widget"
      data-locale={TRUSTPILOT.locale}
      data-template-id={TRUSTPILOT.templateId}
      data-businessunit-id={TRUSTPILOT.businessUnitId}
      data-style-height="52px"
      data-style-width="100%"
      data-token={TRUSTPILOT.token}
    >
      <a
        href={TRUSTPILOT.reviewUrl}
        target="_blank"
        rel="noopener"
      >
        Trustpilot
      </a>
    </div>
  );
}
