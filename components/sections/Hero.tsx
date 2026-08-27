"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  MessageCircle,
  MessagesSquare,
  RotateCcw,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/lib/constants";
import { useMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SUPPORT_POINTS = [
  "WhatsApp Business",
  "Instagram DMs",
  "Facebook Messenger",
  "Live inbox + takeover",
  "Agency billing",
] as const;

const VALUE_POINTS = [
  "Answers ad leads in seconds",
  "Books demos and takes orders",
  "You bill the agency, never the shop",
] as const;

const CHANNELS = [
  { label: "WhatsApp", icon: MessageCircle },
  { label: "Instagram", icon: Camera },
  { label: "Facebook", icon: MessagesSquare },
] as const;

/** Animation step indices for the mockup sequence */
const STEPS = {
  header: 0,
  msg1: 1,
  reply1: 2,
  msg2: 3,
  reply2: 4,
  badges: 5,
  summary: 6,
  takeover: 7,
  done: 8,
} as const;

export function Hero() {
  const { fadeUp } = useMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-[var(--header-height)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_70%_20%,rgba(13,148,136,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_15%_0%,rgba(209,250,229,0.35),transparent_55%)]" />
        <div className="hero-grid absolute inset-0 opacity-[0.32]" />
      </div>

      {/* Floating channel badges — restrained */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        {CHANNELS.map((ch, i) => {
          const Icon = ch.icon;
          const positions = [
            "left-[3%] top-[32%]",
            "left-[5%] top-[48%]",
            "left-[2%] top-[64%]",
          ];
          return (
            <motion.div
              key={ch.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.08, duration: 0.4 }}
              className={cn(
                "absolute flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)]/90 px-2.5 py-1 shadow-[var(--shadow-sm)] xl:left-[max(0.5rem,calc((100%-var(--container))/2-0.5rem))]",
                positions[i],
              )}
            >
              <Icon className="h-3 w-3 text-[var(--primary)]" strokeWidth={2} />
              <span className="font-[family-name:var(--font-mono)] text-[0.625rem] font-medium uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                {ch.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      <Container className="relative py-12 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
          {/* Copy column */}
          <div className="min-w-0 max-w-xl">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="type-eyebrow"
            >
              For digital agencies and performance marketers
            </motion.p>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="type-section mt-4 !text-[clamp(1.85rem,4.2vw,2.75rem)]"
            >
              AI conversations that close leads — on WhatsApp, Instagram, and Facebook.
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-5 font-[family-name:var(--font-display)] text-lg font-medium tracking-tight text-[var(--primary-dark)] sm:text-xl"
            >
              An AI inbox on every client’s Meta channels.
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="type-body-muted mt-4 max-w-md text-[0.975rem] sm:text-base"
            >
              Replii answers ad leads in seconds, books demos, takes orders, and
              lets a human jump in — while you bill the agency, never the end
              customer.
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                href={CTA.primary.href}
                size="lg"
                withArrow
                className="w-full sm:w-auto"
              >
                {CTA.primary.label}
              </Button>
              <Button
                href={CTA.secondary.href}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {CTA.secondary.label}
              </Button>
            </motion.div>

            <motion.p
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-6 text-sm leading-relaxed text-[var(--text-secondary)]"
            >
              {SUPPORT_POINTS.map((point, i) => (
                <span key={point}>
                  {i > 0 ? (
                    <span className="mx-2 text-[var(--border-strong)]" aria-hidden>
                      ·
                    </span>
                  ) : null}
                  {point}
                </span>
              ))}
            </motion.p>

            <motion.ul
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-2"
            >
              {VALUE_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 text-sm text-[var(--text-primary)]/85"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]"
                    aria-hidden
                  />
                  {point}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Mockup column */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="min-w-0 w-full"
          >
            <HeroMockup />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function HeroMockup() {
  const { reduced } = useMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [playId, setPlayId] = useState(0);
  const [started, setStarted] = useState(false);
  const [complete, setComplete] = useState(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const runSequence = useCallback(() => {
    clearTimers();
    setComplete(false);

    if (reduced) {
      setStep(STEPS.done);
      setComplete(true);
      return;
    }

    setStep(0);
    const schedule = (s: number, ms: number) => {
      const id = window.setTimeout(() => setStep(s), ms);
      timersRef.current.push(id);
    };

    schedule(STEPS.header, 0);
    schedule(STEPS.msg1, 400);
    schedule(STEPS.reply1, 1100);
    schedule(STEPS.msg2, 2000);
    schedule(STEPS.reply2, 2800);
    schedule(STEPS.badges, 3400);
    schedule(STEPS.summary, 3900);
    schedule(STEPS.takeover, 4400);
    const doneId = window.setTimeout(() => {
      setStep(STEPS.done);
      setComplete(true);
    }, 4700);
    timersRef.current.push(doneId);
  }, [clearTimers, reduced]);

  // Play once when visible
  useEffect(() => {
    const el = rootRef.current;
    if (!el || started) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          runSequence();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started, runSequence]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const show = (minStep: number) => step >= minStep;

  const replay = () => {
    clearTimers();
    setStep(0);
    setComplete(false);
    setPlayId((n) => n + 1);
    window.setTimeout(() => {
      runSequence();
    }, 0);
  };

  const summary = [
    ["Location", "Karachi"],
    ["Service", "Single implant"],
    ["Timeline", "This month"],
    ["Intent", "High"],
    ["Source", "WhatsApp Ad"],
    ["Next step", "Demo slot"],
  ] as const;

  return (
    <div ref={rootRef} className="relative w-full min-w-0 max-w-full">
      <p className="mb-2 font-[family-name:var(--font-mono)] text-[0.625rem] font-medium uppercase tracking-[0.1em] text-[var(--text-secondary)]">
        What the client inbox does in seconds — without extra staff
      </p>
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-lg)]">
        {/* App chrome */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] bg-[var(--surface-muted)]/60 px-3 py-2.5 sm:px-4">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <AnimatePresence>
              {show(STEPS.header) ? (
                <motion.div
                  initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <Badge variant="mint">WhatsApp Ad</Badge>
                </motion.div>
              ) : (
                <span className="h-6 w-24" />
              )}
            </AnimatePresence>
            <span className="truncate text-xs font-medium text-[var(--text-secondary)] sm:text-sm">
              Dental Implants — August
            </span>
          </div>
          <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.1em] text-[var(--text-secondary)]">
            Live inbox
          </span>
        </div>

        <div className="grid min-w-0 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Conversation */}
          <div className="flex min-w-0 flex-col border-b border-[var(--border)] lg:border-b-0 lg:border-r">
            <div className="flex min-h-[280px] flex-col gap-2.5 p-3 sm:min-h-[300px] sm:gap-3 sm:p-4" key={playId}>
              <ChatBubble
                visible={show(STEPS.msg1)}
                side="customer"
                text="Hi, how much are dental implants?"
                reduced={reduced}
              />
              <ChatBubble
                visible={show(STEPS.reply1)}
                side="replii"
                text="Happy to help with implant pricing. Are you looking for a single implant or a complete treatment plan?"
                reduced={reduced}
                qualify
              />
              <ChatBubble
                visible={show(STEPS.msg2)}
                side="customer"
                text="Single implant in Karachi. I want it done this month."
                reduced={reduced}
              />
              <ChatBubble
                visible={show(STEPS.reply2)}
                side="replii"
                text="Got it — location, service, and timeline noted. I can show available demo slots next."
                reduced={reduced}
                qualify
              />

              <AnimatePresence>
                {show(STEPS.badges) ? (
                  <motion.div
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-auto flex flex-wrap items-center gap-2 pt-2"
                  >
                    <Badge variant="mint">Ready for your team</Badge>
                    <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[0.6875rem] font-medium text-[var(--primary-dark)]">
                      Qualified · ready for takeover
                    </span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="border-t border-[var(--border)] bg-[var(--surface-muted)]/40 p-3 sm:p-4">
              <AnimatePresence>
                {show(STEPS.takeover) ? (
                  <motion.button
                    type="button"
                    initial={reduced ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-medium text-[var(--text-primary)] shadow-[var(--shadow-sm)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--background)] sm:w-auto"
                  >
                    <UserRound className="h-4 w-4 text-[var(--primary)]" />
                    Human takeover
                  </motion.button>
                ) : (
                  <div className="h-11" />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Lead summary panel */}
          <div className="min-w-0 bg-[var(--surface-dark)] p-3 text-[var(--text-inverse)] sm:p-4">
            <p className="font-[family-name:var(--font-mono)] text-[0.625rem] font-medium uppercase tracking-[0.12em] text-[var(--accent-mint)]/75">
              Lead summary
            </p>
            <AnimatePresence mode="wait">
              {show(STEPS.summary) ? (
                <motion.ul
                  key="summary"
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 space-y-3"
                >
                  {summary.map(([label, value], i) => (
                    <motion.li
                      key={label}
                      initial={reduced ? false : { opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: reduced ? 0 : i * 0.05 }}
                      className="flex items-start justify-between gap-3 border-b border-white/10 pb-2.5 text-sm last:border-0 last:pb-0"
                    >
                      <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.08em] text-[var(--text-inverse-muted)]">
                        {label}
                      </span>
                      <span className="text-right font-medium text-[var(--text-inverse)]">
                        {value}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <motion.div
                  key="placeholder"
                  className="mt-4 space-y-3"
                  aria-hidden
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-8 rounded-md bg-white/[0.04]"
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Replay control */}
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={replay}
          disabled={!complete && !reduced && step > 0 && step < STEPS.done}
          className={cn(
            "inline-flex min-h-11 items-center gap-1.5 rounded-[var(--radius-control)] px-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 disabled:opacity-40",
          )}
          aria-label="Replay conversation demo"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          Replay
        </button>
      </div>
    </div>
  );
}

function ChatBubble({
  visible,
  side,
  text,
  reduced,
  qualify = false,
}: {
  visible: boolean;
  side: "customer" | "replii";
  text: string;
  reduced: boolean;
  qualify?: boolean;
}) {
  const isReplii = side === "replii";

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className={cn("flex", isReplii ? "justify-end" : "justify-start")}
        >
          <div
            className={cn(
              "max-w-[min(100%,16.5rem)] rounded-2xl px-3 py-2 text-[0.8125rem] leading-relaxed sm:max-w-[85%] sm:px-3.5 sm:py-2.5 sm:text-sm",
              isReplii
                ? "rounded-br-md bg-[var(--accent-mint)] text-[var(--primary-dark)]"
                : "rounded-bl-md bg-[var(--surface-muted)] text-[var(--text-primary)]",
            )}
          >
            {isReplii ? (
              <span className="mb-1 flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[0.625rem] font-medium uppercase tracking-[0.1em] text-[var(--primary-dark)]/65">
                Replii
                {qualify ? (
                  <span className="rounded bg-[var(--primary)]/15 px-1 py-px normal-case tracking-normal text-[var(--primary-dark)]">
                    qualifying
                  </span>
                ) : null}
              </span>
            ) : (
              <span className="mb-1 block font-[family-name:var(--font-mono)] text-[0.625rem] font-medium uppercase tracking-[0.1em] text-[var(--text-secondary)]">
                Customer
              </span>
            )}
            {text}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
