import { NextResponse } from "next/server";
import { runTest } from "@/utils/debugResults";

export function GET() {
  // Ne permettre l'accès qu'en développement
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse("Not found", { status: 404 });
  }

  // Créer un script qui expose runTest globalement
  const scriptContent = `
    // Exposer runTest globalement
    (function() {
      ${runTest.toString()}
      
      // Exposer la fonction globalement
      window.runTest = runTest;
      
      // Afficher un message d'aide
      console.log(
        '%c🐕 Outils de débogage chargés!',
        'color: #4CAF50; font-weight: bold; font-size: 14px;'
      );
      console.log(
        '%cUtilisez runTest() dans la console pour exécuter un test de compatibilité',
        'color: #2196F3;'
      );
      console.log(
        '%cOu visitez la page /debug pour une interface complète',
        'color: #9C27B0;'
      );
    })();
  `;

  // Retourner le script avec le bon content-type
  return new NextResponse(scriptContent, {
    headers: {
      "Content-Type": "application/javascript",
    },
  });
}
