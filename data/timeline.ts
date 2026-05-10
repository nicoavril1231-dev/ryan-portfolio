// Étapes du parcours.
// Tout le texte (date, titre, sous-titre, description) vit dans le
// dictionnaire — `slug` y sert de clé.

export type TimelineSlug = "bac" | "but1" | "but2" | "alternance";

export interface TimelineStep {
  slug: TimelineSlug;
  status?: "past" | "current" | "future";
}

export const timeline: readonly TimelineStep[] = [
  { slug: "bac", status: "past" },
  { slug: "but1", status: "past" },
  { slug: "but2", status: "current" },
  { slug: "alternance", status: "future" },
] as const;
