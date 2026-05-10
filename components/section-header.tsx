import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";
import { RevealStagger } from "./reveal-stagger";

// Header de section : numéro mono + titre + sous-titre optionnel.
// RevealStagger orchestre la cascade — un seul Intersection Observer
// pour les 3 lignes, garantit qu'elles cascadent dans l'ordre.

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
    <RevealStagger
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
      stagger={0.15}
      amount={0.4}
    >
      <Reveal standalone={false}>
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
      <Reveal standalone={false}>
        <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal standalone={false}>
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
    </RevealStagger>
  );
}
