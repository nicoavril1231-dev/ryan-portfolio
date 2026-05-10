"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState, type MouseEvent } from "react";

import { Button } from "@/components/ui/button";

// Bascule de thème via la View Transitions API : le navigateur fait un
// snapshot avant/après, et on anime le clip-path du nouveau snapshot pour
// que le nouveau thème "se déploie en cercle" depuis le clic.
//
// Fallback transparent : si l'API n'existe pas (Firefox actuel) ou si le
// user a `prefers-reduced-motion: reduce`, on appelle juste setTheme().
type ViewTransition = { ready: Promise<void> };
type StartViewTransition = (callback: () => void) => ViewTransition;

function transitionTheme(
  applyTheme: () => void,
  origin: { x: number; y: number },
) {
  const startVT = (
    document as Document & { startViewTransition?: StartViewTransition }
  ).startViewTransition;

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!startVT || reducedMotion) {
    applyTheme();
    return;
  }

  const transition = startVT(applyTheme);

  const { x, y } = origin;
  // Rayon = distance du clic au coin le plus éloigné — garantit que le
  // cercle final couvre tout l'écran, peu importe la position du toggle.
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  void transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 550,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  });
}

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Pattern recommandé par next-themes — on attend l'hydratation pour lire
  // le thème courant sans mismatch SSR/CSR.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const current = (mounted ? resolvedTheme ?? theme : "dark") as
    | "dark"
    | "light";
  const next = current === "dark" ? "light" : "dark";

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    transitionTheme(() => setTheme(next), {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  return (
    <Button
      variant="icon"
      size="icon"
      aria-label={`Activer le thème ${next}`}
      onClick={handleClick}
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
