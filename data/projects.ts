// Projets affichés dans la section Work.
// Les champs traduits (tagline / description / context) vivent dans le
// dictionnaire — `slug` y sert de clé.

export type ProjectSlug =
  | "taskforge"
  | "iut-stage-tracker"
  | "discord-companion"
  | "lumen"
  | "pathfinder-viz";

export interface ProjectLink {
  type: "demo" | "github" | "external";
  url: string;
}

export interface Project {
  slug: ProjectSlug;
  title: string; // nom propre, non traduit
  year: string; // langue-neutre
  stack: string[];
  links: ProjectLink[];
  // Tonalité du placeholder visuel.
  cover: {
    from: string;
    to: string;
    label: string;
  };
  // Premier de grille, span 2 colonnes.
  featured?: boolean;
}

export const projects: readonly Project[] = [
  {
    slug: "taskforge",
    title: "TaskForge",
    year: "2026",
    stack: ["Next.js", "TypeScript", "tRPC", "PostgreSQL", "Prisma", "WebSockets"],
    links: [
      { type: "demo", url: "https://taskforge.ryanavril.dev" },
      { type: "github", url: "https://github.com/ryanavril/taskforge" },
    ],
    cover: { from: "#8B5CF6", to: "#3B82F6", label: "TF" },
    featured: true,
  },
  {
    slug: "iut-stage-tracker",
    title: "Stage Tracker IUT",
    year: "2025",
    stack: ["React", "Node.js", "Express", "MySQL", "Tailwind"],
    links: [{ type: "github", url: "https://github.com/ryanavril/stage-tracker" }],
    cover: { from: "#06B6D4", to: "#3B82F6", label: "ST" },
  },
  {
    slug: "discord-companion",
    title: "Tessera",
    year: "2025",
    stack: ["TypeScript", "discord.js", "PostgreSQL", "Redis", "Docker"],
    links: [{ type: "github", url: "https://github.com/ryanavril/tessera" }],
    cover: { from: "#A855F7", to: "#EC4899", label: "TS" },
  },
  {
    slug: "lumen",
    title: "Lumen",
    year: "2025",
    stack: ["Next.js", "Motion", "Tailwind", "GSAP"],
    links: [
      { type: "demo", url: "https://lumen-demo.ryanavril.dev" },
      { type: "github", url: "https://github.com/ryanavril/lumen" },
    ],
    cover: { from: "#F59E0B", to: "#EF4444", label: "L" },
  },
  {
    slug: "pathfinder-viz",
    title: "Pathfinder Viz",
    year: "2024",
    stack: ["React", "TypeScript", "Canvas API"],
    links: [
      { type: "demo", url: "https://pathfinder.ryanavril.dev" },
      { type: "github", url: "https://github.com/ryanavril/pathfinder-viz" },
    ],
    cover: { from: "#10B981", to: "#06B6D4", label: "PV" },
  },
] as const;
