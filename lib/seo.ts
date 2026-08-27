import { CONTACT_EMAIL, COMPANY, SITE } from "@/lib/constants";

/** Public site origin — set `NEXT_PUBLIC_SITE_URL` in the environment. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return "http://localhost:3000";
}

export const SEO = {
  title: "Replii — AI conversations that close leads on WhatsApp, Instagram, and Facebook",
  description:
    "The agency platform that puts an AI inbox on every client’s Meta channels. Answers ad leads in seconds, books demos, takes orders, and lets a human jump in — billed to the agency, never the shop.",
  ogTitle: "AI conversations that close leads",
  ogDescription:
    "Replii puts an AI inbox on every client’s WhatsApp, Instagram, and Facebook. Agencies subscribe. Advertisers never see a bill.",
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
    applicationSubCategory: "Agency inbox software",
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
