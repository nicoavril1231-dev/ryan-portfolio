"use client";

import { Code2, MapPin, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { useDictionary } from "@/components/locale-provider";
import { Reveal } from "@/components/reveal";
import { RevealStagger } from "@/components/reveal-stagger";
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

export function About() {
  const dict = useDictionary();
  const t = dict.about;

  // Stats reconstruites à partir du dict + des données — la "value" du
  // 1ᵉʳ stat (BUT 2 / Y2) vient de la traduction, les 2 autres sont
  // dérivées des données et reçoivent leur label depuis le dict.
  const stats = [
    {
      label: t.stats.year.label,
      value: t.stats.year.value,
      icon: Sparkles,
    },
    {
      label: t.stats.projects.label,
      value: `${projects.length}+`,
      icon: Code2,
    },
    {
      label: t.stats.techs.label,
      value: `${totalTechs}+`,
      icon: MapPin,
    },
  ] as const;

  return (
    <section id="about" className="relative py-20 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6">
        <SectionHeader
          index="01"
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-12">
          {/* Photo placeholder avec ring gradient animé. */}
          <Reveal className="flex items-start justify-center lg:justify-start">
            <div className="relative size-60">
              <div
                aria-hidden
                className="absolute -inset-6 rounded-full opacity-50 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, var(--accent-from) 0%, transparent 70%)",
                }}
              />
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
            <RevealStagger
              className="flex flex-col gap-4 text-base leading-relaxed text-(--muted-foreground) md:text-lg"
              stagger={0.16}
              amount={0.3}
            >
              <Reveal standalone={false}>
                <p>
                  {t.bio.p1Start}
                  <span className="text-(--foreground)">{t.bio.p1Strong}</span>
                  {t.bio.p1End}
                </p>
              </Reveal>
              <Reveal standalone={false}>
                <p>{t.bio.p2}</p>
              </Reveal>
              <Reveal standalone={false}>
                <p>
                  {t.bio.p3Start}
                  <span className="text-(--foreground)">{t.bio.p3Strong}</span>
                  {t.bio.p3End}
                </p>
              </Reveal>
            </RevealStagger>

            <RevealStagger
              className="grid grid-cols-3 gap-3"
              stagger={0.14}
              amount={0.5}
            >
              {stats.map((stat) => (
                <Reveal key={stat.label} standalone={false}>
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
            </RevealStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
