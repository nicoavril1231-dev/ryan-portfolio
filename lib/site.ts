// Source unique pour les infos universelles (non traduites) du site :
// nom, email, liens sociaux, navigation. Tout ce qui dépend de la langue
// vit dans `lib/i18n/dictionaries/{fr,en}.ts`.

export const site = {
  name: "Ryan Avril",
  initials: "RA",
  email: "avril.ryan.pro@gmail.com",
  url: "https://ryan-portfolio-xi-two.vercel.app",
  social: {
    github: "https://github.com/ryanavril",
    linkedin: "https://linkedin.com/in/ryanavril",
    twitter: "https://twitter.com/ryanavril",
  },
} as const;

export type SiteConfig = typeof site;

// Sections ancrées dans la nav. `labelKey` pointe vers `dict.nav.*`.
// Ordre = ordre d'apparition dans `app/page.tsx` (Hero → About → Skills
// → Work → Journey → Contact).
export const navLinks = [
  { href: "#top", labelKey: "home", iconKey: "home" },
  { href: "#about", labelKey: "about", iconKey: "about" },
  { href: "#skills", labelKey: "skills", iconKey: "skills" },
  { href: "#work", labelKey: "work", iconKey: "work" },
  { href: "#journey", labelKey: "journey", iconKey: "journey" },
  { href: "#contact", labelKey: "contact", iconKey: "contact" },
] as const;

export type NavLinkLabelKey = (typeof navLinks)[number]["labelKey"];
