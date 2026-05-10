// View Transitions API : déclenche un changement avec un déploiement
// circulaire qui part du clic. Fallback transparent (bascule directe)
// quand l'API n'est pas dispo (Firefox actuel) ou que l'utilisateur
// préfère pas d'animations.

type ViewTransition = { ready: Promise<void> };
type DocumentWithVT = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition;
};

export function transitionTheme(
  applyTheme: () => void,
  origin: { x: number; y: number },
) {
  const doc = document as DocumentWithVT;
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!doc.startViewTransition || reducedMotion) {
    applyTheme();
    return;
  }

  // Important : appel direct via `doc.startViewTransition(...)`. Extraire
  // la fonction perd `this` et déclenche `Illegal invocation`.
  let transition: ViewTransition;
  try {
    transition = doc.startViewTransition(applyTheme);
  } catch {
    applyTheme();
    return;
  }

  const { x, y } = origin;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  transition.ready
    .then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 550,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {
      // L'animation décorative est non-critique : si elle plante, le
      // thème est déjà swappé via le snapshot.
    });
}
