import { cn } from "@/lib/utils";

// Grille animée — pure CSS, donc rendable côté serveur, zéro JS.
// Les lignes défilent verticalement via @keyframes grid en globals.css.
// Un masque radial fait disparaître la grille en bord d'écran pour ne pas
// "couper" brutalement.
interface AnimatedGridProps {
  className?: string;
  // Taille d'une cellule en pixels.
  cellSize?: number;
}

export function AnimatedGrid({ className, cellSize = 40 }: AnimatedGridProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute inset-0 animate-(--animate-grid)"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(127,127,127,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(127,127,127,0.08) 1px, transparent 1px)
          `,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, #000 50%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, #000 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
