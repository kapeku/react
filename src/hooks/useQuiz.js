import { useState, useCallback } from 'react';

export const useQuiz = (questions) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionIndex]: answerIndex }
  const [isCorrectByQuestion, setIsCorrectByQuestion] = useState({}); // { [questionIndex]: boolean }

  const handleAnswer = useCallback((isCorrect, answerIndex) => {
    if (answeredQuestions.has(currentQuestion)) {
      return;
    }

    setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: answerIndex }));
    setIsCorrectByQuestion(prev => ({ ...prev, [currentQuestion]: !!isCorrect }));

    setAnsweredQuestions(prev => {
      const next = new Set(prev);
      next.add(currentQuestion);
      return next;
    });

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    
    // const nextQuestion = currentQuestion + 1;
    // if (nextQuestion < questions.length) {
    //   setCurrentQuestion(nextQuestion);
    // } else {
    //   setIsFinished(true);
    // }
  }, [currentQuestion, questions.length, answeredQuestions]);

  const finishQuiz = useCallback(() => {
    setIsFinished(true);
  }, []);

  const nextQuestion = useCallback(() => {
    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
    }
  }, [currentQuestion, questions.length]);

  const restartQuiz = useCallback(() => {
    setCurrentQuestion(0);
    setScore(0);
    setIsFinished(false);
    setAnsweredQuestions(new Set());
    setSelectedAnswers({});
    setIsCorrectByQuestion({});
  }, []);

  const goToQuestion = useCallback((questionIndex) => {
    if (questionIndex >= 0 && questionIndex < questions.length) {
      setCurrentQuestion(questionIndex);
    }
  }, [questions.length]);

  const getProgress = useCallback(() => {
    return {
      current: currentQuestion + 1,
      total: questions.length,
      percentage: Math.round(((currentQuestion + 1) / questions.length) * 100)
    };
  }, [currentQuestion, questions.length]);

  return {
    currentQuestion,
    score,
    isFinished,
    answeredQuestions,
    selectedAnswers,
    isCorrectByQuestion,
    handleAnswer,
    finishQuiz,
    nextQuestion,
    restartQuiz,
    goToQuestion,
    getProgress,
    totalQuestions: questions.length
  };
};
