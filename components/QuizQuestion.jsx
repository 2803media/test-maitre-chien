"use client";

import { useState } from "react";
import { formatQuestion } from "@/utils/questionFormatter";
import { motion } from "framer-motion";
import { User, Dog } from "lucide-react";

/* =========================
   Icônes SVG
========================= */

const SmileIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const MehIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="8" y1="15" x2="16" y2="15" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const FrownIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

/* =========================
   Composant principal
========================= */

export default function QuizQuestion({
  question: originalQuestion,
  questionNumber,
  totalQuestions,
  onAnswer,
  role, // "master" | "dog"
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const question = formatQuestion(originalQuestion, role);

  const progress = Math.round((questionNumber / totalQuestions) * 100);

  const answerOptions = [
    {
      value: 1,
      label: "Pas du tout",
      icon: <FrownIcon className="w-6 h-6 text-red-400" />,
      color:
        "bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50",
    },
    {
      value: 2,
      label: "Un peu",
      icon: <FrownIcon className="w-6 h-6 text-orange-400" />,
      color:
        "bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:hover:bg-orange-900/50",
    },
    {
      value: 3,
      label: "Moyennement",
      icon: <MehIcon className="w-6 h-6 text-yellow-400" />,
      color:
        "bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50",
    },
    {
      value: 4,
      label: "Beaucoup",
      icon: <SmileIcon className="w-6 h-6 text-blue-400" />,
      color:
        "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50",
    },
    {
      value: 5,
      label: "Tout à fait",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-green-400"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="M22 4 12 14.01l-3-3" />
        </svg>
      ),
      color:
        "bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50",
    },
  ];

  const handleAnswerSelect = (value) => {
    if (isAnimating) return;

    setSelectedAnswer(value);
    setIsAnimating(true);

    setTimeout(() => {
      onAnswer(value);
      setSelectedAnswer(null);
      setIsAnimating(false);
    }, 400);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
            Question {questionNumber} sur {totalQuestions}
          </span>

          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
            {role === "master" ? (
              <>
                <User className="w-4 h-4 text-indigo-600" />
                Maître
              </>
            ) : (
              <>
                <Dog className="w-4 h-4 text-amber-600" />
                Chien
              </>
            )}
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            // CORRECTION ICI :
            // 1. "bg-gradient-to-r" au lieu de "bg-linear-to-r"
            // 2. Utilisation de couleurs sûres (indigo) ou assurez-vous que primary-400 existe
            className="h-full bg-linear-to-r from-indigo-500 to-purple-600 rounded-full origin-left"
            // Ajout de 'initial' pour éviter les glitchs au chargement
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <p className="text-xs text-gray-500 mt-1 text-right">{progress} %</p>
      </div>

      {/* Question */}
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        {question.text}
      </h2>

      {/* Réponses */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {answerOptions.map((option) => (
          <motion.button
            key={option.value}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={isAnimating}
            onClick={() => handleAnswerSelect(option.value)}
            className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all ${
              selectedAnswer === option.value
                ? "ring-2 ring-primary scale-105 shadow-md"
                : ""
            } ${option.color}`}
          >
            {option.icon}
            <span className="mt-2 text-sm font-medium text-center">
              {option.label}
            </span>
          </motion.button>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        {role === "master"
          ? "Répondez honnêtement."
          : "Répondez comme votre chien le ferait."}
      </p>
    </div>
  );
}
