// Dictionnaire français — la version d'origine du portfolio.
// Toute string visible par l'utilisateur passe par là pour pouvoir être
// traduite. La structure est partagée à l'identique avec en.ts ci-côté.

export const fr = {
  meta: {
    title: "Ryan Avril — Étudiant développeur",
    description:
      "Étudiant en BUT Informatique à Nice, je transforme des idées en interfaces web rapides et soignées.",
  },
  nav: {
    work: "Projets",
    about: "À propos",
    skills: "Compétences",
    journey: "Parcours",
    contact: "Contact",
  },
  themeToggle: {
    enableLight: "Activer le thème clair",
    enableDark: "Activer le thème sombre",
  },
  localeToggle: {
    label: "Changer de langue",
    switchTo: "Passer en",
    fr: "Français",
    en: "Anglais",
  },
  hero: {
    role: "Étudiant développeur",
    location: "Nice, France",
    locationFlag: "🇫🇷",
    availability: "Disponible pour une alternance dès septembre 2026",
    year: "2ᵉ année",
    formationPrefix: "de BUT Informatique à l’IUT Nice Côte d’Azur.",
    pitchStart: "Je transforme des idées en ",
    pitchStrong1: "interfaces web rapides",
    pitchAnd: " et ",
    pitchStrong2: "soignées",
    pitchEnd: ".",
    ctaPrimary: "Voir mes projets",
    ctaSecondary: "Me contacter",
    scrollLabel: "Scroll",
  },
  about: {
    eyebrow: "About",
    title: "Bonjour, je suis Ryan.",
    description:
      "Étudiant développeur basé à Nice. J’aime les interfaces qui semblent simples mais cachent du soin partout : transitions millimétrées, composants réutilisables, perfs au cordeau.",
    bio: {
      p1Start: "Je suis en ",
      p1Strong: "deuxième année de BUT Informatique",
      p1End:
        " à l’IUT Nice Côte d’Azur. Mon truc, c’est de prendre des problèmes concrets et d’en sortir des produits utilisables — pas des prototypes qui crashent au premier clic.",
      p2: "En parallèle des cours, je passe énormément de temps à bricoler des side-projects : un bot Discord pour modérer les serveurs de potes, un tracker de stages pour la promo, une app kanban pour mieux gérer mes sprints perso. Chaque projet, c’est l’occasion d’apprendre une stack ou un pattern que je ne maîtrisais pas.",
      p3Start: "Je cherche maintenant ",
      p3Strong: "une alternance pour ma 3ᵉ année",
      p3End:
        " où je pourrai contribuer à un produit qui a du caractère, aux côtés d’une équipe qui prend le craft au sérieux.",
    },
    stats: {
      year: { value: "BUT 2", label: "Année en cours" },
      projects: { label: "Projets livrés" },
      techs: { label: "Technos maîtrisées" },
    },
  },
  skills: {
    eyebrow: "Stack",
    title: "Les outils que j’utilise au quotidien.",
    description:
      "Une liste honnête : ce que je connais bien, pas une vitrine de mots-clés. J’apprends vite ce qui manque selon le projet.",
    categories: {
      frontend: {
        title: "Frontend",
        description: "Construire des interfaces fluides et accessibles.",
      },
      backend: {
        title: "Backend",
        description: "APIs propres, modèles cohérents, perf au rendez-vous.",
      },
      data: {
        title: "Bases de données",
        description: "Modélisation, requêtes, optimisation.",
      },
      tools: {
        title: "Outils",
        description: "Workflow dev quotidien.",
      },
    },
  },
  projects: {
    eyebrow: "Selected work",
    title: "Quelques projets récents.",
    description:
      "Un mix de side-projects, projets universitaires et missions freelance. Le code est sur GitHub, dispo en demo quand c’est possible.",
    linkLabels: { demo: "Demo", github: "Code", external: "Lien" },
    items: {
      taskforge: {
        tagline: "Gestion de tâches collaborative en temps réel.",
        description:
          "App fullstack inspirée de Linear : board kanban, raccourcis clavier, sync optimiste, auth GitHub. WebSockets pour la collaboration multi-curseurs.",
        context: "Side-project perso",
      },
      "iut-stage-tracker": {
        tagline: "Plateforme de suivi de stages pour la promo BUT.",
        description:
          "Projet en équipe (4 dev) : tableau de bord pour candidats, tuteurs et entreprises. Gestion fine des rôles, exports PDF, notifications email.",
        context: "Projet universitaire — équipe de 4",
      },
      "discord-companion": {
        tagline: "Bot Discord modulaire pour communautés gaming.",
        description:
          "Système de modération auto, mini-jeux, intégration Twitch. Architecture en plugins, déployé sur 12 serveurs (~3k membres cumulés).",
        context: "Side-project perso",
      },
      lumen: {
        tagline: "Landing page créative pour une marque locale niçoise.",
        description:
          "Frontend pur avec animations scroll-driven, transitions de pages, et 100% Lighthouse. Mission rémunérée, livrée en 2 semaines.",
        context: "Freelance",
      },
      "pathfinder-viz": {
        tagline: "Visualiseur d’algorithmes de recherche de chemin.",
        description:
          "Outil pédagogique : Dijkstra, A*, BFS, DFS animés sur grille interactive. Réalisé en première année de BUT pour un projet d’algorithmique.",
        context: "Projet scolaire — BUT 1ʳᵉ année",
      },
    },
  },
  timeline: {
    eyebrow: "Journey",
    title: "Le chemin jusqu’ici.",
    description:
      "Une trajectoire qui prend forme — et un cap clair pour la suite.",
    badges: { now: "Now", future: "À venir" },
    steps: {
      bac: {
        date: "Juin 2024",
        title: "Bac Général — mention Bien",
        subtitle: "Spécialités Mathématiques & NSI",
        description:
          "Premiers projets en Python et exploration du dev web pendant le confinement. C’est là que j’ai compris que je voulais en faire mon métier.",
      },
      but1: {
        date: "Septembre 2024 → Juin 2025",
        title: "BUT Informatique — 1ʳᵉ année",
        subtitle: "IUT Nice Côte d’Azur",
        description:
          "Bases solides : algorithmique, structures de données, Java, SQL. Premier projet en équipe (Pathfinder Viz) et découverte de Git en collaboratif.",
      },
      but2: {
        date: "Septembre 2025 → aujourd’hui",
        title: "BUT Informatique — 2ᵉ année",
        subtitle: "Spécialité Réalisation d’applications",
        description:
          "Approfondissement React, Node.js, et conception logicielle. Lancement de TaskForge en parallèle pour pratiquer le fullstack moderne.",
      },
      alternance: {
        date: "Septembre 2026",
        title: "Recherche d’une alternance",
        subtitle: "Pour ma 3ᵉ année (BUT 3)",
        description:
          "Je cherche une équipe ambitieuse où contribuer à du produit user-facing — front-end ou fullstack. Ouvert à Nice, Sophia-Antipolis, ou en remote.",
      },
    },
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Travaillons ensemble.",
    description:
      "Une alternance, un side-project, ou juste envie d’échanger sur ton stack ? Le plus simple, c’est encore l’email.",
    emailLabel: "Email",
    socialsLabel: "Ailleurs",
    copyButton: "Copier",
    copyButtonCopied: "Copié",
    copyButtonAria: "Copier l’email",
    info: {
      availabilityLabel: "Disponibilité :",
      availability:
        "alternance dès septembre 2026 (BUT 3). Stage court d’ici là envisageable.",
      locationLabel: "Localisation :",
      location: "Nice / Sophia-Antipolis, ou full-remote.",
    },
    form: {
      name: "Nom",
      namePlaceholder: "Camille Martin",
      email: "Email",
      emailPlaceholder: "camille@entreprise.com",
      message: "Message",
      messagePlaceholder:
        "On cherche un alternant front-end, et ton portfolio nous a tapé dans l’œil…",
      footer: "Je réponds sous 24h en moyenne.",
      submit: "Envoyer",
      submitting: "Envoi…",
      errors: {
        nameMin: "Au moins 2 caractères",
        nameMax: "Trop long",
        emailInvalid: "Email invalide",
        messageMin: "Au moins 10 caractères",
        messageMax: "2000 caractères max",
      },
    },
    toasts: {
      success: "Message envoyé !",
      successDescription: "Je reviens vers toi sous 24h, promis.",
      emailCopied: "Email copié",
      copyError: "Impossible de copier",
      copyErrorDescription: "Sélectionne l’adresse manuellement.",
    },
  },
  footer: {
    builtWith: "Built with Next.js & ☕ from Nice.",
  },
};

// Pas de `as const` pour que les types soient des `string` larges et que
// le dictionnaire EN puisse fournir des valeurs différentes au même shape.
export type Dictionary = typeof fr;
