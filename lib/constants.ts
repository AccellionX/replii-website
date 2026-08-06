export const CONTACT_EMAIL = "info@accellionx.com";

export const SITE = {
  name: "Replii",
  tagline: "AI Lead Replies Without Extra Inbox Work",
  description:
    "Replii answers and qualifies leads from Instagram, Messenger and WhatsApp so businesses can provide 24/7 first-response coverage without adding repetitive inbox workload.",
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
  { label: "Product", href: "#product-demo", id: "product-demo" },
  { label: "How it works", href: "#workflow", id: "workflow" },
  { label: "Features", href: "#features", id: "features" },
  { label: "Pricing", href: "#pricing", id: "pricing" },
  { label: "FAQ", href: "#faq", id: "faq" },
] as const;

/* ——— Mailto helpers ——— */

export type MailtoIntent =
  | "demo"
  | "starter"
  | "pro"
  | "agency"
  | "pilot"
  | "founding";

const MAILTO_SUBJECTS: Record<MailtoIntent, string> = {
  demo: "Replii demo request",
  starter: "Replii Starter plan",
  pro: "Replii Pro plan",
  agency: "Replii Agency plan",
  pilot: "Replii 14-day pilot",
  founding: "Replii founding customer application",
};

const MAILTO_INTRO: Record<MailtoIntent, string> = {
  demo: "I'd like to see a Replii demo built around our lead process.",
  starter: "I'm interested in the Replii Starter plan.",
  pro: "I'm interested in the Replii Pro plan.",
  agency: "I'm interested in the Replii Agency plan.",
  pilot: "I'd like to discuss a 14-day Replii pilot.",
  founding: "I'd like to apply for Replii founding customer access.",
};

const MAILTO_DETAILS = `Please find a few details below:

- Business name:
- Industry:
- Active Meta channels (Instagram / Messenger / WhatsApp):
- Approximate monthly lead volume:

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

/** Plain mailto with no subject/body (footer contact address). */
export function contactMailto(): string {
  return `mailto:${CONTACT_EMAIL}`;
}

/* ——— CTA configuration ——— */

export const CTA = {
  /** Scroll to interactive on-page demo */
  seeInAction: {
    label: "See your AI reply team",
    href: "#product-demo",
  },
  /** Email: general demo request */
  demoRequest: {
    label: "See your AI reply team",
    href: mailtoHref("demo"),
  },
  secondary: {
    label: "Watch how it handles a lead",
    href: "#workflow",
  },
  discuss: {
    label: "Discuss your current inbox workload",
    href: mailtoHref("pilot"),
  },
  pilot: {
    label: "Test it with your lead flow",
    href: mailtoHref("pilot"),
  },
  founding: {
    label: "Apply for founding access",
    href: mailtoHref("founding"),
  },
  starter: {
    label: "Choose Starter",
    href: mailtoHref("starter"),
  },
  pro: {
    label: "Choose Pro",
    href: mailtoHref("pro"),
  },
  agency: {
    label: "Talk to us",
    href: mailtoHref("agency"),
  },
  /** Header / hero primary — on-page product demo */
  primary: {
    label: "See your AI reply team",
    href: "#product-demo",
  },
  /** Final CTA primary — on-page product demo */
  final: {
    label: "See your AI reply team",
    href: "#product-demo",
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
      { label: "How it works", href: "#workflow" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Demo", href: "#product-demo" },
    ],
  },
  {
    title: "Use cases",
    links: [
      { label: "Clinics", href: "#industries" },
      { label: "Real estate", href: "#industries" },
      { label: "Home services", href: "#industries" },
      { label: "Agencies", href: "#industries" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: contactMailto() },
      { label: "Privacy", todoKey: "privacy" },
      { label: "Terms", todoKey: "terms" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: COMPANY.name, todoKey: "companyWebsite" },
      { label: CONTACT_EMAIL, href: contactMailto() },
    ],
  },
];
