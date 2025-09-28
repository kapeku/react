

export const selectQuiz = (state) => state.quiz;

export const selectShuffledQuestions = (state) => state.quiz.shuffledQuestions;

export const selectCurrentQuestion = (state) => state.quiz.currentQuestion;

export const selectScore = (state) => state.quiz.score;

export const selectIsFinished = (state) => state.quiz.isFinished;

export const selectAnsweredQuestions = (state) => state.quiz.answeredQuestions;

export const selectSelectedAnswers = (state) => state.quiz.selectedAnswers;

export const selectIsCorrectByQuestion = (state) => state.quiz.isCorrectByQuestion;

export const selectIsLoading = (state) => state.quiz.isLoading;

export const selectShowWelcome = (state) => state.quiz.showWelcome;

export const selectQuizCategory = (state) => state.quiz.quizCategory;


export const selectCurrentQuestionData = (state) => {
  const { shuffledQuestions, currentQuestion } = state.quiz;
  return shuffledQuestions[currentQuestion] || null;
};


export const selectHasAnsweredCurrent = (state) => {
  const { answeredQuestions, currentQuestion } = state.quiz;
  return answeredQuestions.includes(currentQuestion);
};


export const selectSelectedAnswerCurrent = (state) => {
  const { selectedAnswers, currentQuestion } = state.quiz;
  return selectedAnswers[currentQuestion];
};


export const selectIsCorrectCurrent = (state) => {
  const { isCorrectByQuestion, currentQuestion } = state.quiz;
  return isCorrectByQuestion[currentQuestion];
};
