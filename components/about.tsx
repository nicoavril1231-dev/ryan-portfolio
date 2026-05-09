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
          {/* Photo placeholder avec ring gradient animé */}
          <Reveal className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Anneau gradient en rotation */}
              <motion.div
                aria-hidden
                className="absolute -inset-2 rounded-full opacity-70 blur-md"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--accent-from), var(--accent-to), var(--accent-from))",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              {/* Anneau gradient net */}
              <motion.div
                aria-hidden
                className="absolute -inset-[3px] rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--accent-from), var(--accent-to), var(--accent-from))",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative flex h-60 w-60 items-center justify-center overflow-hidden rounded-full bg-(--card)">
                {/* Placeholder : initiales en gros, gradient subtle.
                    Remplace par <Image src="/avatar.jpg" /> quand t'auras une photo. */}
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
            <Reveal delay={0.1}>
              <div className="space-y-4 text-base leading-relaxed text-(--muted-foreground) md:text-lg">
                <p>
                  Je suis en{" "}
                  <span className="text-(--foreground)">
                    deuxième année de BUT Informatique
                  </span>{" "}
                  à l’IUT Nice Côte d’Azur. Mon truc, c’est de prendre des
                  problèmes concrets et d’en sortir des produits utilisables —
                  pas des prototypes qui crashent au premier clic.
                </p>
                <p>
                  En parallèle des cours, je passe énormément de temps à
                  bricoler des side-projects : un bot Discord pour modérer les
                  serveurs de potes, un tracker de stages pour la promo, une
                  app kanban pour mieux gérer mes sprints perso. Chaque projet,
                  c’est l’occasion d’apprendre une stack ou un pattern que je
                  ne maîtrisais pas.
                </p>
                <p>
                  Je cherche maintenant{" "}
                  <span className="text-(--foreground)">
                    une alternance pour ma 3ᵉ année
                  </span>{" "}
                  où je pourrai contribuer à un produit qui a du caractère, aux
                  côtés d’une équipe qui prend le craft au sérieux.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-3 gap-3">
                {stats.map((stat) => (
                  <Card
                    key={stat.label}
                    className="flex flex-col gap-2 p-4 transition-colors hover:border-(--border-strong) sm:p-5"
                  >
                    <stat.icon className="size-4 text-(--muted-foreground)" />
                    <div className="text-2xl font-semibold tracking-tight text-(--foreground) sm:text-3xl">
                      {stat.value}
                    </div>
                    <div className="text-xs text-(--muted-foreground)">
                      {stat.label}
                    </div>
                  </Card>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
