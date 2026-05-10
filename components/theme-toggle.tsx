"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, type MouseEvent } from "react";

import { useDictionary } from "@/components/locale-provider";
import { SegmentedToggle } from "@/components/segmented-toggle";
import { transitionTheme } from "@/lib/theme-transition";

interface Props {
  orientation?: "horizontal" | "vertical";
  /** Identifiant unique de l'instance (sidebar / mobile). Sert au
   *  `layoutId` de la bulle pour qu'elle reste stable même quand
   *  l'orientation change. */
  instanceId?: string;
}

// Toggle Light / Dark sous forme de segmented control. La "bulle" indique
// le thème actif. Cliquer sur le thème inactif déclenche en plus la
// View Transition circulaire (cf. lib/theme-transition.ts).
export function ThemeToggle({
  orientation = "horizontal",
  instanceId = "default",
}: Props) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const dict = useDictionary();
  const [mounted, setMounted] = useState(false);

  // Pattern recommandé par next-themes — on attend l'hydratation pour
  // lire le thème courant sans mismatch SSR/CSR.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const current = (mounted ? resolvedTheme ?? theme : "dark") as
    | "dark"
    | "light";

  const handleChange = (
    next: "dark" | "light",
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    transitionTheme(() => setTheme(next), {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  return (
    <SegmentedToggle
      // Le layoutId est dérivé de `instanceId` (sidebar / mobile) PAS de
      // l'orientation. Comme ça la bulle garde le même id quand la
      // sidebar passe de vertical à horizontal au hover → motion anime
      // le déplacement au lieu de la démonter/remonter.
      layoutId={`theme-bubble-${instanceId}`}
      orientation={orientation}
      ariaLabel="Theme"
      active={current}
      onChange={handleChange}
      options={[
        {
          value: "light",
          icon: <Sun className="size-[14px]" />,
          ariaLabel: dict.themeToggle.enableLight,
        },
        {
          value: "dark",
          icon: <Moon className="size-[14px]" />,
          ariaLabel: dict.themeToggle.enableDark,
        },
      ]}
    />
  );
}
