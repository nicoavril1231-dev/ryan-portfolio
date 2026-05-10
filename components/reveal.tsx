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
// - Démarre à 0 quand le haut de l'élément touche le bas du viewport
//   ("start end" → scrollYProgress = 0).
// - Atteint 1 quand le centre de l'élément est à mi-hauteur du viewport
//   ("center center" → scrollYProgress = 1).
// - Réversible : remonter la page rejoue l'effet à l'envers.
//
// Respecte `prefers-reduced-motion` (rendu plat sans anim).
interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Distance verticale initiale en px (l'élément glisse depuis y vers 0). */
  y?: number;
  /**
   * @deprecated — l'API est désormais scroll-linked. Le delay ne s'applique
   * plus. Conservé en signature pour ne pas casser les usages existants.
   */
  delay?: number;
  /**
   * @deprecated — l'animation scroll-linked est par nature réversible.
   * Conservé pour compat.
   */
  once?: boolean;
}

export function Reveal({ children, className, y = 60 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Mappe le scroll de l'élément vers 0 → 1 sur sa fenêtre d'apparition.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Interpolations dérivées — clamp par défaut : au-delà de 1 ça reste à 1.
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [y, 0]);
  // Blur passe rapidement à 0 (les 70 % du chemin) pour que la "résolution"
  // de l'élément se fasse plus tôt que son arrivée à sa position finale.
  const blurValue = useTransform(scrollYProgress, [0, 0.7, 1], [8, 1, 0]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  // useReducedMotion() retourne null avant hydratation, true/false après.
  // On ne court-circuite que si on est sûr que l'utilisateur préfère rien.
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
