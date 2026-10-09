"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger position within a group. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
  variant?: "up" | "fade" | "scale" | "left" | "right";
};

/**
 * One scroll reveal used everywhere, instead of per-element motion props.
 *
 * Two reasons it is shared: ad-hoc values drift (0.7s here, 0.3s there, three
 * different easings) and that inconsistency is what reads as machine-made; and
 * it gives one place to honour prefers-reduced-motion, which per-element props
 * invariably forget.
 *
 * The easing is a gentle overshoot-free ease-out -- motion that decelerates
 * into place reads as physical, where linear or ease-in-out reads as a slide
 * show.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

const DISTANCE = 22;

function buildVariants(variant: NonNullable<RevealProps["variant"]>): Variants {
  const from: Record<string, number> = { opacity: 0 };
  if (variant === "up") from.y = DISTANCE;
  if (variant === "left") from.x = -DISTANCE;
  if (variant === "right") from.x = DISTANCE;
  if (variant === "scale") from.scale = 0.96;

  return {
    hidden: from,
    show: { opacity: 1, x: 0, y: 0, scale: 1 },
  };
}

export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  variant = "up",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  // Reduced motion still gets the content, just without the travel.
  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      className={className}
      variants={buildVariants(variant)}
      initial="hidden"
      whileInView="show"
      // once: the page should settle. Re-animating on every scroll-by is the
      // single most common thing that makes a site feel restless and cheap.
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/** Wrap a list so children stagger in sequence rather than all at once. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

/** Child of RevealGroup; inherits the parent's stagger timing. */
export function RevealItem({
  children,
  className,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  variant?: NonNullable<RevealProps["variant"]>;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={buildVariants(variant)}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
