"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

// Wrapper "scroll-linked" : opacity, translate-y et blur sont interpolés
// directement sur la position de l'élément dans le viewport.
//
// Fenêtre d'apparition (raccourcie pour finir tôt) :
// - 0 : top de l'élément à 90 % de la hauteur du viewport (l'élément
//   commence à peine à apparaître par le bas).
// - 1 : top de l'élément à 60 % (l'élément est largement visible mais
//   pas encore centré → l'animation est terminée AVANT sa position
//   finale, comme demandé).
//
// Le `delay` (0 → 0.4) sert maintenant à staggerer dans la fenêtre :
// pour des éléments à la même position Y (cards en rangée), on décale le
// début de chacun pour qu'ils cascadent au lieu d'apparaître ensemble.
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
    offset: ["start 90%", "start 60%"],
  });

  // Clamp pour éviter qu'un delay trop grand sorte de la fenêtre.
  const start = Math.max(0, Math.min(delay, 0.4));
  const end = Math.min(start + 0.5, 1);
  const blurEnd = Math.min(start + 0.35, 1);

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const translate = useTransform(scrollYProgress, [start, end], [y, 0]);
  const blurValue = useTransform(scrollYProgress, [start, blurEnd], [6, 0]);
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
