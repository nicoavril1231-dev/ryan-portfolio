# Portfolio · Ryan Avril

Portfolio premium, dark-by-default, propulsé par Next.js 16 + Tailwind CSS v4.

## Stack

- **Next.js 16.2** (App Router, Turbopack par défaut, prérendu statique)
- **React 19.2**
- **TypeScript** strict
- **Tailwind CSS v4** (tokens via `@theme inline` dans `app/globals.css`)
- **motion** (`motion/react`) — animations + tilt + magnetic
- **next-themes** — bascule dark / light
- **shadcn-style primitives** (Button, Card, Badge, Dialog, Tooltip, Sonner, Input, Textarea)
- **simple-icons** + paths SVG hardcodés pour LinkedIn / VS Code (retirés du package)
- **react-hook-form + zod + sonner** — formulaire de contact

## Lancer en local

```bash
npm install
npm run dev
```

→ http://localhost:3000

```bash
npm run build   # build production (Turbopack)
npm run lint    # ESLint
```

## Customiser

Toutes les données du site vivent dans `data/` et `lib/site.ts` — tu n'as **jamais** besoin de toucher à un composant pour mettre à jour ton contenu.

| Quoi | Où |
| --- | --- |
| Nom, email, dispo, liens sociaux | [`lib/site.ts`](lib/site.ts) |
| Liens de la nav | [`lib/site.ts`](lib/site.ts) (`navLinks`) |
| Catégories de compétences | [`data/skills.ts`](data/skills.ts) |
| Projets | [`data/projects.ts`](data/projects.ts) |
| Étapes de timeline | [`data/timeline.ts`](data/timeline.ts) |
| Couleurs accent (violet → bleu) | [`app/globals.css`](app/globals.css) → `--accent-from`, `--accent-to` (root + `.dark`) |

### Remplacer la photo placeholder (section About)

1. Pose ta photo dans `public/avatar.jpg`.
2. Dans [`components/about.tsx`](components/about.tsx), remplace le bloc placeholder par :

```tsx
import Image from "next/image";
// …
<Image src="/avatar.jpg" alt="Ryan Avril" fill className="object-cover" />
```

### Ajouter un projet

1. Édite [`data/projects.ts`](data/projects.ts), copie un objet projet, change les valeurs.
2. (Optionnel) Pose un screenshot dans `public/projects/{slug}.png` puis remplace `<ProjectPreview />` par `<Image />` dans [`components/projects.tsx`](components/projects.tsx).

### Brancher le formulaire de contact à un vrai endpoint

Dans [`components/contact.tsx`](components/contact.tsx), `onSubmit` se contente d’afficher un toast. Crée une route handler `app/api/contact/route.ts` (ou une server action), et remplace le `setTimeout` par un `fetch` vers ton endpoint (Resend, EmailJS, Formspree, etc.).

### Switch de palette accent

Dans [`app/globals.css`](app/globals.css), change `--accent-from` et `--accent-to`. Pour passer en vert dev/hacker :

```css
--accent-from: #a3e635;
--accent-to:   #10b981;
```

## Architecture

```
app/                    # Routes Next.js (layout, page, globals.css)
components/             # Composants UI
  ui/                   # Primitives (button, card, dialog, sonner, …)
  fx/                   # Effets visuels (animated-grid, orbs, spotlight, magnetic, noise)
  *.tsx                 # Sections (hero, about, skills, projects, timeline, contact, footer)
data/                   # Sources de vérité du contenu
lib/                    # Helpers (cn, site config, brand paths)
public/                 # Statiques
```

## Déploiement

Optimisé pour Vercel — push, link, c’est en ligne. Sinon n’importe quel host Node ≥ 20.9.

## Crédits

- Inspirations : Linear, Vercel, Raycast, Arc.
- Logos : [simple-icons](https://simpleicons.org) (CC0).
- Police : [Geist](https://vercel.com/font).
