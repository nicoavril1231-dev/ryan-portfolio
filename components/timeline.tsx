"use client";

import { motion } from "motion/react";

import { useDictionary } from "@/components/locale-provider";
import { Reveal } from "@/components/reveal";
import { RevealStagger } from "@/components/reveal-stagger";
import { SectionHeader } from "@/components/section-header";
import { Card } from "@/components/ui/card";
import { timeline } from "@/data/timeline";
import { cn } from "@/lib/utils";

export function Timeline() {
  const dict = useDictionary();
  const t = dict.timeline;

  return (
    <section id="journey" className="relative py-20 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6">
        <SectionHeader
          index="04"
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
        />

        <div className="relative mx-auto w-full max-w-4xl pl-8 sm:pl-12">
          {/* Ligne verticale (cf. note d'alignement plus haut). */}
          <div
            aria-hidden
            className="absolute bottom-0 left-2.5 top-2 w-0.5 sm:left-[18px]"
            style={{
              background:
                "linear-gradient(to bottom, var(--accent-from), var(--accent-to), transparent)",
            }}
          />

          <RevealStagger
            className="flex flex-col gap-8 sm:gap-10"
            stagger={0.16}
            amount={0.05}
          >
            {timeline.map((step) => {
              const tStep = t.steps[step.slug];
              return (
                <Reveal key={step.slug} standalone={false}>
                  <div className="relative">
                    {/* Point sur la ligne */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -left-[26px] top-2 size-2.5 rounded-full sm:-left-[34px]",
                        step.status === "current"
                          ? "bg-(--accent-from)"
                          : step.status === "future"
                            ? "bg-(--muted-foreground)/40"
                            : "bg-(--foreground)/60",
                      )}
                    >
                      {step.status === "current" && (
                        <motion.span
                          className="absolute inset-0 rounded-full"
                          style={{ background: "var(--accent-from)" }}
                          animate={{
                            scale: [1, 2.4, 1],
                            opacity: [0.6, 0, 0.6],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                      )}
                    </span>

                    <Card className="p-5 transition-colors hover:border-(--border-strong) sm:p-6">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-(--muted-foreground)">
                          {tStep.date}
                        </span>
                        {step.status === "current" && (
                          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-500">
                            {t.badges.now}
                          </span>
                        )}
                        {step.status === "future" && (
                          <span className="rounded-full bg-(--muted)/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-(--muted-foreground)">
                            {t.badges.future}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight text-(--foreground) md:text-xl">
                        {tStep.title}
                      </h3>
                      {tStep.subtitle && (
                        <p className="mt-1 text-sm text-(--muted-foreground)">
                          {tStep.subtitle}
                        </p>
                      )}
                      <p className="mt-3 text-sm leading-relaxed text-(--muted-foreground) md:text-base">
                        {tStep.description}
                      </p>
                    </Card>
                  </div>
                </Reveal>
              );
            })}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
