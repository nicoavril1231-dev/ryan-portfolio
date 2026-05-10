"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Slim barre de progression en haut de la page — montre où on en est
// dans la page. `useSpring` lisse la valeur pour éviter le saccade sur
// les scrolls rapides. z-60 pour passer par-dessus la sidebar.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(to right, var(--accent-from), var(--accent-to))",
      }}
    />
  );
}
