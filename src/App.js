import React, { useState, useEffect } from "react";
import QuizHeader from "./components/QuizHeader";
import Question from "./components/Question";
import Result from "./components/Result";
import QuizStats from "./components/QuizStats";
import QuestionNavigation from "./components/QuestionNavigation";
import { questions } from "./data/questions";
import { shuffleQuestions, shuffleAnswers } from "./utils/quizUtils";

export default function App() {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionIndex]: answerIndex }
  const [isCorrectByQuestion, setIsCorrectByQuestion] = useState({}); // { [questionIndex]: boolean }

  useEffect(() => {
    const shuffled = shuffleQuestions(questions).map(q => ({
      ...q,
      answers: shuffleAnswers(q.answers)
    }));
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswer = (isCorrect, answerIndex) => {
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
  };

  const finishQuiz = () => {
    setIsFinished(true);
  };


  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setIsFinished(false);
    setAnsweredQuestions(new Set());
    setSelectedAnswers({});
    setIsCorrectByQuestion({});
  };

  const goToQuestion = (questionIndex) => {
    if (questionIndex >= 0 && questionIndex < shuffledQuestions.length) {
      setCurrentQuestion(questionIndex);
    }
  };

  const handleRestart = () => {
    const shuffled = shuffleQuestions(questions).map(q => ({
      ...q,
      answers: shuffleAnswers(q.answers)
    }));
    setShuffledQuestions(shuffled);
    restartQuiz();
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div className="max-w-lg mx-auto mt-10 p-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Загрузка викторины...</p>
      </div>
    );
  }

  const hasAnsweredCurrent = answeredQuestions.has(currentQuestion);
  const selectedIndexCurrent = selectedAnswers[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="bg-white border rounded-lg shadow-lg overflow-hidden">
        {!isFinished && (
          <>
            <QuizHeader 
              currentQuestion={currentQuestion} 
              totalQuestions={shuffledQuestions.length} 
            />
            
            <div className="p-6">
              <div className="flex gap-6">
                <div className="flex-1">
                  <Question 
                    question={shuffledQuestions[currentQuestion]} 
                    onAnswer={handleAnswer} 
                    hasAnswered={hasAnsweredCurrent}
                    selectedIndex={selectedIndexCurrent}
                    onFinishQuiz={finishQuiz}
                    //onNextQuestion={nextQuestion}
                    isLastQuestion={currentQuestion === shuffledQuestions.length - 1}
                    currentQuestionIndex={currentQuestion}
                    totalQuestions={shuffledQuestions.length}
                  />
                </div>
                
                <div className="w-64 space-y-4">
                  <QuizStats 
                    questions={shuffledQuestions}
                    answeredQuestions={answeredQuestions}
                    score={score}
                    currentQuestion={currentQuestion}
                  />
                  
                  <QuestionNavigation 
                    currentQuestion={currentQuestion}
                    totalQuestions={shuffledQuestions.length}
                    answeredQuestions={answeredQuestions}
                    onQuestionClick={goToQuestion}
                    isCorrectByQuestion={isCorrectByQuestion}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        
        {isFinished && (
          <Result 
            score={score} 
            total={shuffledQuestions.length} 
            onRestart={handleRestart} 
          />
        )}
      </div>
    </div>
  );
}
