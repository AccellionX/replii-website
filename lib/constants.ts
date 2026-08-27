export const CONTACT_EMAIL = "info@accellionx.com";

export const DASHBOARD_URL = "https://app.replii.accellionx.com/dashboard/login";

export const SITE = {
  name: "Replii",
  tagline: "AI conversations that close leads — on WhatsApp, Instagram, and Facebook",
  description:
    "Replii is the agency platform that puts an AI inbox on every client’s Meta channels. It answers ad leads in seconds, books demos, takes orders, and lets a human jump in — while you bill the agency, never the end customer.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000",
  email: CONTACT_EMAIL,
} as const;

export const COMPANY = {
  name: "AccellionX",
  productLine: "An AccellionX product",
  email: CONTACT_EMAIL,
} as const;

/**
 * External / legal destinations that are not published yet.
 * Set a real URL string when each page is ready — do not use placeholder "#".
 */
export const TODO_LINKS = {
  /** TODO: AccellionX company website URL */
  companyWebsite: undefined as string | undefined,
  /** TODO: Privacy policy URL */
  privacy: undefined as string | undefined,
  /** TODO: Terms of service URL */
  terms: undefined as string | undefined,
} as const;

export const NAV_LINKS = [
  { label: "Product", href: "/#product-demo", id: "product-demo" },
  { label: "How it works", href: "/#workflow", id: "workflow" },
  { label: "Features", href: "/#features", id: "features" },
  { label: "Pricing", href: "/#pricing", id: "pricing" },
  { label: "FAQ", href: "/#faq", id: "faq" },
] as const;

/* ——— Mailto helpers ——— */

export type MailtoIntent =
  | "demo"
  | "launch"
  | "growth"
  | "unlimited"
  | "order";

const MAILTO_SUBJECTS: Record<MailtoIntent, string> = {
  demo: "Replii demo request",
  launch: "Replii Launch plan — $97/mo",
  growth: "Replii Growth plan — $297/mo",
  unlimited: "Replii Agency Unlimited — $497/mo",
  order: "Replii agency subscription",
};

const MAILTO_INTRO: Record<MailtoIntent, string> = {
  demo: "I'd like to see Replii for our agency and client inboxes.",
  launch: "I'm interested in the Replii Launch plan ($97/mo).",
  growth: "I'm interested in the Replii Growth plan ($297/mo).",
  unlimited: "I'm interested in Replii Agency Unlimited ($497/mo).",
  order: "I'd like to subscribe to Replii as an agency.",
};

const MAILTO_DETAILS = `Please find a few details below:

- Agency legal name:
- Admin username:
- Billing email:
- Plan (Launch $97 / Growth $297 / Unlimited $497):
- White-label add-on for Growth ($79/mo): yes / no

Thank you.`;

/** Build a mailto URL for a known Replii CTA intent. */
export function buildMailto(intent: MailtoIntent): string {
  const subject = MAILTO_SUBJECTS[intent];
  const body = `${MAILTO_INTRO[intent]}\n\n${MAILTO_DETAILS}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Alias for buildMailto — use for CTA href fields. */
export function mailtoHref(intent: MailtoIntent): string {
  return buildMailto(intent);
}

export type OrderMailtoFields = {
  agencyName: string;
  adminUsername: string;
  billingEmail: string;
  plan: string;
  whiteLabel?: string;
};

/** Build a mailto from the on-page order form. */
export function buildOrderMailto(fields: OrderMailtoFields): string {
  const body = `${MAILTO_INTRO.order}

- Agency legal name: ${fields.agencyName}
- Admin username: ${fields.adminUsername}
- Billing email: ${fields.billingEmail}
- Plan: ${fields.plan}
- White-label add-on for Growth ($79/mo): ${fields.whiteLabel || "n/a"}

Thank you.`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(MAILTO_SUBJECTS.order)}&body=${encodeURIComponent(body)}`;
}

/** Plain mailto with no subject/body (footer contact address). */
export function contactMailto(): string {
  return `mailto:${CONTACT_EMAIL}`;
}

/* ——— CTA configuration ——— */

export const CTA = {
  /** Scroll to interactive on-page demo */
  seeInAction: {
    label: "Watch a lead close",
    href: "#product-demo",
  },
  /** Email: general demo / subscribe request */
  demoRequest: {
    label: "Subscribe as an agency",
    href: mailtoHref("order"),
  },
  secondary: {
    label: "Watch a lead close",
    href: "#product-demo",
  },
  discuss: {
    label: "Email to subscribe",
    href: mailtoHref("order"),
  },
  order: {
    label: "Subscribe as an agency",
    href: mailtoHref("order"),
  },
  launch: {
    label: "Choose Launch",
    href: mailtoHref("launch"),
  },
  growth: {
    label: "Choose Growth",
    href: mailtoHref("growth"),
  },
  unlimited: {
    label: "Choose Unlimited",
    href: mailtoHref("unlimited"),
  },
  /** Header / hero primary — live dashboard */
  primary: {
    label: "Open the dashboard",
    href: DASHBOARD_URL,
  },
  /** Final CTA primary — live dashboard */
  final: {
    label: "Open the dashboard",
    href: DASHBOARD_URL,
  },
} as const;

export type FooterLink = {
  label: string;
  /** On-page hash, mailto, or absolute URL. Omit when using TODO_LINKS. */
  href?: string;
  /** Key into TODO_LINKS when the destination is not available yet */
  todoKey?: keyof typeof TODO_LINKS;
};

export const FOOTER_COLUMNS: {
  title: string;
  links: FooterLink[];
}[] = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#workflow" },
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Demo", href: "/#product-demo" },
    ],
  },
  {
    title: "Use cases",
    links: [
      { label: "Agencies", href: "/#audience" },
      { label: "Clinics", href: "/#industries" },
      { label: "Restaurants", href: "/#industries" },
      { label: "Real estate", href: "/#industries" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "How to order", href: "/#order" },
      { label: "Contact", href: contactMailto() },
      { label: "Privacy", todoKey: "privacy" },
      { label: "Terms", todoKey: "terms" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: COMPANY.name, todoKey: "companyWebsite" },
      { label: "Dashboard", href: DASHBOARD_URL },
      { label: CONTACT_EMAIL, href: contactMailto() },
    ],
  },
];
