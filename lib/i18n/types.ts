// Source unique pour les locales supportées. Ajouter "es" / "de" / etc.
// se fait ici + un fichier dictionnaire correspondant.

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export function isLocale(value: string | undefined | null): value is Locale {
  return value !== undefined && value !== null && (locales as readonly string[]).includes(value);
}
