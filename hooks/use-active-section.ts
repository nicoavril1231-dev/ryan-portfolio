"use client";

import { useEffect, useState } from "react";

// Track la section "actuellement lue" via IntersectionObserver.
// La détection se fait sur une bande horizontale au milieu du viewport
// (35% du haut, 40% du bas → 25% au centre) pour que ce soit la section
// dans laquelle l'œil est posé qui soit considérée active, pas celle qui
// vient juste de pointer en bas.
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Parmi les sections qui intersectent, on choisit celle qui a la
        // plus grande surface visible dans la bande de détection.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
