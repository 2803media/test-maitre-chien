export const QUESTIONS = [
  // === QUESTIONS ESSENTIELLES (12 questions au lieu de 28) ===

  // Énergie (1 question au lieu de 2)
  {
    id: 1,
    axis: "Énergie",
    text: {
      master: "Avez-vous besoin de vous dépenser physiquement tous les jours ?",
      dog: "Votre chien a-t-il besoin de se dépenser physiquement tous les jours ?",
    },
    icon: "Zap",
    genre: "all",
  },

  // Sociabilité (1 question au lieu de 2)
  {
    id: 2,
    axis: "Sociabilité",
    text: {
      master: "Appréciez-vous rencontrer de nouvelles personnes ?",
      dog: "Votre chien apprécie-t-il rencontrer de nouvelles personnes ou d'autres chiens ?",
    },
    icon: "Users",
    genre: "all",
  },

  // Stress (1 question au lieu de 2)
  {
    id: 3,
    axis: "Stress",
    text: {
      master: "Réagissez-vous fortement aux imprévus ou changements ?",
      dog: "Votre chien réagit-il fortement aux imprévus ou changements ?",
    },
    icon: "AlertCircle",
    genre: "all",
  },

  // Curiosité (1 question au lieu de 2)
  {
    id: 4,
    axis: "Curiosité",
    text: {
      master:
        "Aimez-vous explorer de nouveaux environnements, des nouveaux endroits ?",
      dog: "Votre chien aime-t-il explorer de nouveaux environnements ?",
    },
    icon: "Compass",
    genre: "all",
  },

  // Discipline (1 question au lieu de 2)
  {
    id: 5,
    axis: "Discipline",
    text: {
      master: "Avez-vous tendance à tester les limites ?",
      dog: "Votre chien teste-t-il régulièrement les limites ?",
    },
    icon: "TrendingUp",
    genre: "all",
  },

  // Attachement (1 question au lieu de 2)
  {
    id: 6,
    axis: "Attachement",
    text: {
      master: "Supportez-vous mal la solitude ou la séparation ?",
      dog: "Votre chien supporte-t-il mal la séparation ou la solitude ?",
    },
    icon: "HeartCrack",
    genre: "all",
  },

  // Leadership (1 question au lieu de 2)
  {
    id: 7,
    axis: "Leadership",
    text: {
      master: "Prenez-vous naturellement des initiatives ?",
      dog: "Votre chien prend-il naturellement des initiatives ?",
    },
    icon: "Flag",
    genre: "all",
  },

  // Sensibilité (1 question au lieu de 2)
  {
    id: 8,
    axis: "Sensibilité",
    text: {
      master: "Êtes-vous facilement perturbé(e) par des éléments externes ?",
      dog: "Votre chien est-il facilement perturbé par les bruits forts ?",
    },
    icon: "Volume2",
    genre: "all",
  },

  // Motivation (1 question au lieu de 2)
  {
    id: 9,
    axis: "Motivation",
    text: {
      master: "Êtes-vous motivé(e) par les récompenses ?",
      dog: "Votre chien est-il très motivé par la nourriture ou les récompenses ?",
    },
    icon: "Cookie",
    genre: "all",
  },

  // Réactivité (1 question au lieu de 2)
  {
    id: 10,
    axis: "Réactivité",
    text: {
      master:
        "Avez-vous parfois des réactions impulsives difficiles à contrôler ?",
      dog: "Votre chien a-t-il des réactions impulsives difficiles à contrôler ?",
    },
    icon: "Flame",
    genre: "all",
  },

  // Empathie (1 question au lieu de 2)
  {
    id: 11,
    axis: "Empathie",
    text: {
      master: "Ressentez-vous profondément les états émotionnels des autres ?",
      dog: "Pensez-vous que votre chien ressent profondément vos états émotionnels ?",
    },
    icon: "HeartPulse",
    genre: "all",
  },

  // Protection (1 question au lieu de 2)
  {
    id: 12,
    axis: "Protection",
    text: {
      master: "Avez-vous un instinct protecteur marqué envers vos proches ?",
      dog: "Votre chien a-t-il un instinct protecteur marqué envers vous ?",
    },
    icon: "Shield",
    genre: "all",
  },
];

export const OPTIONS = [
  {
    label: "Pas du tout",
    value: -2,
    colorClass:
      "from-red-200 to-red-300 hover:from-red-300 hover:to-red-400 border-red-400 dark:from-red-900 dark:to-red-800 dark:hover:from-red-800 dark:hover:to-red-700 dark:border-red-600 dark:text-red-100",
  },
  {
    label: "Plutôt non",
    value: -1,
    colorClass:
      "from-orange-200 to-orange-300 hover:from-orange-300 hover:to-orange-400 border-orange-400 dark:from-orange-900 dark:to-orange-800 dark:hover:from-orange-800 dark:hover:to-orange-700 dark:border-orange-600 dark:text-orange-100",
  },
  {
    label: "Neutre",
    value: 0,
    colorClass:
      "from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 border-gray-400 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 dark:border-gray-500 dark:text-gray-100",
  },
  {
    label: "Plutôt oui",
    value: 1,
    colorClass:
      "from-lime-200 to-lime-300 hover:from-lime-300 hover:to-lime-400 border-lime-400 dark:from-lime-900 dark:to-lime-800 dark:hover:from-lime-800 dark:hover:to-lime-700 dark:border-lime-600 dark:text-lime-100",
  },
  {
    label: "Tout à fait",
    value: 2,
    colorClass:
      "from-green-200 to-green-300 hover:from-green-300 hover:to-green-400 border-green-400 dark:from-green-900 dark:to-green-800 dark:hover:from-green-800 dark:hover:to-green-700 dark:border-green-600 dark:text-green-100",
  },
];

export const INTERPRETATIONS = {
  "90-100":
    "🌟 Connexion exceptionnelle ! Vous êtes en parfaite harmonie. Votre relation est basée sur une synchronisation naturelle et profonde.",
  "75-89":
    "✨ Très bonne compatibilité ! Vous vous comprenez intuitivement et partagez beaucoup de traits communs.",
  "60-74":
    "💫 Bonne compatibilité. Votre relation repose sur un équilibre entre similitudes et complémentarités.",
  "45-59":
    "🔄 Compatibilité moyenne. Certaines différences nécessitent des ajustements pour une meilleure harmonie.",
  "0-44":
    "⚠️ Tempéraments assez différents. Une attention particulière aux besoins de chacun améliorera votre relation.",
};
