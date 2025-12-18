"use client";

import { useState } from "react";
import { formatQuestion } from "@/utils/questionFormatter";
import { motion, AnimatePresence } from "framer-motion";
import { User, Dog } from "lucide-react";

// Composants d'icônes SVG
const SmileIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
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
    width="24"
    height="24"
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
    width="24"
    height="24"
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

export default function QuizQuestion({
  question: originalQuestion,
  questionNumber,
  totalQuestions,
  onAnswer,
  role, // 'master' ou 'dog'
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Formater la question en fonction du rôle
  const question = formatQuestion(originalQuestion, role);

  // Options de réponse avec icônes SVG
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
          width="24"
          height="24"
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

    // Délai pour permettre l'animation avant de passer à la question suivante
    setTimeout(() => {
      onAnswer(value);
      setSelectedAnswer(null);
      setIsAnimating(false);
    }, 500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full"
      >
        {/* En-tête */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
              Question {questionNumber} sur {totalQuestions}
            </span>
            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
              {role === "master" ? (
                <>
                  <User className="w-4 h-4 text-indigo-600 dark:text-indigo-300" />
                  <span>Maître</span>
                </>
              ) : (
                <>
                  <Dog className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Chien</span>
                </>
              )}
            </span>
          </div>

          <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-primary-400 to-primary-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-6 leading-relaxed">
            {question.text}
          </h2>
        </div>

        {/* Options de réponse */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mt-6">
          {answerOptions.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswerSelect(option.value)}
              disabled={isAnimating}
              className={`p-4 rounded-xl transition-all duration-200 flex flex-col items-center justify-center ${
                selectedAnswer === option.value
                  ? "ring-2 ring-offset-2 ring-primary transform scale-105 shadow-md"
                  : ""
              } ${option.color} h-full`}
            >
              <div className="mb-2">{option.icon}</div>
              <span className="text-sm font-medium text-center">
                {option.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Indicateur de progression */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {role === "master"
              ? "Répondez honnêtement pour obtenir des résultats précis."
              : "Répondez comme vous pensez que votre chien répondrait."}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
