"use client";

import { motion } from "motion/react";
import { type MouseEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

// Segmented control style iOS : 2 options, une "bulle" assombrie indique
// l'option active. Cliquer sur l'active = no-op. Cliquer sur l'autre fait
// glisser la bulle (animation motion `layoutId`) ET déclenche `onChange`.
//
// Décliné en horizontal (mobile pill) et vertical (sidebar étroite).
export interface SegmentedOption<T extends string> {
  value: T;
  /** Contenu affiché dans le bouton (icône, texte court, etc.). */
  icon: ReactNode;
  /** Label accessible pour les lecteurs d'écran. */
  ariaLabel: string;
}

interface SegmentedToggleProps<T extends string> {
  options: readonly [SegmentedOption<T>, SegmentedOption<T>];
  active: T;
  onChange: (value: T, event: MouseEvent<HTMLButtonElement>) => void;
  /** Doit être unique par instance — motion s'en sert pour identifier la
   *  bulle qui glisse entre les options. */
  layoutId: string;
  orientation?: "horizontal" | "vertical";
  ariaLabel?: string;
}

export function SegmentedToggle<T extends string>({
  options,
  active,
  onChange,
  layoutId,
  orientation = "horizontal",
  ariaLabel,
}: SegmentedToggleProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        "relative inline-flex items-center rounded-full border border-(--border) bg-(--muted)/40 p-0.5",
        orientation === "vertical" && "flex-col",
      )}
    >
      {options.map((opt) => {
        const isActive = active === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={opt.ariaLabel}
            onClick={(event) => {
              if (!isActive) onChange(opt.value, event);
            }}
            className={cn(
              "relative flex size-7 items-center justify-center rounded-full",
              "font-mono text-[10px] font-semibold uppercase tracking-wider",
              "transition-colors",
              isActive
                ? "cursor-default text-(--foreground)"
                : "cursor-pointer text-(--muted-foreground) hover:text-(--foreground)",
            )}
          >
            {/* Bulle assombrie sur l'option active. Le `layoutId` partagé
                fait que motion l'anime vers la nouvelle position quand
                `isActive` change d'option (la bulle se démonte ici puis
                se remonte ailleurs avec la même clé → spring slide). */}
            {isActive && (
              <motion.span
                layoutId={layoutId}
                aria-hidden
                className="absolute inset-0 rounded-full bg-(--foreground)/10"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 32,
                  mass: 0.6,
                }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center">
              {opt.icon}
            </span>
          </button>
        );
      })}
    </div>
  );
}
