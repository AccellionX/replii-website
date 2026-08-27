"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Play, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  DEMO_INBOX_WORK,
  DEMO_SCENARIOS,
  type DemoScenario,
  type DemoScenarioId,
} from "@/lib/data";
import { useMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FlowPhase =
  | "idle"
  | "message"
  | "reply"
  | "qualifying"
  | "complete";

const PHASE_ORDER: FlowPhase[] = [
  "idle",
  "message",
  "reply",
  "qualifying",
  "complete",
];

function phaseIndex(phase: FlowPhase) {
  return PHASE_ORDER.indexOf(phase);
}

export function ProductDemo() {
  const baseId = useId();
  const { reduced } = useMotion();
  const [activeId, setActiveId] = useState<DemoScenarioId>("dental");
  const [phase, setPhase] = useState<FlowPhase>("idle");
  const [qualifiedCount, setQualifiedCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Scenario ready. Press Play flow to begin.");
  const timersRef = useRef<number[]>([]);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const scenario =
    DEMO_SCENARIOS.find((s) => s.id === activeId) ?? DEMO_SCENARIOS[0];

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const resetFlow = useCallback(
    (announce = true) => {
      clearTimers();
      setPhase("idle");
      setQualifiedCount(0);
      if (announce) {
        setStatusMessage(
          `${scenario.label} scenario reset. Press Play flow to begin.`,
        );
      }
    },
    [clearTimers, scenario.label],
  );

  const selectScenario = useCallback(
    (id: DemoScenarioId) => {
      clearTimers();
      setActiveId(id);
      setPhase("idle");
      setQualifiedCount(0);
      const next = DEMO_SCENARIOS.find((s) => s.id === id);
      setStatusMessage(
        `${next?.label ?? "Scenario"} selected. Press Play flow to begin.`,
      );
    },
    [clearTimers],
  );

  const playFlow = useCallback(() => {
    clearTimers();
    setPhase("idle");
    setQualifiedCount(0);
    setStatusMessage(`Playing ${scenario.label} flow…`);

    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, reduced ? 0 : ms);
      timersRef.current.push(id);
    };

    const delays = reduced
      ? { message: 0, reply: 0, qualifying: 0, answers: [0, 0, 0, 0], complete: 0 }
      : {
          message: 350,
          reply: 1100,
          qualifying: 1800,
          answers: [2200, 2700, 3200, 3700],
          complete: 4300,
        };

    schedule(() => {
      setPhase("message");
      setStatusMessage("Incoming lead message received.");
    }, delays.message);

    schedule(() => {
      setPhase("reply");
      setStatusMessage("Replii replied and started qualification.");
    }, delays.reply);

    schedule(() => {
      setPhase("qualifying");
      setStatusMessage("Capturing qualification answers…");
    }, delays.qualifying);

    scenario.qualification.forEach((_, i) => {
      schedule(() => {
        setQualifiedCount(i + 1);
        setStatusMessage(
          `Qualified: ${scenario.qualification[i]}.`,
        );
      }, delays.answers[i] ?? delays.answers[delays.answers.length - 1]);
    });

    schedule(() => {
      setPhase("complete");
      setQualifiedCount(scenario.qualification.length);
      setStatusMessage(`Outcome: ${scenario.outcome}.`);
    }, delays.complete);
  }, [clearTimers, reduced, scenario]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const onTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const count = DEMO_SCENARIOS.length;
    let next = index;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      next = (index + 1) % count;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      next = (index - 1 + count) % count;
    } else if (e.key === "Home") {
      e.preventDefault();
      next = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      next = count - 1;
    } else {
      return;
    }

    const id = DEMO_SCENARIOS[next]?.id;
    if (!id) return;
    selectScenario(id);
    tabRefs.current[next]?.focus();
  };

  const progress =
    phase === "idle"
      ? 0
      : phase === "message"
        ? 20
        : phase === "reply"
          ? 40
          : phase === "qualifying"
            ? 40 + (qualifiedCount / scenario.qualification.length) * 45
            : 100;

  const playing = phase !== "idle" && phase !== "complete";

  return (
    <section
      id="product-demo"
      className="section-pad scroll-mt-header"
    >
      <Container>
        <SectionHeading
          eyebrow="Interactive demo"
          title="Watch Replii close the first conversation."
          description="Pick a client niche. See the AI greet, qualify, book a slot or take an order — then hand off to the live inbox."
        />

        <div className="mt-10 sm:mt-12">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Industry scenarios"
            className="flex flex-wrap gap-2"
          >
            {DEMO_SCENARIOS.map((tab, index) => {
              const selected = tab.id === activeId;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectScenario(tab.id)}
                  onKeyDown={(e) => onTabKeyDown(e, index)}
                  className={cn(
                    "min-h-11 rounded-[var(--radius-control)] border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
                    selected
                      ? "border-[var(--primary)] bg-[var(--accent-mint)] text-[var(--primary-dark)]"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Live status for assistive tech */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {statusMessage}
          </div>

          {DEMO_SCENARIOS.map((tab) => {
            const selected = tab.id === activeId;
            return (
              <div
                key={tab.id}
                role="tabpanel"
                id={`${baseId}-panel-${tab.id}`}
                aria-labelledby={`${baseId}-tab-${tab.id}`}
                hidden={!selected}
                className={cn(!selected && "hidden")}
              >
                {selected ? (
                  <DemoPanel
                    scenario={scenario}
                    phase={phase}
                    qualifiedCount={qualifiedCount}
                    progress={progress}
                    playing={playing}
                    reduced={reduced}
                    onPlay={playFlow}
                    onReset={() => resetFlow(true)}
                    statusMessage={statusMessage}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function DemoPanel({
  scenario,
  phase,
  qualifiedCount,
  progress,
  playing,
  reduced,
  onPlay,
  onReset,
  statusMessage,
}: {
  scenario: DemoScenario;
  phase: FlowPhase;
  qualifiedCount: number;
  progress: number;
  playing: boolean;
  reduced: boolean;
  onPlay: () => void;
  onReset: () => void;
  statusMessage: string;
}) {
  const showMessage = phaseIndex(phase) >= phaseIndex("message");
  const showReply = phaseIndex(phase) >= phaseIndex("reply");
  const showQual = phaseIndex(phase) >= phaseIndex("qualifying");
  const showOutcome = phase === "complete";

  const inboxDoneCount =
    phase === "idle"
      ? 0
      : phase === "message"
        ? 1
        : phase === "reply"
          ? 2
          : phase === "qualifying"
            ? 2 + Math.min(qualifiedCount, 4)
            : DEMO_INBOX_WORK.length;

  return (
    <div className="mt-6">
      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="md"
            onClick={onPlay}
            disabled={playing}
            className="min-h-11"
          >
            <Play className="h-4 w-4" aria-hidden />
            Play flow
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onReset}
            className="min-h-11"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Reset
          </Button>
        </div>
        <p
          className="text-sm text-[var(--text-secondary)]"
          aria-hidden="true"
        >
          {statusMessage}
        </p>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="type-metric-label">Flow progress</span>
          <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-secondary)]">
            {Math.round(progress)}%
          </span>
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-muted)]"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          aria-label="Demo flow progress"
        >
          <motion.div
            className="h-full rounded-full bg-[var(--primary)]"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={
              reduced ? { duration: 0 } : { duration: 0.35, ease: "easeOut" }
            }
          />
        </div>
      </div>

      {/* Mockup + inbox work panel */}
      <div className="mt-6 grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.7fr)]">
        <div className="min-w-0 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-md)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] bg-[var(--surface-muted)]/50 px-4 py-3">
            <Badge variant="mint">{scenario.source.split(" — ")[0]}</Badge>
            <span className="text-xs font-medium text-[var(--text-secondary)] sm:text-sm">
              {scenario.source.includes(" — ")
                ? scenario.source.split(" — ").slice(1).join(" — ")
                : scenario.source}
            </span>
          </div>

          <div className="grid min-w-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="min-w-0 border-b border-[var(--border)] p-4 sm:p-5 lg:border-r lg:border-b-0">
              <p className="type-metric-label mb-4">Conversation</p>
              <div className="flex min-h-[220px] flex-col gap-3">
                <AnimatePresence mode="popLayout">
                  {showMessage ? (
                    <motion.div
                      key="incoming"
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: reduced ? 0 : 0.25 }}
                      className="max-w-[min(100%,17.5rem)] rounded-2xl rounded-bl-md bg-[var(--surface-muted)] px-3 py-2 text-[0.8125rem] leading-relaxed text-[var(--text-primary)] sm:max-w-[85%] sm:px-3.5 sm:py-2.5 sm:text-sm"
                    >
                      <span className="mb-1 block font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.1em] text-[var(--text-secondary)]">
                        Customer
                      </span>
                      {scenario.incoming}
                    </motion.div>
                  ) : (
                    <p className="text-sm text-[var(--text-secondary)]">
                      Waiting to play — press Play flow.
                    </p>
                  )}

                  {showReply ? (
                    <motion.div
                      key="reply"
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: reduced ? 0 : 0.25 }}
                      className="ml-auto max-w-[min(100%,17.5rem)] rounded-2xl rounded-br-md bg-[var(--accent-mint)] px-3 py-2 text-[0.8125rem] leading-relaxed text-[var(--primary-dark)] sm:max-w-[85%] sm:px-3.5 sm:py-2.5 sm:text-sm"
                    >
                      <span className="mb-1 block font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.1em] text-[var(--primary-dark)]/65">
                        Replii
                      </span>
                      {scenario.repliiOpener}
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {showOutcome ? (
                  <motion.div
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-auto"
                  >
                    <Badge variant="mint">{scenario.outcome}</Badge>
                  </motion.div>
                ) : null}
              </div>
            </div>

            <div className="min-w-0 bg-[var(--surface-dark)] p-4 text-[var(--text-inverse)] sm:p-5">
              <p className="font-[family-name:var(--font-mono)] text-[0.625rem] font-medium uppercase tracking-[0.12em] text-[var(--accent-mint)]/75">
                Qualification
              </p>
              <ul className="mt-4 space-y-3">
                {scenario.qualification.map((field, i) => {
                  const filled = showQual && i < qualifiedCount;
                  return (
                    <li
                      key={field}
                      className="border-b border-white/10 pb-3 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.08em] text-[var(--text-inverse-muted)]">
                          {field}
                        </span>
                        <span
                          className={cn(
                            "text-right text-sm font-medium",
                            filled
                              ? "text-[var(--text-inverse)]"
                              : "text-[var(--text-inverse)]/25",
                          )}
                        >
                          {filled ? scenario.answers[i] : "—"}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.08em] text-[var(--text-inverse-muted)]">
                  Outcome
                </p>
                <p
                  className={cn(
                    "mt-2 text-sm font-medium",
                    showOutcome
                      ? "text-[var(--accent-mint)]"
                      : "text-[var(--text-inverse)]/30",
                  )}
                >
                  {showOutcome ? scenario.outcome : "Pending play"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Inbox work side panel */}
        <aside className="min-w-0 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-sm)] sm:p-5">
          <p className="font-[family-name:var(--font-mono)] text-[0.625rem] font-medium uppercase tracking-[0.12em] text-[var(--text-secondary)]">
            Inbox work handled by Replii
          </p>
          <ul className="mt-4 space-y-2.5">
            {DEMO_INBOX_WORK.map((item, i) => {
              const done = i < inboxDoneCount;
              return (
                <li
                  key={item}
                  className={cn(
                    "flex items-start gap-2.5 text-sm",
                    done
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)]/55",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                      done
                        ? "border-[var(--primary)] bg-[var(--accent-mint)] text-[var(--primary-dark)]"
                        : "border-[var(--border)]",
                    )}
                  >
                    {done ? (
                      <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                    ) : null}
                  </span>
                  {item}
                </li>
              );
            })}
          </ul>

          {showOutcome ? (
            <div className="mt-6 rounded-[var(--radius-control)] border border-[var(--primary)]/25 bg-[var(--accent-mint)]/40 p-4">
              <p className="font-[family-name:var(--font-mono)] text-[0.625rem] font-medium uppercase tracking-[0.1em] text-[var(--primary-dark)]/70">
                Your client’s team enters here
              </p>
              <p className="mt-2 text-sm font-medium text-[var(--primary-dark)]">
                Qualified lead summary ready
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-[var(--primary-dark)]/85">
                {scenario.qualification.map((field, i) => (
                  <li key={field} className="flex justify-between gap-2">
                    <span>{field}</span>
                    <span className="font-medium">{scenario.answers[i]}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-[var(--primary)]/15 pt-3 text-sm font-medium text-[var(--primary-dark)]">
                Recommended action: {scenario.outcome}
              </p>
            </div>
          ) : (
            <p className="mt-6 text-xs leading-relaxed text-[var(--text-secondary)]">
              Press Play flow to watch Replii complete the first-response work
              before handoff.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
