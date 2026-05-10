"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, type MouseEvent } from "react";

import { useDictionary } from "@/components/locale-provider";
import { SegmentedToggle } from "@/components/segmented-toggle";
import { transitionTheme } from "@/lib/theme-transition";

interface Props {
  orientation?: "horizontal" | "vertical";
}

// Toggle Light / Dark sous forme de segmented control. La "bulle" indique
// le thème actif. Cliquer sur le thème inactif déclenche en plus la
// View Transition circulaire (cf. lib/theme-transition.ts).
export function ThemeToggle({ orientation = "horizontal" }: Props) {
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
      // Le layoutId est suffixé par l'orientation pour que la version
      // sidebar et la version mobile-pill (les deux montées dans le DOM)
      // ne partagent pas la même clé — sinon motion essaierait de animer
      // entre les deux instances.
      layoutId={`theme-bubble-${orientation}`}
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
