"use client";

import { useEffect } from "react";
import { runTest } from "@/utils/debugResults";

export default function DebugScript() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // Exposer runTest globalement
      window.runTest = runTest;

      // Afficher un message d'aide
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
  }, []);

  return null;
}
