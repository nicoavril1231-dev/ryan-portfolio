"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";

// Wrapper qui anime ses enfants en cascade — pattern Linear / Stripe.
// Un seul Intersection Observer (sur le parent), un seul timer, et les
// enfants <Reveal standalone={false}> cascadent automatiquement via
// `staggerChildren`.
//
// Avantages vs delay manuel sur chaque enfant :
// - Pas de "tous mes enfants se trigger en même frame parce qu'ils
//   sont entrés dans le viewport ensemble" → la cascade est garantie.
// - Un seul observer = perf.
// - L'ordre est maîtrisé même quand la grille a plusieurs colonnes.
interface RevealStaggerProps {
  children: ReactNode;
  className?: string;
  /** Décalage entre chaque enfant en secondes. Défaut 0.12 (~Stripe). */
  stagger?: number;
  /** Délai avant que la cascade démarre, après l'entrée dans le viewport. */
  delayChildren?: number;
  /** Pourcentage de visibilité pour déclencher (0 → 1). Défaut 0.2. */
  amount?: number;
}

export function RevealStagger({
  children,
  className,
  stagger = 0.12,
  delayChildren = 0.05,
  amount = 0.2,
}: RevealStaggerProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
