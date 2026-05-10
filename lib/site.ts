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
  email: "avril.ryan.pro@gmail.com",
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

// Sections ancrées dans la nav. `iconKey` mappe vers une icône SVG animée
// définie dans components/nav-icons.tsx — pas d'emoji, pour rester premium.
export const navLinks = [
  { href: "#work", label: "Work", iconKey: "work" },
  { href: "#about", label: "About", iconKey: "about" },
  { href: "#skills", label: "Skills", iconKey: "skills" },
  { href: "#journey", label: "Journey", iconKey: "journey" },
  { href: "#contact", label: "Contact", iconKey: "contact" },
] as const;
