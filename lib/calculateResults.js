import { QUESTIONS } from "@/data/questions";

// Fonction pour calculer la similarité entre deux tableaux de scores (0-100%)
const calculateSimilarity = (scores1, scores2) => {
  if (scores1.length !== scores2.length || scores1.length === 0) return 0;

  let totalDifference = 0;
  for (let i = 0; i < scores1.length; i++) {
    // Différence absolue normalisée entre 0 et 1
    totalDifference += Math.abs(scores1[i] - scores2[i]) / 100;
  }

  const avgDifference = totalDifference / scores1.length;
  // Retourne un pourcentage de similarité (0-100%)
  return Math.max(0, 100 - avgDifference * 100);
};

export function calculateResults(masterAnswers, dogAnswers) {
  // Grouper les questions par axe
  const axes = {};

  QUESTIONS.forEach((question) => {
    if (!axes[question.axis]) {
      axes[question.axis] = {
        masterScores: [],
        dogScores: [],
        masterRawScores: [],
        dogRawScores: [],
      };
    }

    const masterId = `master-${question.id}`;
    const dogId = `dog-${question.id}`;

    // Ajouter les scores bruts (1-5)
    if (masterAnswers[masterId] !== undefined) {
      axes[question.axis].masterRawScores.push(masterAnswers[masterId]);
      // Convertir en échelle -2 à 2 pour le calcul
      axes[question.axis].masterScores.push(
        (masterAnswers[masterId] - 1) * 0.5 - 1
      );
    }
    if (dogAnswers[dogId] !== undefined) {
      axes[question.axis].dogRawScores.push(dogAnswers[dogId]);
      // Convertir en échelle -2 à 2 pour le calcul
      axes[question.axis].dogScores.push((dogAnswers[dogId] - 1) * 0.5 - 1);
    }
  });

  // Calculer les moyennes par axe et la similarité
  const axisResults = [];
  let totalSimilarity = 0;
  let axisCount = 0;
  let globalMasterAvg = 0;
  let globalDogAvg = 0;
  let totalQuestions = 0;

  Object.keys(axes).forEach((axisName) => {
    const { masterScores, dogScores, masterRawScores, dogRawScores } =
      axes[axisName];

    // Ignorer les axes sans réponses
    if (masterScores.length === 0 || dogScores.length === 0) return;

    // Calculer les moyennes sur l'échelle -2 à 2
    const masterAvg =
      masterScores.reduce((a, b) => a + b, 0) / masterScores.length;
    const dogAvg = dogScores.reduce((a, b) => a + b, 0) / dogScores.length;

    // Calculer les moyennes brutes (1-5)
    const masterRawAvg =
      masterRawScores.reduce((a, b) => a + b, 0) / masterRawScores.length;
    const dogRawAvg =
      dogRawScores.reduce((a, b) => a + b, 0) / dogRawScores.length;

    // Convertir en échelle 0-100
    const masterScore = ((masterAvg + 2) / 4) * 100;
    const dogScore = ((dogAvg + 2) / 4) * 100;

    // Calculer la similarité entre les réponses du maître et du chien
    const similarity = calculateSimilarity(
      masterRawScores.map((score) => (score - 1) * 25), // Convertir 1-5 en 0-100
      dogRawScores.map((score) => (score - 1) * 25) // Convertir 1-5 en 0-100
    );

    // Mettre à jour les moyennes globales
    globalMasterAvg += masterScore * masterScores.length;
    globalDogAvg += dogScore * dogScores.length;
    totalQuestions += masterScores.length;
    totalSimilarity += similarity;
    axisCount++;

    axisResults.push({
      axis: axisName,
      master: Math.round(masterScore),
      dog: Math.round(dogScore),
      similarity: Math.round(similarity),
      interpretation: getInterpretation(
        axisName,
        masterScore,
        dogScore,
        similarity
      ),
    });
  });

  // Calculer les moyennes globales
  const globalMasterAverage =
    totalQuestions > 0 ? Math.round(globalMasterAvg / totalQuestions) : 0;
  const globalDogAverage =
    totalQuestions > 0 ? Math.round(globalDogAvg / totalQuestions) : 0;
  const overallSimilarity =
    axisCount > 0 ? Math.round(totalSimilarity / axisCount) : 0;

  // Obtenir l'interprétation globale
  const overallInterpretation = getOverallInterpretation(overallSimilarity);

  return {
    axes: axisResults,
    overall: {
      master: globalMasterAverage,
      dog: globalDogAverage,
      similarity: overallSimilarity,
      interpretation: overallInterpretation,
    },
  };
}

// Fonction pour obtenir l'interprétation d'un axe spécifique
function getInterpretation(axis, masterScore, dogScore, similarity) {
  const difference = Math.abs(masterScore - dogScore);

  if (similarity >= 80) {
    return `Très forte harmonie sur l'axe ${axis}. Vous et votre chien êtes sur la même longueur d'onde.`;
  } else if (similarity >= 60) {
    return `Bonne harmonie sur l'axe ${axis}. Vos personnalités se complètent bien.`;
  } else if (similarity >= 40) {
    return `Harmonie moyenne sur l'axe ${axis}. Quelques différences à noter.`;
  } else {
    return `Défis sur l'axe ${axis}. Vos différences nécessitent une attention particulière.`;
  }
}

// Fonction pour obtenir l'interprétation globale
function getOverallInterpretation(similarity) {
  if (similarity >= 80) {
    return {
      title: "Complicité exceptionnelle !",
      description:
        "Votre relation avec votre chien est basée sur une compréhension mutuelle exceptionnelle. Vous formez une équipe soudée et harmonieuse.",
    };
  } else if (similarity >= 60) {
    return {
      title: "Bonne entente",
      description:
        "Vous et votre chien partagez une belle relation. Vous vous comprenez bien, avec quelques différences qui rendent la relation intéressante.",
    };
  } else if (similarity >= 40) {
    return {
      title: "Relation en développement",
      description:
        "Votre relation avec votre chien comporte des défis, mais aussi un grand potentiel. En travaillant sur vos différences, vous pouvez renforcer votre lien.",
    };
  } else {
    return {
      title: "Défis à relever",
      description:
        "Votre relation avec votre chien présente des différences significatives. Ces défis peuvent être surmontés avec de la patience et de la compréhension mutuelle.",
    };
  }
}
