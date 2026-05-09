"use client";

import { motion, type Variants } from "motion/react";
import { type ReactNode } from "react";

// Wrapper "fade-up on scroll" — utilisé dans toutes les sections pour donner
// du rythme sans avoir à recoder les variants à chaque fois.

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  // Décalage de translation initiale en px.
  y?: number;
  // Une seule fois suffit — on ne déclenche pas en boucle.
  once?: boolean;
}

const buildVariants = (y: number): Variants => ({
  hidden: { opacity: 0, y, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
});

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={buildVariants(y)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
