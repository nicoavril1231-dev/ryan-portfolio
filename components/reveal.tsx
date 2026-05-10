"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { type ReactNode } from "react";

// Variants partagées : utilisable soit en mode standalone (whileInView
// déclenche tout), soit comme enfant d'un <RevealStagger> qui pilote
// l'animation via le tree des variants (un seul observer pour tout le
// groupe + cascade naturelle via staggerChildren).
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as const, // expo-out
    },
  },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  /**
   * Délai en secondes (mode standalone uniquement). Ignoré quand le
   * Reveal est enfant d'un <RevealStagger>.
   */
  delay?: number;
  /** Si true (défaut), déclenche son propre observer. Si false, attend
   *  que le parent variant tree pilote son animation. */
  standalone?: boolean;
  /** @deprecated réservé compat */
  y?: number;
  /** @deprecated réservé compat */
  once?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  standalone = true,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  if (standalone) {
    // Mode autonome : observer + animation déclenchée à l'entrée du
    // viewport. Trigger à 25 % de visibilité pour que l'élément soit
    // bien dans le champ de vision avant que ça commence.
    return (
      <motion.div
        className={className}
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    );
  }

  // Mode "child" : le parent (RevealStagger) pilote via variant tree.
  return (
    <motion.div className={className} variants={fadeUpVariants}>
      {children}
    </motion.div>
  );
}
