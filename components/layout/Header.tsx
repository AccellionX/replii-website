"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { CTA, NAV_LINKS } from "@/lib/constants";
import { useMotion } from "@/lib/motion";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { reduced } = useMotion();
  const activeId = useActiveSection();
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile menu is open (no focus trap)
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const { style } = document.body;
    const previous = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      width: style.width,
    };

    style.overflow = "hidden";
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.width = "100%";

    return () => {
      style.overflow = previous.overflow;
      style.position = previous.position;
      style.top = previous.top;
      style.width = previous.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeMenu]);

  // Close menu when resizing to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) closeMenu();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [closeMenu]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 motion-reduce:transition-none",
        scrolled || open
          ? "border-b border-[var(--border)] bg-[var(--background)]/95 shadow-[var(--shadow-md)] backdrop-blur-xl"
          : "border-b border-[var(--border)]/50 bg-[var(--background)]/55 backdrop-blur-[2px]",
      )}
    >
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-3">
        <Link
          href="/#top"
          aria-label="Replii home"
          className="relative z-10 inline-flex min-h-11 min-w-11 items-center rounded-[var(--radius-control)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
          onClick={closeMenu}
        >
          <span aria-hidden="true">
            <Logo />
          </span>
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => {
            const active = activeId === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex min-h-11 items-center rounded-[var(--radius-control)] px-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
                  active
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 bottom-1.5 h-0.5 rounded-full bg-[var(--primary)] transition-opacity duration-200",
                    active ? "opacity-100" : "opacity-0",
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden shrink-0 md:block">
          <Button href={CTA.primary.href} size="md" withArrow>
            {CTA.primary.label}
          </Button>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 md:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={toggleMenu}
        >
          <HamburgerIcon open={open} />
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduced ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: reduced ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--background)] md:hidden"
          >
            <Container className="flex flex-col py-3 pb-5">
              <nav aria-label="Mobile primary" className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const active = activeId === link.id;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-11 items-center rounded-[var(--radius-control)] px-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                        active
                          ? "bg-[var(--accent-mint)] text-[var(--primary-dark)]"
                          : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)]",
                      )}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>
              <div className="mt-3">
                <Button
                  href={CTA.primary.href}
                  className="min-h-11 w-full"
                  size="lg"
                  withArrow
                  onClick={closeMenu}
                >
                  {CTA.primary.label}
                </Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-[18px]" aria-hidden="true">
      <span
        className={cn(
          "absolute left-0 block h-[1.5px] w-full origin-center rounded-full bg-current transition-transform duration-200 ease-out motion-reduce:transition-none",
          open ? "top-[6px] rotate-45" : "top-0",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-[6px] block h-[1.5px] w-full rounded-full bg-current transition-opacity duration-200 motion-reduce:transition-none",
          open ? "opacity-0" : "opacity-100",
        )}
      />
      <span
        className={cn(
          "absolute left-0 block h-[1.5px] w-full origin-center rounded-full bg-current transition-transform duration-200 ease-out motion-reduce:transition-none",
          open ? "top-[6px] -rotate-45" : "top-[12px]",
        )}
      />
    </span>
  );
}
