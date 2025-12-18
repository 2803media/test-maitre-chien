"use client";

import { calculateResults } from "@/lib/calculateResults";

// Génère des réponses aléatoires pour le test
export function generateTestAnswers() {
  const answers = {};

  // Générer des réponses pour le maître (1-5)
  for (let i = 1; i <= 28; i++) {
    answers[`master-${i}`] = Math.floor(Math.random() * 5) + 1;
  }

  // Générer des réponses pour le chien (1-5)
  for (let i = 1; i <= 28; i++) {
    // Ajouter une certaine corrélation avec les réponses du maître
    const masterAnswer = answers[`master-${i}`];
    // Le chien a 70% de chance d'être proche de la réponse du maître (±1)
    const isSimilar = Math.random() < 0.7;
    const variation = isSimilar
      ? Math.random() < 0.5
        ? -1
        : 1
      : Math.random() < 0.5
        ? -2
        : 2;
    answers[`dog-${i}`] = Math.min(5, Math.max(1, masterAnswer + variation));
  }

  return answers;
}

// Affiche les résultats de manière lisible
export function displayResults(results) {
  console.log("\n=== RÉSULTATS DU TEST DE COMPATIBILITÉ ===\n");

  // Afficher le score global
  console.log(
    "📊 SCORE GLOBAL DE COMPATIBILITÉ :",
    results.overall.similarity + "%"
  );
  console.log("🏆 ", results.overall.interpretation.title);
  console.log("💡 ", results.overall.interpretation.description);

  // Afficher les résultats par axe
  console.log("\n📈 RÉSULTATS PAR AXE :");
  results.axes.forEach((axis) => {
    console.log(`\n🔹 ${axis.axis.toUpperCase()}:`);
    console.log(
      `   Maître: ${"⭐".repeat(Math.round(axis.master / 20))} (${axis.master}%)`
    );
    console.log(
      `   Chien:  ${"🐾".repeat(Math.round(axis.dog / 20))} (${axis.dog}%)`
    );
    console.log(
      `   Similarité: ${"❤️".repeat(Math.round(axis.similarity / 20))} (${axis.similarity}%)`
    );
    console.log(`   ${axis.interpretation}`);
  });

  // Afficher les statistiques globales
  console.log("\n📊 STATISTIQUES GLOBALES :");
  console.log(`   Score moyen du maître: ${results.overall.master}%`);
  console.log(`   Score moyen du chien:  ${results.overall.dog}%`);
  console.log(`   Similarité moyenne:    ${results.overall.similarity}%`);
}

// Fonction pour exécuter le test
export function runTest() {
  console.clear();
  console.log(
    "🔍 Exécution du test de compatibilité avec des données de test...\n"
  );

  // Générer des réponses de test
  const testAnswers = generateTestAnswers();

  // Séparer les réponses du maître et du chien
  const masterAnswers = {};
  const dogAnswers = {};

  Object.entries(testAnswers).forEach(([key, value]) => {
    if (key.startsWith("master-")) {
      masterAnswers[key] = value;
    } else {
      dogAnswers[key] = value;
    }
  });

  // Calculer les résultats
  const results = calculateResults(masterAnswers, dogAnswers);

  // Afficher les résultats
  displayResults(results);

  return results;
}

// Exposer la fonction runTest pour pouvoir l'utiliser ailleurs
export { runTest };

// Si exécuté dans un navigateur, afficher les instructions
if (typeof window !== "undefined") {
  console.log(
    "%c🔍 Test de compatibilité maître-chien",
    "color: #4CAF50; font-weight: bold; font-size: 14px;"
  );
  console.log(
    "%cUtilisez runTest() dans la console pour exécuter un test",
    "color: #2196F3;"
  );
  console.log(
    "%cOu visitez /test-results pour une interface complète",
    "color: #9C27B0;"
  );

  window.runTest = runTest; // Exposer globalement pour la console
}
