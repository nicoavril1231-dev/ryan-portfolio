"use client";

import { useEffect, useState } from "react";

// Détecte la section "couramment lue" via un simple scroll listener
// rAF-throttled. On garde la DERNIÈRE section (en ordre du DOM) dont le
// top est passé au-dessus d'une ligne de référence à 40 % du viewport :
// c'est la section dans laquelle le visiteur vient d'entrer.
//
// Pourquoi pas IntersectionObserver : pour les sections plus hautes que
// la bande de détection, l'`intersectionRatio` plafonne sous le seuil
// suivant et l'observer ne tire plus d'événements pendant toute la
// traversée → l'active "saute" la section. Un scroll listener fait des
// passes continues, sans angle mort.
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    function compute() {
      const refY = window.innerHeight * 0.4;
      let candidate: string | null = null;

      // sectionIds est dans l'ordre des sections sur la page. On itère
      // et on garde la dernière dont le top est <= refY ; les suivantes
      // (toutes sous la ligne) sortent par `break`.
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= refY) {
          candidate = id;
        } else {
          break;
        }
      }

      setActiveId((prev) => (prev === candidate ? prev : candidate));
    }

    function schedule() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(compute);
    }

    compute();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sectionIds]);

  return activeId;
}
