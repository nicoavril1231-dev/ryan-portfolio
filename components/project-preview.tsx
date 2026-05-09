import { cn } from "@/lib/utils";

// Placeholder visuel pour les cartes projets — gradient + monogramme + dots,
// facile à remplacer par un screenshot réel via next/image plus tard.

interface ProjectPreviewProps {
  from: string;
  to: string;
  label: string;
  className?: string;
}

export function ProjectPreview({
  from,
  to,
  label,
  className,
}: ProjectPreviewProps) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-lg",
        className,
      )}
      style={{
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      {/* Mesh subtil */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 mix-blend-overlay"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${from}, transparent 50%), radial-gradient(circle at 80% 80%, ${to}, transparent 50%)`,
        }}
      />
      {/* Grille de points */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          maskImage:
            "radial-gradient(ellipse at center, #000 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, #000 30%, transparent 80%)",
        }}
      />
      {/* Window chrome (3 dots) */}
      <div className="absolute left-4 top-4 flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-white/30" />
        <span className="size-2 rounded-full bg-white/30" />
        <span className="size-2 rounded-full bg-white/30" />
      </div>
      {/* Monogramme */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          aria-hidden
          className="select-none font-mono text-7xl font-bold tracking-tight text-white/20 sm:text-8xl"
        >
          {label}
        </span>
      </div>
      {/* Gloss en bas */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"
      />
    </div>
  );
}
