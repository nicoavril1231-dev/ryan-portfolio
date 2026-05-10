"use client";

import { ArrowDown, ArrowRight, Mail } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { AnimatedGrid } from "@/components/fx/animated-grid";
import { Magnetic } from "@/components/fx/magnetic";
import { Noise } from "@/components/fx/noise";
import { Orbs } from "@/components/fx/orbs";
import { Spotlight } from "@/components/fx/spotlight";
import { useDictionary } from "@/components/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

// Stagger discret pour l'apparition séquentielle.
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const dict = useDictionary();
  const t = dict.hero;

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      {/* Couches d'arrière-plan, du plus profond au plus surfacique */}
      <Orbs />
      <AnimatedGrid />
      <Spotlight />
      <Noise opacity={0.05} />

      {/* Halo de fond très large derrière le titre, pour le faire "ressortir" */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.15] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--accent-from) 0%, transparent 60%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-6 py-12 md:gap-7 md:py-16"
      >
        {/* Badge statut — dot pulsant + dispo */}
        <motion.div variants={item}>
          <Badge variant="status" className="gap-2 px-3 py-1.5 text-[13px]">
            <span className="relative inline-flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {t.availability}
          </Badge>
        </motion.div>

        {/* Sous-titre court juste au-dessus du nom */}
        <motion.p
          variants={item}
          className="font-mono text-xs uppercase tracking-[0.25em] text-(--muted-foreground)"
        >
          {t.role} · {t.location} {t.locationFlag}
        </motion.p>

        {/* Nom géant — gradient text, line-height resserré */}
        <motion.h1
          variants={item}
          className="text-balance font-sans text-6xl font-semibold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
        >
          <span className="text-gradient animate-(--animate-gradient)">
            {site.name.split(" ")[0]}
          </span>
          <br />
          <span className="text-(--foreground)">
            {site.name.split(" ").slice(1).join(" ")}
          </span>
          <span className="text-gradient">.</span>
        </motion.h1>

        {/* Pitch */}
        <motion.div
          variants={item}
          className="flex max-w-2xl flex-col gap-2 text-base text-(--muted-foreground) md:text-lg"
        >
          <p>
            <span className="text-(--foreground)">{t.year}</span> {t.formationPrefix}
          </p>
          <p>
            {t.pitchStart}
            <span className="text-(--foreground)">{t.pitchStrong1}</span>
            {t.pitchAnd}
            <span className="text-(--foreground)">{t.pitchStrong2}</span>
            {t.pitchEnd}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={item}
          className="flex flex-wrap items-center gap-3 pt-2"
        >
          <Magnetic>
            <Button asChild variant="gradient" size="lg">
              <Link href="#work" aria-label={t.ctaPrimary}>
                {t.ctaPrimary}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button asChild variant="ghost" size="lg">
              <Link href="#contact" aria-label={t.ctaSecondary}>
                <Mail className="size-4" />
                {t.ctaSecondary}
              </Link>
            </Button>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Indicateur de scroll — collé tout en bas du Hero, qui est lui
          même un viewport entier (100svh). */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2 text-(--muted-foreground)"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            {t.scrollLabel}
          </span>
          <ArrowDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
