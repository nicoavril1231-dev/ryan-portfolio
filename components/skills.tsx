"use client";

import { motion } from "motion/react";

import { BrandIcon } from "@/components/brand-icon";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { Card } from "@/components/ui/card";
import { skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <section id="skills" className="relative py-20 md:py-24">
      {/* Halo subtle derrière la grille pour l'aération */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[40rem] -translate-y-1/2 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in oklab, var(--accent-from) 8%, transparent), transparent 70%)",
        }}
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6">
        <SectionHeader
          index="02"
          eyebrow="Stack"
          title="Les outils que j’utilise au quotidien."
          description="Une liste honnête : ce que je connais bien, pas une vitrine de mots-clés. J’apprends vite ce qui manque selon le projet."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 0.05}>
              <Card className="flex h-full flex-col gap-5 p-5 sm:p-6">
                <div className="flex flex-col gap-1.5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-(--muted-foreground)">
                    0{i + 1}
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-(--foreground)">
                    {cat.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-(--muted-foreground)">
                    {cat.description}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <SkillChip key={item.title} item={item} />
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ChipProps {
  item: {
    title: string;
    path: string;
    hex: string;
    label: string;
  };
}

// Chip d'une techno : hover → glow de la couleur de la marque + élévation du logo.
function SkillChip({ item }: ChipProps) {
  return (
    <motion.li
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "group relative flex items-center gap-2 overflow-hidden rounded-lg border border-(--border) bg-(--muted)/30 px-3 py-2 text-sm",
        "transition-colors hover:border-transparent",
      )}
      style={
        {
          "--brand": `#${item.hex}`,
        } as React.CSSProperties
      }
    >
      {/* Glow couleur marque sur hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--brand) 20%, transparent), transparent 70%)",
        }}
      />
      {/* Bordure colorée au hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 ring-1 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px var(--brand)" }}
      />
      <BrandIcon
        icon={item}
        className="size-4 text-(--muted-foreground) transition-colors group-hover:[color:var(--brand)]"
      />
      <span className="font-medium tracking-tight text-(--foreground)">
        {item.label}
      </span>
    </motion.li>
  );
}
