import { en } from "./dictionaries/en";
import { fr, type Dictionary } from "./dictionaries/fr";
import type { Locale } from "./types";

// Map locale → dictionnaire. Pour ajouter "es" : créer dictionaries/es.ts
// puis ajouter ici.
export const dictionaries: Record<Locale, Dictionary> = {
  fr,
  en,
};

export type { Dictionary };
