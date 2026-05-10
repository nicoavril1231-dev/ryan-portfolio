"use client";

import { motion } from "motion/react";
import { type MouseEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

// Segmented control style iOS : 2 options, une "bulle" assombrie indique
// l'option active. Cliquer sur l'active = no-op. Cliquer sur l'autre fait
// glisser la bulle (motion `layoutId`) ET déclenche `onChange`.
//
// Quand l'orientation change (ex. sidebar repliée → étendue), motion
// anime aussi le repositionnement des boutons via leurs `layout` props.
export interface SegmentedOption<T extends string> {
  value: T;
  icon: ReactNode;
  ariaLabel: string;
}

interface SegmentedToggleProps<T extends string> {
  options: readonly [SegmentedOption<T>, SegmentedOption<T>];
  active: T;
  onChange: (value: T, event: MouseEvent<HTMLButtonElement>) => void;
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
    <motion.div
      layout
      role="radiogroup"
      aria-label={ariaLabel}
      transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.7 }}
      className={cn(
        "relative inline-flex items-center rounded-full border border-(--border) bg-(--muted)/40 p-0.5",
        orientation === "vertical" && "flex-col",
      )}
    >
      {options.map((opt) => {
        const isActive = active === opt.value;
        return (
          <motion.button
            layout
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={opt.ariaLabel}
            onClick={(event) => {
              if (!isActive) onChange(opt.value, event);
            }}
            transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.7 }}
            className={cn(
              "relative flex size-7 items-center justify-center rounded-full",
              "font-mono text-[10px] font-semibold uppercase tracking-wider",
              "transition-colors",
              isActive
                ? "cursor-default text-(--foreground)"
                : "cursor-pointer text-(--muted-foreground) hover:text-(--foreground)",
            )}
          >
            {/* Bulle assombrie sur l'option active. layoutId partagé →
                spring slide quand l'option active change. */}
            {isActive && (
              <motion.span
                layoutId={layoutId}
                aria-hidden
                className="absolute inset-0 rounded-full bg-(--foreground)/10"
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 30,
                  mass: 0.7,
                }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center">
              {opt.icon}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
