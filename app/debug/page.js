"use client";

import { useState, useEffect } from "react";
import { runTest, displayResults } from "@/utils/debugResults";

export default function DebugPage() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showRaw, setShowRaw] = useState(false);

  const handleRunTest = () => {
    setIsLoading(true);
    try {
      const testResults = runTest();
      setResults(testResults);
    } catch (error) {
      console.error("Erreur lors du test:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Exécuter automatiquement le test au chargement de la page en développement
    if (process.env.NODE_ENV === "development") {
      handleRunTest();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          🐕‍🦺 Test de Compatibilité - Mode Débogage
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {results
                ? "Résultats du test"
                : "Lancez un test de compatibilité"}
            </h2>
            <button
              onClick={() => {
                setIsLoading(true);
                // Simuler un léger délai pour l'animation
                setTimeout(() => {
                  const testResults = runTest();
                  setResults(testResults);
                  setIsLoading(false);
                }, 500);
              }}
              disabled={isLoading}
              className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg 
              transform transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
              ${isLoading ? "opacity-75 cursor-not-allowed" : "hover:from-indigo-700 hover:to-indigo-800"}`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-refresh-ccw"
                >
                  <path d="M21 2v6h-6"></path>
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                  <path d="M3 22v-6h6"></path>
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                </svg>
              )}
              {isLoading ? "Génération en cours..." : "Nouvelle simulation"}
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Calcul des résultats en cours...
              </p>
            </div>
          ) : results ? (
            <>
              <div className="mb-8 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-200">
                  {results.overall.interpretation.title}
                </h3>
                <p className="mt-1 text-indigo-700 dark:text-indigo-300">
                  {results.overall.interpretation.description}
                </p>
                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                      Compatibilité globale
                    </span>
                    <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                      {results.overall.similarity}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full"
                      style={{ width: `${results.overall.similarity}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-200">
                    Score moyen du maître
                  </h4>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {results.overall.master}%
                  </p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-amber-800 dark:text-amber-200">
                    Score moyen du chien
                  </h4>
                  <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                    {results.overall.dog}%
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                Détails par axe
              </h3>
              <div className="space-y-4">
                {results.axes.map((axis, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {axis.axis}
                    </h4>
                    <div className="mt-2 space-y-2">
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                          <span>Maître</span>
                          <span>{axis.master}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-600">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${axis.master}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                          <span>Chien</span>
                          <span>{axis.dog}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-600">
                          <div
                            className="bg-amber-500 h-2 rounded-full"
                            style={{ width: `${axis.dog}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center justify-between">
                        <span>Similarité: {axis.similarity}%</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          {axis.similarity >= 80
                            ? "Très forte"
                            : axis.similarity >= 60
                              ? "Forte"
                              : axis.similarity >= 40
                                ? "Moyenne"
                                : "Faible"}{" "}
                          harmonie
                        </span>
                      </div>
                      <p className="mt-2 text-gray-700 dark:text-gray-200 italic">
                        {axis.interpretation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowRaw(!showRaw)}
                  className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  {showRaw
                    ? "Masquer les données brutes"
                    : "Afficher les données brutes"}
                </button>

                {showRaw && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-auto max-h-96">
                    <pre className="text-xs text-gray-700 dark:text-gray-300">
                      {JSON.stringify(results, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                Cliquez sur le bouton pour lancer un test de compatibilité avec
                des données de test.
              </p>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Ceci est une page de débogage. Les données sont générées
            aléatoirement à des fins de test.
          </p>
          <p>
            Ouvrez la console du navigateur (F12) pour voir les résultats
            détaillés.
          </p>
        </div>
      </div>
    </div>
  );
}
