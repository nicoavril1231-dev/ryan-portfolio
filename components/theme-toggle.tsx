"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

// Toggle dark/light. On gère le hydration mismatch en n'affichant l'icône
// "réelle" qu'après mount (sinon next-themes peut diverger entre SSR et CSR).
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Pattern recommandé par next-themes : on attend l'hydratation pour lire le
  // thème courant et éviter un mismatch SSR/CSR. La règle "no setState in
  // effect" ne s'applique pas ici car c'est un signal d'hydratation, pas une
  // dérivation d'état.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const current = (mounted ? resolvedTheme ?? theme : "dark") as
    | "dark"
    | "light";
  const next = current === "dark" ? "light" : "dark";

  return (
    <Button
      variant="icon"
      size="icon"
      aria-label={`Activer le thème ${next}`}
      onClick={() => setTheme(next)}
      className="relative"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {current === "dark" ? (
            <Sun className="size-[18px]" />
          ) : (
            <Moon className="size-[18px]" />
          )}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
