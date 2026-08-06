"use client";

import { useEffect, useState } from "react";
import type { Transition, Variants } from "framer-motion";

const easeOut: Transition["ease"] = [0.22, 1, 0.36, 1];

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function useMotion() {
  const reduced = usePrefersReducedMotion();

  const fadeUp: Variants = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: reduced
        ? { duration: 0 }
        : { delay: Math.min(i, 3) * 0.06, duration: 0.45, ease: easeOut },
    }),
  };

  const fadeIn: Variants = {
    hidden: reduced ? { opacity: 1 } : { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduced ? { duration: 0 } : { duration: 0.4, ease: easeOut },
    },
  };

  const transition = (delay = 0): Transition =>
    reduced
      ? { duration: 0 }
      : { delay, duration: 0.45, ease: easeOut };

  return { reduced, fadeUp, fadeIn, transition, easeOut };
}

export const viewportOnce = { once: true, margin: "-60px" as const };
