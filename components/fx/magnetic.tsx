"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import {
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

// Wrapper "aimanté" : l'enfant est légèrement attiré vers le curseur sur hover.
// On garde l'effet discret (intensity ≤ 0.4) — au-delà ça devient gimmick.
interface MagneticProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function Magnetic({
  children,
  className,
  intensity = 0.3,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring pour lisser le mouvement (sinon ça suit pixel-par-pixel).
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const handleMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX * intensity);
    y.set(offsetY * intensity);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
