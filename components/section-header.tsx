import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";

// Header de section : numéro mono + titre + sous-titre optionnel.
// Chaque sous-bloc est dans son propre Reveal pour cascader au scroll
// (eyebrow d'abord, puis titre, puis description).

interface SectionHeaderProps {
  index: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-(--muted-foreground)">
          <span className="text-(--foreground)">{index}</span>
          {eyebrow && (
            <>
              <span aria-hidden className="h-px w-8 bg-(--border-strong)" />
              <span>{eyebrow}</span>
            </>
          )}
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-base text-(--muted-foreground) md:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
