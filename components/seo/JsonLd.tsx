import { buildSoftwareApplicationJsonLd } from "@/lib/seo";

export function JsonLd() {
  const data = buildSoftwareApplicationJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
