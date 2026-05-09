// Étapes du parcours, ordre chronologique inverse pas nécessaire :
// la timeline les rend dans l'ordre où elles apparaissent ici.

export interface TimelineStep {
  date: string;
  title: string;
  subtitle?: string;
  description: string;
  // "current" pour le point lumineux distinctif (pulse).
  status?: "past" | "current" | "future";
}

export const timeline: readonly TimelineStep[] = [
  {
    date: "Juin 2024",
    title: "Bac Général — mention Bien",
    subtitle: "Spécialités Mathématiques & NSI",
    description:
      "Premiers projets en Python et exploration du dev web pendant le confinement. C’est là que j’ai compris que je voulais en faire mon métier.",
    status: "past",
  },
  {
    date: "Septembre 2024 → Juin 2025",
    title: "BUT Informatique — 1ʳᵉ année",
    subtitle: "IUT Nice Côte d’Azur",
    description:
      "Bases solides : algorithmique, structures de données, Java, SQL. Premier projet en équipe (Pathfinder Viz) et découverte de Git en collaboratif.",
    status: "past",
  },
  {
    date: "Septembre 2025 → aujourd’hui",
    title: "BUT Informatique — 2ᵉ année",
    subtitle: "Spécialité Réalisation d’applications",
    description:
      "Approfondissement React, Node.js, et conception logicielle. Lancement de TaskForge en parallèle pour pratiquer le fullstack moderne.",
    status: "current",
  },
  {
    date: "Septembre 2026",
    title: "Recherche d’une alternance",
    subtitle: "Pour ma 3ᵉ année (BUT 3)",
    description:
      "Je cherche une équipe ambitieuse où contribuer à du produit user-facing — front-end ou fullstack. Ouvert à Nice, Sophia-Antipolis, ou en remote.",
    status: "future",
  },
] as const;
