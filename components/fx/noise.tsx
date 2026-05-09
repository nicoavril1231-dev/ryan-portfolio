import { cn } from "@/lib/utils";

// Overlay SVG turbulence en data URL — pas de fetch, pas de JS, juste du grain
// pour casser l'aspect "écran plat" et donner une texture filmique.
const NOISE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
        <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)' opacity='0.85'/>
    </svg>`,
  );

interface NoiseProps {
  className?: string;
  // 0 → invisible, 1 → max. Garder bas pour ne pas saturer.
  opacity?: number;
}

export function Noise({ className, opacity = 0.06 }: NoiseProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 mix-blend-overlay",
        className,
      )}
      style={{
        backgroundImage: `url("${NOISE_SVG}")`,
        backgroundRepeat: "repeat",
        opacity,
      }}
    />
  );
}
