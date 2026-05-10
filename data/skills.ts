import {
  siAndroidstudio,
  siC,
  siCss,
  siDocker,
  siFigma,
  siFirebase,
  siGit,
  siHtml5,
  siJavascript,
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
import { javaIcon, vscodeIcon } from "@/lib/brand-paths";

// Helper minimal pour ne garder que ce dont on a besoin.
const tech = (
  icon: { title: string; path: string; hex: string },
  override?: string,
): BrandPath & { label: string } => ({
  title: icon.title,
  path: icon.path,
  hex: icon.hex,
  label: override ?? icon.title,
});

// Identifiants des catégories — référencés dans le dict via la même clé.
export type SkillCategoryId = "frontend" | "backend" | "data" | "tools";

export interface SkillCategory {
  id: SkillCategoryId;
  items: ReturnType<typeof tech>[];
}

// Le titre et la description de chaque catégorie viennent du dictionnaire
// (cf. lib/i18n/dictionaries/{fr,en}.ts → skills.categories.*).
export const skillCategories: readonly SkillCategory[] = [
  {
    id: "frontend",
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
    items: [
      tech(siNodedotjs, "Node.js"),
      // Java retiré de simple-icons → fallback hardcodé.
      { ...javaIcon, label: "Java" },
      tech(siJavascript, "JavaScript"),
      tech(siPython, "Python"),
      tech(siPhp, "PHP"),
      tech(siC, "C"),
      tech(siFirebase, "Firebase"),
    ],
  },
  {
    id: "data",
    items: [
      tech(siPostgresql, "PostgreSQL"),
      tech(siMysql, "MySQL"),
      tech(siMongodb, "MongoDB"),
    ],
  },
  {
    id: "tools",
    items: [
      tech(siGit, "Git"),
      tech(siDocker, "Docker"),
      tech(siFigma, "Figma"),
      // VS Code retiré de simple-icons → fallback hardcodé.
      { ...vscodeIcon, label: "VS Code" },
      tech(siAndroidstudio, "Android Studio"),
      tech(siLinux, "Linux"),
    ],
  },
] as const;
