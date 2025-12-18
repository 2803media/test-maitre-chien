/**
 * Formate une question en fonction du rôle (maître ou chien)
 * @param {Object} question - L'objet question à formater
 * @param {string} role - 'master' pour le maître, 'dog' pour le chien
 * @returns {Object} La question formatée
 */
export function formatQuestion(question, role) {
  // Si la question a déjà des versions pour maître et chien
  if (
    typeof question.text === "object" &&
    question.text.master &&
    question.text.dog
  ) {
    return {
      ...question,
      text: role === "master" ? question.text.master : question.text.dog,
    };
  }

  // Pour la rétrocompatibilité avec les anciennes questions
  const formattedText = question.text.toLowerCase();

  // Mise en majuscule de la première lettre et ajout du point d'interrogation si nécessaire
  const finalText =
    formattedText.charAt(0).toUpperCase() +
    formattedText.slice(1) +
    (formattedText.endsWith("?") ? "" : " ?");

  return {
    ...question,
    text: finalText,
  };
}

/**
 * Formate toutes les questions pour un rôle donné
 * @param {Array} questions - Tableau de questions à formater
 * @param {string} role - 'master' ou 'dog'
 * @returns {Array} Tableau de questions formatées
 */
export function formatQuestionsForRole(questions, role) {
  return questions.map((question) => formatQuestion(question, role));
}
