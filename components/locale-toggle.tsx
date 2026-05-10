"use client";

import { Languages } from "lucide-react";
import { motion } from "motion/react";

import { useLocaleContext } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Toggle FR / EN — affiche le code de la locale CIBLE (la langue vers
// laquelle un clic ferait basculer). Animation icône + libellé pour
// rester cohérent avec le reste de la sidebar.
export function LocaleToggle({ compact = false }: { compact?: boolean }) {
  const { locale, dict, toggleLocale } = useLocaleContext();
  const next = locale === "fr" ? "en" : "fr";

  return (
    <Button
      variant="icon"
      size="icon"
      onClick={toggleLocale}
      aria-label={`${dict.localeToggle.switchTo} ${
        next === "fr" ? dict.localeToggle.fr : dict.localeToggle.en
      }`}
      className={cn("relative", compact && "size-9")}
    >
      <motion.span
        key={locale}
        initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex items-center gap-1 font-mono text-[11px] font-semibold uppercase tracking-wider"
      >
        <Languages aria-hidden className="size-[14px]" />
        <span>{next}</span>
      </motion.span>
    </Button>
  );
}
