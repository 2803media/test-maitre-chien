"use client";

import { Icons } from "@/lib/icons";
import { OPTIONS } from "@/data/questions";
import { User, Dog } from "lucide-react";

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  currentRole,
}) {
  const IconComponent = Icons[question.icon] || Icons.HelpCircle;
  const RoleIcon = currentRole === "master" ? User : Dog;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full animate-fadeIn">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <RoleIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <div className="flex items-center gap-1 text-sm font-medium">
                {currentRole === "master" ? (
                  <>
                    <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-gray-600 dark:text-gray-300">
                      Maître
                    </span>
                  </>
                ) : (
                  <>
                    <Dog className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-gray-600 dark:text-gray-300">
                      Chien
                    </span>
                  </>
                )}
              </div>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Question {questionNumber} / {totalQuestions}
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          {/* Axis badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-6">
            <IconComponent className="w-4 h-4" />
            <span>{question.axis}</span>
          </div>

          {/* Question text */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
            {question.text}
          </h2>

          {/* Answer options */}
          <div className="space-y-3">
            {OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => onAnswer(option.value)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r ${option.colorClass} font-medium text-gray-800 dark:text-white shadow-md hover:shadow-lg`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Icon decoration */}
        <div className="flex justify-center mt-8">
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full">
            <IconComponent className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
