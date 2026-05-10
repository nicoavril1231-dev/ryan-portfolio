"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

// Wrapper "scroll-linked" : opacity, translate-y et blur sont interpolés
// directement sur la position de l'élément dans le viewport.
//
// Fenêtre d'apparition (assez longue pour rester visible même sur scroll
// rapide, mais avec une fin précoce) :
// - 0 : top de l'élément à 95 % du viewport (commence à apparaître).
// - 1 : top de l'élément à 50 % (encore dans la moitié basse du viewport).
//
// Le `delay` (0 → 0.4) staggere dans la fenêtre : pour des éléments à
// la même position Y (cards en rangée), on décale le début de chacun
// pour qu'ils cascadent au lieu d'apparaître ensemble.
//
// Le `useSpring` sur scrollYProgress ajoute une inertie : sur un scroll
// rapide à la molette ou au trackpad, l'animation a le temps de se
// jouer au lieu de se claquer en quelques frames.
//
// Respecte `prefers-reduced-motion`.
interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Distance verticale initiale en px (l'élément glisse depuis y vers 0). */
  y?: number;
  /** Stagger offset (0 → 0.4). Décale le début de l'animation. */
  delay?: number;
  /**
   * @deprecated — l'animation scroll-linked est réversible par nature.
   */
  once?: boolean;
}

export function Reveal({
  children,
  className,
  y = 50,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 50%"],
  });

  // Inertie : même sur un flick rapide, scrollYProgress arrive lissé.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.4,
  });

  // Clamp pour éviter qu'un delay trop grand sorte de la fenêtre.
  const start = Math.max(0, Math.min(delay, 0.4));
  const end = Math.min(start + 0.6, 1);
  const blurEnd = Math.min(start + 0.4, 1);

  const opacity = useTransform(smoothProgress, [start, end], [0, 1]);
  const translate = useTransform(smoothProgress, [start, end], [y, 0]);
  const blurValue = useTransform(smoothProgress, [start, blurEnd], [6, 0]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, y: translate, filter }}
    >
      {children}
    </motion.div>
  );
}
