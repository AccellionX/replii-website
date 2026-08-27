import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import {
  COMPANY,
  FOOTER_COLUMNS,
  SITE,
  TODO_LINKS,
  type FooterLink,
} from "@/lib/constants";

function FooterItem({ link }: { link: FooterLink }) {
  const href =
    link.href ??
    (link.todoKey ? TODO_LINKS[link.todoKey] : undefined);

  const className =
    "inline-flex min-h-11 items-center text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2";

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={className}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {link.label}
      </a>
    );
  }

  return (
    <span
      className="inline-flex min-h-11 items-center text-sm text-[var(--text-secondary)]"
      title="Link coming soon"
    >
      {link.label}
    </span>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-muted)]">
      <Container className="flex flex-col gap-10 py-12 sm:gap-12 sm:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
          <div className="max-w-xs shrink-0">
            <a
              href="/#top"
              aria-label="Replii home"
              className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              <span aria-hidden="true">
                <Logo />
              </span>
            </a>
            <p className="type-body-muted mt-4 text-sm">
              {SITE.tagline}. Agencies subscribe. Advertisers never see a bill.
            </p>
          </div>

          <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-4 gap-y-8 xs:gap-x-6 sm:grid-cols-4 sm:gap-6 lg:gap-8">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title} className="min-w-0">
                <p className="type-metric-label">{column.title}</p>
                <ul className="mt-3 space-y-1">
                  {column.links.map((link) => (
                    <li key={link.label} className="min-w-0 break-words">
                      <FooterItem link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-6">
          <p className="text-sm text-[var(--text-secondary)]">
            © 2026 {SITE.name} · {COMPANY.productLine}
          </p>
        </div>
      </Container>
    </footer>
  );
}
