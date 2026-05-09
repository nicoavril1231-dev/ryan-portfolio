import {
  siCss,
  siDocker,
  siExpress,
  siFigma,
  siGit,
  siHtml5,
  siLinux,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
} from "simple-icons";

import type { BrandPath } from "@/components/brand-icon";
import { vscodeIcon } from "@/lib/brand-paths";

// Helper minimal pour ne garder que ce dont on a besoin (path, hex, title)
// et permettre d'overrider le label affiché.
const tech = (
  icon: { title: string; path: string; hex: string },
  override?: string,
): BrandPath & { label: string } => ({
  title: icon.title,
  path: icon.path,
  hex: icon.hex,
  label: override ?? icon.title,
});

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  items: ReturnType<typeof tech>[];
}

export const skillCategories: readonly SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Construire des interfaces fluides et accessibles.",
    items: [
      tech(siReact),
      tech(siNextdotjs, "Next.js"),
      tech(siTypescript, "TypeScript"),
      tech(siTailwindcss, "Tailwind"),
      tech(siHtml5, "HTML5"),
      tech(siCss, "CSS"),
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "APIs propres, modèles cohérents, perf au rendez-vous.",
    items: [
      tech(siNodedotjs, "Node.js"),
      tech(siExpress, "Express"),
      tech(siPython, "Python"),
      tech(siPhp, "PHP"),
    ],
  },
  {
    id: "data",
    title: "Bases de données",
    description: "Modélisation, requêtes, optimisation.",
    items: [
      tech(siPostgresql, "PostgreSQL"),
      tech(siMysql, "MySQL"),
      tech(siMongodb, "MongoDB"),
    ],
  },
  {
    id: "tools",
    title: "Outils",
    description: "Workflow dev quotidien.",
    items: [
      tech(siGit, "Git"),
      tech(siDocker, "Docker"),
      tech(siFigma, "Figma"),
      // VS Code retiré de simple-icons → fallback hardcodé (cf. brand-paths).
      { ...vscodeIcon, label: "VS Code" },
      tech(siLinux, "Linux"),
    ],
  },
] as const;
