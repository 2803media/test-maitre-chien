"use client";

import { useState, useMemo, useEffect } from "react";
import { QUESTIONS } from "@/data/questions";
import { formatQuestionsForRole } from "@/utils/questionFormatter";
import GenderSelection from "@/components/GenderSelection";
import QuizQuestion from "@/components/QuizQuestion";
import ResultsRadar from "@/components/ResultsRadar";
import { calculateResults } from "@/lib/calculateResults";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  // États du quiz
  const [answers, setAnswers] = useState({});
  const [stage, setStage] = useState("gender"); // 'gender', 'master', 'dog', 'results'
  const [gender, setGender] = useState("");
  const [results, setResults] = useState(null);
  const [formattedResults, setFormattedResults] = useState(null);
  const [dogAnswers, setDogAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Filtrer et formater les questions en fonction du genre et du rôle
  const { masterQuestions, dogQuestions } = useMemo(() => {
    if (!gender) return { masterQuestions: [], dogQuestions: [] };

    const filtered = QUESTIONS.filter(
      (q) => q.genre === "all" || q.genre === gender
    );
    return {
      masterQuestions: formatQuestionsForRole(filtered, "master"),
      dogQuestions: formatQuestionsForRole(filtered, "dog"),
    };
  }, [gender]);

  // Questions actuelles en fonction de l'étape
  const currentQuestions = stage === "master" ? masterQuestions : dogQuestions;

  // Calculer les résultats quand nécessaire
  const quizResults = useMemo(() => {
    if (stage === "results") {
      // Fonction pour formater correctement les réponses
      const formatAnswers = (answersObj, prefix) => {
        const formatted = {};
        Object.entries(answersObj).forEach(([key, value], index) => {
          // Extraire le numéro de la question de la clé
          const questionNumber = key.startsWith("dog-")
            ? key.replace("dog-", "")
            : key.startsWith("master-")
              ? key.replace("master-", "")
              : key;
          formatted[`${prefix}-${questionNumber}`] = Number(value);
        });
        return formatted;
      };

      const masterAnswersObj = formatAnswers(answers, "master");
      const dogAnswersObj = formatAnswers(dogAnswers, "dog");

      //console.log("Réponses du maître (formaté):", masterAnswersObj);
      //console.log("Réponses du chien (formaté):", dogAnswersObj);

      const results = calculateResults(masterAnswersObj, dogAnswersObj);
      //console.log("Résultats calculés:", results);

      if (results) {
        setFormattedResults({
          axisResults: results.axes.map((axis) => ({
            axis: axis.axis,
            master: axis.master,
            dog: axis.dog,
            similarity: axis.similarity,
          })),
          overallScore: results.overall.similarity,
          interpretation: results.overall.interpretation.description,
        });
      }

      return results;
    }
    return null;
  }, [stage, answers, dogAnswers]);

  // Fonction pour gérer la sélection du genre
  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setStage("master");
    setCurrentQuestionIndex(0);
  };

  const handleAnswer = async (value) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const currentQuestion = currentQuestions[currentQuestionIndex];

    // Attendre un court instant pour l'animation
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (stage === "master") {
      // Mettre à jour les réponses du maître
      setAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: value,
      }));

      // Passer à la question suivante ou au chien
      if (currentQuestionIndex < masterQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setStage("dog");
        setCurrentQuestionIndex(0);
      }
    } else if (stage === "dog") {
      setDogAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: value,
      }));

      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // Affichage des résultats
        setStage("results");
      }
    }

    setIsTransitioning(false);
  };

  const handleRestart = () => {
    setStage("gender");
    setGender(null);
    setAnswers({});
    setDogAnswers({});
    setCurrentQuestionIndex(0);
  };

  // Animation de transition entre les questions
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  // Afficher l'étape appropriée
  return (
    <div className="page-container min-h-[calc(100vh-4rem)]">
      <div className="h-full flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {stage === "gender" ? (
            <motion.div
              key="gender-selection"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              className="w-full max-w-md"
            >
              <GenderSelection onSelect={handleGenderSelect} />
            </motion.div>
          ) : stage === "results" && formattedResults ? (
            <motion.div
              key="results"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              className="w-full max-w-4xl"
            >
              <ResultsRadar
                results={formattedResults}
                onRestart={handleRestart}
              />
            </motion.div>
          ) : (
            <motion.div
              key={`${stage}-${currentQuestionIndex}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              className="w-full max-w-2xl"
            >
              <QuizQuestion
                question={currentQuestions[currentQuestionIndex]}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={currentQuestions.length}
                onAnswer={handleAnswer}
                role={stage} // 'master' ou 'dog'
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
