"use client";

import { useLocaleContext } from "@/components/locale-provider";
import { SegmentedToggle } from "@/components/segmented-toggle";

interface Props {
  orientation?: "horizontal" | "vertical";
  /** Identifiant unique de l'instance (sidebar / mobile). Cf. ThemeToggle. */
  instanceId?: string;
}

// Toggle FR / EN sous forme de segmented control. La "bulle" indique la
// locale active. Cliquer sur l'autre langue swap le dictionnaire.
export function LocaleToggle({
  orientation = "horizontal",
  instanceId = "default",
}: Props) {
  const { locale, dict, setLocale } = useLocaleContext();

  return (
    <SegmentedToggle
      layoutId={`locale-bubble-${instanceId}`}
      orientation={orientation}
      ariaLabel={dict.localeToggle.label}
      active={locale}
      onChange={(next) => setLocale(next)}
      options={[
        {
          value: "fr",
          icon: "FR",
          ariaLabel: dict.localeToggle.fr,
        },
        {
          value: "en",
          icon: "EN",
          ariaLabel: dict.localeToggle.en,
        },
      ]}
    />
  );
}
