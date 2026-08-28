import { Container } from "@/components/ui/Container";
import { TrustBox } from "@/components/trustpilot/TrustBox";

export function TrustpilotSection() {
  return (
    <section
      id="reviews"
      aria-label="Share a Trustpilot review"
      className="border-y border-[var(--border)] bg-[var(--surface)]"
    >
      <Container className="py-8 sm:py-10">
        <div className="mx-auto max-w-xl text-center">
          <p className="type-eyebrow">Trustpilot</p>
          <p className="type-body-muted mt-3 text-sm sm:text-[0.95rem]">
            Already using Replii? A short review helps other agencies decide.
          </p>
          <div className="mt-5 min-h-[52px] w-full">
            <TrustBox />
          </div>
        </div>
      </Container>
    </section>
  );
}
