import type { Variants, Transition } from "framer-motion";

// ─── Timing Tokens ───────────────────────────────────────────────────────────

export const timing = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
} as const;

export const spring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

// ─── Fade Variants ───────────────────────────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: timing.slow } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: timing.slow } },
};

// ─── Slide Variants ──────────────────────────────────────────────────────────

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: timing.verySlow } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: timing.verySlow } },
};

// ─── Scale Variants ──────────────────────────────────────────────────────────

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

// ─── Stagger Container ──────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: timing.normal },
  },
};

// ─── Float Animation ─────────────────────────────────────────────────────────

export const float: Variants = {
  animate: {
    y: [-10, 10, -10],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

// ─── Hover Presets ───────────────────────────────────────────────────────────

export const hoverScale = { scale: 1.03, transition: spring };
export const hoverScaleButton = { scale: 1.05, transition: spring };
export const hoverLift = {
  y: -4,
  transition: { duration: timing.normal, ease: [0, 0, 0.2, 1] as const },
};

// ─── Sidebar Animation ──────────────────────────────────────────────────────

export const sidebarAnimation: Variants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: spring,
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: timing.normal },
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const viewportOnce = { once: true, margin: "0px 0px -80px 0px" as const };
