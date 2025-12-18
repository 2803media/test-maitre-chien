"use client";

import { Mars, Venus } from "lucide-react";

export default function GenderSelection({ onSelect }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="max-w-4xl w-full animate-fadeIn">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Test de Compatibilité Maître-Chien
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Découvrez à quel point vous et votre chien êtes sur la même longueur
            d'onde
          </p>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
            Sélectionnez votre genre
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Cela nous permettra d'adapter les questions à votre profil
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => onSelect("homme")}
            className="group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-slate-500 to-indigo-600 hover:from-slate-600 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                <Mars className="w-12 h-12" />
              </div>
              <span className="text-2xl font-bold">Homme</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            onClick={() => onSelect("femme")}
            className="group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-pink-400 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                <Venus className="w-12 h-12" />
              </div>
              <span className="text-2xl font-bold">Femme</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
