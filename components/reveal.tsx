"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";

// Wrapper d'apparition — déclenchement par Intersection Observer (whileInView)
// puis animation à durée fixe d'environ 1 s. Indépendant de la vitesse de
// scroll : même sur un flick rapide, l'animation a le temps de se dérouler
// pleinement après l'entrée de l'élément dans le viewport.
//
// Le stagger se fait via `delay` en secondes (transition delay natif), donc
// les cards d'une même rangée cascadent visiblement.
//
// Respecte `prefers-reduced-motion`.
interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Distance verticale initiale en px. */
  y?: number;
  /** Délai en secondes avant le début de l'animation (utile pour stagger). */
  delay?: number;
  /** Si true (défaut), l'animation ne joue qu'une fois (puis l'élément
   *  reste à son état final). */
  once?: boolean;
}

export function Reveal({
  children,
  className,
  y = 60,
  delay = 0,
  once = true,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{
        once,
        // Déclenche quand 15 % de l'élément est visible — c'est-à-dire dès
        // que sa partie haute apparaît clairement par le bas du viewport.
        amount: 0.15,
        // Le coin bas du viewport est rabaissé de 8 % pour que l'élément
        // soit déjà bien visible avant de déclencher.
        margin: "0px 0px -8% 0px",
      }}
      transition={{
        // Durée volontairement longue pour qu'on perçoive le mouvement même
        // si on scrolle vite. Easing expo-out — démarre vif, finit en
        // douceur, parfait pour un "glissement vers sa place".
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as const,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
