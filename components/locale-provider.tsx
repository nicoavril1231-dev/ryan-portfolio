"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { dictionaries, type Dictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/types";

// Stocke la préférence pendant 1 an. Path racine pour que ça s'applique
// à toute l'app.
const COOKIE_NAME = "locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

interface LocaleContextValue {
  locale: Locale;
  dict: Dictionary;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  children: ReactNode;
}

// Lit la locale stockée en cookie sur le client.
function readCookieLocale(): Locale {
  if (typeof document === "undefined") return defaultLocale;
  const match = document.cookie.match(/(?:^|;\s*)locale=([^;]+)/);
  const value = match?.[1];
  return isLocale(value) ? value : defaultLocale;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  // Initial render = defaultLocale (FR). Après hydratation on lit le cookie
  // et on swap si nécessaire. C'est un flash bref pour les visiteurs EN
  // qui reviennent — acceptable pour un portfolio statique.
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = readCookieLocale();
    if (stored !== locale) {
      // Pattern volontaire : on synchronise l'état React avec une donnée
      // externe (cookie) qui n'est lisible qu'au mount. C'est exactement
      // l'usage légitime que la règle exclut, on la désactive localement.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(stored);
    }
    // Met à jour <html lang> pour les lecteurs d'écran et le browser.
    document.documentElement.lang = stored;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    document.documentElement.lang = next;
    document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "fr" ? "en" : "fr");
  }, [locale, setLocale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      dict: dictionaries[locale],
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

// Hook principal — accès au dict + locale + setters.
export function useLocaleContext(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocaleContext doit être appelé dans un <LocaleProvider>");
  }
  return ctx;
}

// Sucre syntaxique — la majorité des composants n'ont besoin que du dict.
export function useDictionary(): Dictionary {
  return useLocaleContext().dict;
}
