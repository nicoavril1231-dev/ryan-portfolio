"use client";

import { Briefcase, Compass, Hand, Send, Zap } from "lucide-react";
import { motion, type Variants } from "motion/react";

// Icônes animées de la sidebar.
// Chaque variant est déclenché par le parent (Link wrappé en motion.div) qui
// passe en `whileHover="hover"`. Les anims sont volontairement courtes
// (≤ 0.7s), ease-out, et rejouent à chaque hover — pas de boucles infinies.

const briefcaseVariants: Variants = {
  rest: { y: 0 },
  // Petit "soulèvement" en double rebond, comme si on saisissait la poignée.
  hover: {
    y: [0, -2, 0, -1.5, 0],
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const handVariants: Variants = {
  rest: { rotate: 0 },
  // Wave classique — rotation alternée autour du poignet (origin bas-droit).
  hover: {
    rotate: [0, 14, -8, 14, -4, 0],
    transition: { duration: 0.7, ease: "easeInOut" as const },
  },
};

const zapVariants: Variants = {
  rest: {
    scale: 1,
    filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
  },
  // Pulse + glow : l'éclair "claque" et brille le temps du hover.
  hover: {
    scale: [1, 1.18, 1.1],
    filter: [
      "drop-shadow(0 0 0 rgba(0,0,0,0))",
      "drop-shadow(0 0 8px var(--accent-from))",
      "drop-shadow(0 0 4px var(--accent-from))",
    ],
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

const compassVariants: Variants = {
  rest: { rotate: 0 },
  // Tour complet une fois au hover. Le retour à 0 se fait en reverse mais
  // sur 0.4s, ça reste fluide.
  hover: {
    rotate: 360,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const sendVariants: Variants = {
  rest: { x: 0, y: 0, rotate: 0 },
  // L'avion "décolle" en diagonale haut-droite, légère bascule.
  hover: {
    x: 3,
    y: -3,
    rotate: -8,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

// On enveloppe Lucide dans un motion.span pour appliquer les variants au
// niveau parent. strokeWidth 1.75 pour cohérence visuelle entre les 5.
const iconClass = "size-5";
const iconStroke = 1.75;

export const NAV_ICONS = {
  work: () => (
    <motion.span
      variants={briefcaseVariants}
      className="inline-flex"
      style={{ willChange: "transform" }}
    >
      <Briefcase className={iconClass} strokeWidth={iconStroke} />
    </motion.span>
  ),
  about: () => (
    <motion.span
      variants={handVariants}
      className="inline-flex origin-bottom-right"
      style={{ willChange: "transform" }}
    >
      <Hand className={iconClass} strokeWidth={iconStroke} />
    </motion.span>
  ),
  skills: () => (
    <motion.span
      variants={zapVariants}
      className="inline-flex"
      style={{ willChange: "transform, filter" }}
    >
      <Zap className={iconClass} strokeWidth={iconStroke} />
    </motion.span>
  ),
  journey: () => (
    <motion.span
      variants={compassVariants}
      className="inline-flex"
      style={{ willChange: "transform" }}
    >
      <Compass className={iconClass} strokeWidth={iconStroke} />
    </motion.span>
  ),
  contact: () => (
    <motion.span
      variants={sendVariants}
      className="inline-flex"
      style={{ willChange: "transform" }}
    >
      <Send className={iconClass} strokeWidth={iconStroke} />
    </motion.span>
  ),
} as const;

export type NavIconKey = keyof typeof NAV_ICONS;
