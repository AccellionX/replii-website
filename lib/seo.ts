import { CONTACT_EMAIL, COMPANY, SITE } from "@/lib/constants";

/** Public site origin — set `NEXT_PUBLIC_SITE_URL` in the environment. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return "http://localhost:3000";
}

export const SEO = {
  title: "Replii — AI Lead Replies Without Extra Inbox Work",
  description:
    "Replii answers and qualifies leads from Instagram, Messenger and WhatsApp so businesses can provide 24/7 first-response coverage without adding repetitive inbox workload.",
  ogTitle: "Your 24/7 AI Lead-Response Team",
  ogDescription:
    "Let Replii answer common questions, qualify Meta ad leads, and route serious prospects to your team.",
  themeColor: "#0c1612",
  brandColor: "#0d9488",
} as const;

/**
 * SoftwareApplication JSON-LD — no reviews, ratings, or unsupported offers.
 */
export function buildSoftwareApplicationJsonLd() {
  const url = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Lead management software",
    operatingSystem: "Web",
    description: SEO.description,
    url,
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
      email: CONTACT_EMAIL,
      url,
    },
  };
}
