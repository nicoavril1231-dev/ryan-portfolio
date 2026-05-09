"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import Link from "next/link";
import { type PointerEvent, useRef } from "react";

import { BrandIcon } from "@/components/brand-icon";
import { ProjectPreview } from "@/components/project-preview";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { type Project, projects } from "@/data/projects";
import { siGithub } from "simple-icons";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section id="work" className="relative py-20 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6">
        <SectionHeader
          index="03"
          eyebrow="Selected work"
          title="Quelques projets récents."
          description="Un mix de side-projects, projets universitaires et missions freelance. Le code est sur GitHub, dispo en demo quand c'est possible."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={i * 0.05}
              className={cn(project.featured && "md:col-span-2")}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
}

// Carte projet avec tilt 3D au survol — perspective + rotateX/Y pilotés par
// la position du curseur, lissés via spring.
function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Tilt 3D : x/y positions normalisées → springs lissés → deg.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 22, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 200, damping: 22, mass: 0.5 });
  const rotateX = useMotionTemplate`${springY}deg`;
  const rotateY = useMotionTemplate`${springX}deg`;

  // Halo gradient qui suit le curseur indépendamment du tilt.
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(400px circle at ${glowX}% ${glowY}%, color-mix(in oklab, var(--accent-from) 18%, transparent), transparent 60%)`;

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    // Tilt en deg : ±3° max, délibérément subtil.
    x.set((px - 0.5) * 6);
    y.set(-(py - 0.5) * 6);
    glowX.set(px * 100);
    glowY.set(py * 100);
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
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group h-full [perspective:1200px]"
    >
      <Card className="relative h-full overflow-hidden p-5 transition-colors hover:border-(--border-strong)">
        {/* Halo qui suit le curseur */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glow }}
        />

        <div className="relative flex h-full flex-col gap-5">
          {/* Mockup */}
          <div
            className="relative overflow-hidden rounded-lg border border-(--border)"
            style={{ transform: "translateZ(20px)" }}
          >
            <ProjectPreview
              from={project.cover.from}
              to={project.cover.to}
              label={project.cover.label}
            />
          </div>

          {/* Header titre + année */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold tracking-tight text-(--foreground) md:text-2xl">
                  {project.title}
                </h3>
                <span className="font-mono text-xs text-(--muted-foreground)">
                  {project.year}
                </span>
              </div>
              {project.context && (
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--muted-foreground)">
                  {project.context}
                </span>
              )}
            </div>
            <ArrowUpRight className="size-5 shrink-0 text-(--muted-foreground) transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-(--foreground)" />
          </div>

          {/* Tagline + description */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-(--foreground) md:text-base">
              {project.tagline}
            </p>
            <p className="text-sm leading-relaxed text-(--muted-foreground)">
              {project.description}
            </p>
          </div>

          {/* Stack */}
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Badge variant="default" className="text-[11px]">
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>

          {/* Liens */}
          <div className="mt-auto flex items-center gap-2 pt-2">
            {project.links.map((link) => {
              const isGithub = link.type === "github";
              const Icon = isGithub ? null : ExternalLink;
              return (
                <Link
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    isGithub
                      ? `Voir le code de ${project.title} sur GitHub`
                      : `Voir la démo de ${project.title}`
                  }
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border border-(--border) bg-(--muted)/40 px-3 py-1.5 text-xs font-medium",
                    "text-(--muted-foreground) transition-colors",
                    "hover:border-(--border-strong) hover:bg-(--muted)/70 hover:text-(--foreground)",
                  )}
                >
                  {isGithub ? (
                    <BrandIcon icon={siGithub} className="size-3.5" />
                  ) : (
                    Icon && <Icon className="size-3.5" />
                  )}
                  {link.type === "demo"
                    ? "Demo"
                    : link.type === "github"
                      ? "Code"
                      : "Lien"}
                </Link>
              );
            })}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
