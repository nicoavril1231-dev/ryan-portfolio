// Projets affichés dans la section Work.
// `cover` : tonalité de la preview SVG par défaut. Remplace par un screenshot
// réel en posant /public/projects/{slug}.png et en utilisant <Image src=...>.

export interface ProjectLink {
  type: "demo" | "github" | "external";
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  year: string;
  tagline: string;
  description: string;
  stack: string[];
  links: ProjectLink[];
  // Tonalité du placeholder (dégradé).
  cover: {
    from: string;
    to: string;
    label: string;
  };
  // Mise en avant (premier de grille, span 2 colonnes).
  featured?: boolean;
  context?: string;
}

export const projects: readonly Project[] = [
  {
    slug: "taskforge",
    title: "TaskForge",
    year: "2026",
    tagline: "Gestion de tâches collaborative en temps réel.",
    description:
      "App fullstack inspirée de Linear : board kanban, raccourcis clavier, sync optimiste, auth GitHub. WebSockets pour la collaboration multi-curseurs.",
    stack: ["Next.js", "TypeScript", "tRPC", "PostgreSQL", "Prisma", "WebSockets"],
    links: [
      { type: "demo", url: "https://taskforge.ryanavril.dev" },
      { type: "github", url: "https://github.com/ryanavril/taskforge" },
    ],
    cover: { from: "#8B5CF6", to: "#3B82F6", label: "TF" },
    featured: true,
    context: "Side-project perso",
  },
  {
    slug: "iut-stage-tracker",
    title: "Stage Tracker IUT",
    year: "2025",
    tagline: "Plateforme de suivi de stages pour la promo BUT.",
    description:
      "Projet en équipe (4 dev) : tableau de bord pour candidats, tuteurs et entreprises. Gestion fine des rôles, exports PDF, notifications email.",
    stack: ["React", "Node.js", "Express", "MySQL", "Tailwind"],
    links: [
      { type: "github", url: "https://github.com/ryanavril/stage-tracker" },
    ],
    cover: { from: "#06B6D4", to: "#3B82F6", label: "ST" },
    context: "Projet universitaire — équipe de 4",
  },
  {
    slug: "discord-companion",
    title: "Tessera",
    year: "2025",
    tagline: "Bot Discord modulaire pour communautés gaming.",
    description:
      "Système de modération auto, mini-jeux, intégration Twitch. Architecture en plugins, déployé sur 12 serveurs (~3k membres cumulés).",
    stack: ["TypeScript", "discord.js", "PostgreSQL", "Redis", "Docker"],
    links: [
      { type: "github", url: "https://github.com/ryanavril/tessera" },
    ],
    cover: { from: "#A855F7", to: "#EC4899", label: "TS" },
    context: "Side-project perso",
  },
  {
    slug: "lumen",
    title: "Lumen",
    year: "2025",
    tagline: "Landing page créative pour une marque locale niçoise.",
    description:
      "Frontend pur avec animations scroll-driven, transitions de pages, et 100% Lighthouse. Mission rémunérée, livrée en 2 semaines.",
    stack: ["Next.js", "Motion", "Tailwind", "GSAP"],
    links: [
      { type: "demo", url: "https://lumen-demo.ryanavril.dev" },
      { type: "github", url: "https://github.com/ryanavril/lumen" },
    ],
    cover: { from: "#F59E0B", to: "#EF4444", label: "L" },
    context: "Freelance",
  },
  {
    slug: "pathfinder-viz",
    title: "Pathfinder Viz",
    year: "2024",
    tagline: "Visualiseur d'algorithmes de recherche de chemin.",
    description:
      "Outil pédagogique : Dijkstra, A*, BFS, DFS animés sur grille interactive. Réalisé en première année de BUT pour un projet d'algorithmique.",
    stack: ["React", "TypeScript", "Canvas API"],
    links: [
      { type: "demo", url: "https://pathfinder.ryanavril.dev" },
      { type: "github", url: "https://github.com/ryanavril/pathfinder-viz" },
    ],
    cover: { from: "#10B981", to: "#06B6D4", label: "PV" },
    context: "Projet scolaire — BUT 1ʳᵉ année",
  },
] as const;
