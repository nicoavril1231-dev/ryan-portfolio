"use client";

import { motion } from "motion/react";
import { Code2, MapPin, Sparkles } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { Card } from "@/components/ui/card";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { site } from "@/lib/site";

// Stats dérivées des données — pas de duplication de chiffres en dur.
const totalTechs = skillCategories.reduce(
  (acc, cat) => acc + cat.items.length,
  0,
);

const stats = [
  { label: "Année en cours", value: "BUT 2", icon: Sparkles },
  { label: "Projets livrés", value: `${projects.length}+`, icon: Code2 },
  { label: "Technos maîtrisées", value: `${totalTechs}+`, icon: MapPin },
] as const;

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6">
        <SectionHeader
          index="01"
          eyebrow="About"
          title="Bonjour, je suis Ryan."
          description="Étudiant développeur basé à Nice. J’aime les interfaces qui semblent simples mais cachent du soin partout : transitions millimétrées, composants réutilisables, perfs au cordeau."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-12">
          {/* Photo placeholder avec ring gradient animé.
              `items-start` empêche le stretch vertical de la cellule grid (la
              colonne bio est plus haute → sans ça, le wrapper devenait une
              capsule). `size-60` verrouille explicitement la taille pour que
              les `inset-*` produisent un cercle parfait. */}
          <Reveal className="flex items-start justify-center lg:justify-start">
            <div className="relative size-60">
              {/* 1. Halo statique large — ambient glow qui ne bouge pas */}
              <div
                aria-hidden
                className="absolute -inset-6 rounded-full opacity-50 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, var(--accent-from) 0%, transparent 70%)",
                }}
              />

              {/* 2. Anneau qui orbite — croissant lumineux ~120° avec dégradé,
                  reste transparent. Avec un ring visible de 5 px, la rotation
                  saute aux yeux. Duration 6 s, linéaire pour un mouvement
                  calme et continu. */}
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--accent-from) 0deg, var(--accent-to) 90deg, transparent 210deg, transparent 360deg)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />

              {/* 3. Halo plus doux qui suit le croissant — accentue la traînée
                  comme une "comète" autour du nom */}
              <motion.div
                aria-hidden
                className="absolute -inset-1 rounded-full opacity-60 blur-md"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--accent-from) 0deg, var(--accent-to) 90deg, transparent 200deg, transparent 360deg)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />

              {/* 4. Avatar : 5 px plus petit que l'anneau → laisse 5 px de ring
                  visible. Remplace par <Image src="/avatar.jpg" fill /> plus tard. */}
              <div className="absolute inset-[5px] flex items-center justify-center overflow-hidden rounded-full bg-(--card)">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, var(--accent-from), transparent 60%)",
                  }}
                />
                <span className="relative font-mono text-6xl font-semibold tracking-tight text-(--foreground)">
                  {site.initials}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Bio + stats */}
          <div className="flex flex-col gap-6">
            {/* Chaque paragraphe a son propre Reveal pour cascader
                naturellement au scroll (positions Y différentes). */}
            <div className="flex flex-col gap-4 text-base leading-relaxed text-(--muted-foreground) md:text-lg">
              <Reveal>
                <p>
                  Je suis en{" "}
                  <span className="text-(--foreground)">
                    deuxième année de BUT Informatique
                  </span>{" "}
                  à l’IUT Nice Côte d’Azur. Mon truc, c’est de prendre des
                  problèmes concrets et d’en sortir des produits utilisables —
                  pas des prototypes qui crashent au premier clic.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  En parallèle des cours, je passe énormément de temps à
                  bricoler des side-projects : un bot Discord pour modérer les
                  serveurs de potes, un tracker de stages pour la promo, une
                  app kanban pour mieux gérer mes sprints perso. Chaque projet,
                  c’est l’occasion d’apprendre une stack ou un pattern que je
                  ne maîtrisais pas.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  Je cherche maintenant{" "}
                  <span className="text-(--foreground)">
                    une alternance pour ma 3ᵉ année
                  </span>{" "}
                  où je pourrai contribuer à un produit qui a du caractère, aux
                  côtés d’une équipe qui prend le craft au sérieux.
                </p>
              </Reveal>
            </div>

            {/* Chaque stat dans son propre Reveal avec stagger : les 3
                cards sont en rangée (même Y) → le delay décale leur début. */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.1}>
                  <Card className="flex flex-col gap-2 p-4 transition-colors hover:border-(--border-strong) sm:p-5">
                    <stat.icon className="size-4 text-(--muted-foreground)" />
                    <div className="text-2xl font-semibold tracking-tight text-(--foreground) sm:text-3xl">
                      {stat.value}
                    </div>
                    <div className="text-xs text-(--muted-foreground)">
                      {stat.label}
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
