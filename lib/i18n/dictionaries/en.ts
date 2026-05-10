import type { Dictionary } from "./fr";

// Dictionnaire anglais — même shape que fr.ts (TS le force via le type).
// Si on touche à fr.ts, le compilateur signale immédiatement les clés
// manquantes ici.

export const en: Dictionary = {
  meta: {
    title: "Ryan Avril — Student developer",
    description:
      "Computer Science student in Nice (France), I turn ideas into fast and polished web interfaces.",
  },
  nav: {
    home: "Home",
    work: "Work",
    about: "About",
    skills: "Skills",
    journey: "Journey",
    contact: "Contact",
  },
  themeToggle: {
    enableLight: "Switch to light theme",
    enableDark: "Switch to dark theme",
  },
  localeToggle: {
    label: "Change language",
    switchTo: "Switch to",
    fr: "French",
    en: "English",
  },
  hero: {
    role: "Student developer",
    location: "Nice, France",
    locationFlag: "🇫🇷",
    availability: "Available for an apprenticeship from September 2026",
    year: "2nd year",
    formationPrefix: "of Computer Science at IUT Nice Côte d’Azur.",
    pitchStart: "I turn ideas into ",
    pitchStrong1: "fast",
    pitchAnd: " and ",
    pitchStrong2: "polished",
    pitchEnd: " web interfaces.",
    ctaPrimary: "View my projects",
    ctaSecondary: "Get in touch",
    scrollLabel: "Scroll",
  },
  about: {
    eyebrow: "About",
    title: "Hi, I’m Ryan.",
    description:
      "Student developer based in Nice. I love interfaces that feel simple but hide care everywhere: precise transitions, reusable components, performance dialed in.",
    bio: {
      p1Start: "I’m in my ",
      p1Strong: "second year of a Computer Science degree",
      p1End:
        " at IUT Nice Côte d’Azur. My thing is taking concrete problems and shipping usable products — not prototypes that crash on the first click.",
      p2: "On the side, I spend a lot of time tinkering on side-projects: a Discord bot to moderate friends’ servers, an internship tracker for my class, a kanban app to better manage my own sprints. Each project is a chance to learn a stack or pattern I didn’t know.",
      p3Start: "I’m now looking for ",
      p3Strong: "an apprenticeship for my 3rd year",
      p3End:
        " where I can contribute to a product with character, alongside a team that takes craft seriously.",
    },
    stats: {
      year: { value: "Y2", label: "Current year" },
      projects: { label: "Projects shipped" },
      techs: { label: "Technologies mastered" },
    },
  },
  skills: {
    eyebrow: "Stack",
    title: "The tools I use every day.",
    description:
      "An honest list: what I actually know, not a keyword showcase. I learn quickly what’s missing for a given project.",
    categories: {
      frontend: {
        title: "Frontend",
        description: "Building fluid and accessible interfaces.",
      },
      backend: {
        title: "Backend",
        description: "Clean APIs, coherent models, performance dialed in.",
      },
      data: {
        title: "Databases",
        description: "Modeling, querying, optimization.",
      },
      tools: {
        title: "Tools",
        description: "Daily dev workflow.",
      },
    },
  },
  projects: {
    eyebrow: "Selected work",
    title: "Some recent projects.",
    description:
      "A mix of side-projects, university work, and freelance gigs. The code is on GitHub, demos available when possible.",
    linkLabels: { demo: "Demo", github: "Code", external: "Link" },
    items: {
      taskforge: {
        tagline: "Real-time collaborative task management.",
        description:
          "Fullstack app inspired by Linear: kanban board, keyboard shortcuts, optimistic sync, GitHub auth. WebSockets for multi-cursor collaboration.",
        context: "Personal side-project",
      },
      "iut-stage-tracker": {
        tagline: "Internship tracking platform for my class.",
        description:
          "Team project (4 devs): dashboard for candidates, tutors, and companies. Fine-grained role management, PDF exports, email notifications.",
        context: "University project — team of 4",
      },
      "discord-companion": {
        tagline: "Modular Discord bot for gaming communities.",
        description:
          "Auto-moderation, mini-games, Twitch integration. Plugin architecture, deployed across 12 servers (~3k members combined).",
        context: "Personal side-project",
      },
      lumen: {
        tagline: "Creative landing page for a Nice-based local brand.",
        description:
          "Pure frontend with scroll-driven animations, page transitions, and 100% Lighthouse score. Paid gig, delivered in 2 weeks.",
        context: "Freelance",
      },
      "pathfinder-viz": {
        tagline: "Pathfinding algorithm visualizer.",
        description:
          "Educational tool: Dijkstra, A*, BFS, DFS animated on an interactive grid. Built in my 1st year for an algorithms class.",
        context: "School project — 1st year",
      },
    },
  },
  timeline: {
    eyebrow: "Journey",
    title: "The path so far.",
    description:
      "A trajectory taking shape — and a clear direction for what’s next.",
    badges: { now: "Now", future: "Upcoming" },
    steps: {
      bac: {
        date: "June 2024",
        title: "French Baccalauréat — high honors",
        subtitle: "Mathematics & Computer Science specialties",
        description:
          "First Python projects and web dev exploration during lockdown. That’s when I knew I wanted to make it my career.",
      },
      but1: {
        date: "September 2024 → June 2025",
        title: "Computer Science degree — 1st year",
        subtitle: "IUT Nice Côte d’Azur",
        description:
          "Solid foundations: algorithms, data structures, Java, SQL. First team project (Pathfinder Viz) and discovering collaborative Git.",
      },
      but2: {
        date: "September 2025 → today",
        title: "Computer Science degree — 2nd year",
        subtitle: "Application Development specialty",
        description:
          "Going deeper into React, Node.js, and software design. Shipped TaskForge in parallel to practice modern fullstack.",
      },
      alternance: {
        date: "September 2026",
        title: "Looking for an apprenticeship",
        subtitle: "For my 3rd year",
        description:
          "I’m looking for an ambitious team where I can contribute to user-facing product — front-end or fullstack. Open to Nice, Sophia-Antipolis, or remote.",
      },
    },
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Let’s work together.",
    description:
      "An apprenticeship, a side-project, or just want to chat about your stack? The simplest is still email.",
    emailLabel: "Email",
    socialsLabel: "Elsewhere",
    copyButton: "Copy",
    copyButtonCopied: "Copied",
    copyButtonAria: "Copy email",
    info: {
      availabilityLabel: "Availability:",
      availability:
        "apprenticeship from September 2026 (3rd year). Short internship before that possible.",
      locationLabel: "Location:",
      location: "Nice / Sophia-Antipolis, or full-remote.",
    },
    form: {
      name: "Name",
      namePlaceholder: "Alex Smith",
      email: "Email",
      emailPlaceholder: "alex@company.com",
      message: "Message",
      messagePlaceholder:
        "We’re looking for a front-end apprentice and your portfolio caught our eye…",
      footer: "I reply within 24h on average.",
      submit: "Send",
      submitting: "Sending…",
      errors: {
        nameMin: "At least 2 characters",
        nameMax: "Too long",
        emailInvalid: "Invalid email",
        messageMin: "At least 10 characters",
        messageMax: "2000 characters max",
      },
    },
    toasts: {
      success: "Message sent!",
      successDescription: "I’ll get back to you within 24h, promise.",
      emailCopied: "Email copied",
      copyError: "Couldn’t copy",
      copyErrorDescription: "Select the address manually.",
    },
  },
  footer: {
    builtWith: "Built with Next.js & ☕ from Nice.",
  },
};
