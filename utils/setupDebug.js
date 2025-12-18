// Ce fichier configure les outils de débogage pour être accessibles globalement
import { runTest } from "./debugResults";

// Expose runTest globalement pour un accès facile depuis la console
if (typeof window !== "undefined") {
  window.runTest = runTest;

  // Afficher un message d'aide dans la console
  console.log(
    "%c🐕 Outils de débogage chargés!",
    "color: #4CAF50; font-weight: bold; font-size: 14px;"
  );
  console.log(
    "%cUtilisez runTest() dans la console pour exécuter un test de compatibilité",
    "color: #2196F3;"
  );
  console.log(
    "%cOu visitez la page /debug pour une interface complète",
    "color: #9C27B0;"
  );
}
