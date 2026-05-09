// Source unique pour les infos du site : titre, méta, liens, contact.
// Tout le reste de l'UI lit depuis ici.

export const site = {
  name: "Ryan Avril",
  initials: "RA",
  role: "Étudiant développeur",
  location: "Nice, France",
  locationFlag: "🇫🇷",
  formation: "BUT Informatique — IUT Nice Côte d'Azur",
  year: "2ᵉ année",
  email: "ryan.avril@example.com",
  availability: "Disponible pour une alternance dès septembre 2026",
  description:
    "Étudiant en BUT Informatique à Nice, je transforme des idées en interfaces web rapides et soignées.",
  url: "https://ryanavril.dev",
  social: {
    github: "https://github.com/ryanavril",
    linkedin: "https://linkedin.com/in/ryanavril",
    twitter: "https://twitter.com/ryanavril",
  },
} as const;

export type SiteConfig = typeof site;

// Sections ancrées dans la nav.
export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;
