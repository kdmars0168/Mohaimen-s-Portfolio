import type { Transition, Variants } from "framer-motion";

/** Shared motion tokens — one rhythm for the whole site. */
export const DUR = { fast: 0.2, base: 0.45, slow: 0.8 } as const;

/** easeOutQuint-ish — the house easing. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const STAGGER = { tight: 0.06, base: 0.09, loose: 0.14 } as const;

export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.9,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 32,
};

export const VIEWPORT = { once: true, amount: 0.2 } as const;

export const fadeUp = (distance = 24): Variants => ({
  hidden: { opacity: 0, y: distance },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
});

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.base, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: DUR.base, ease: EASE } },
};

/** Parent variants that stagger their children. */
export const staggerParent = (stagger: number = STAGGER.base, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});
