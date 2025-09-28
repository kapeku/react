import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import WelcomeScreen from "./components/WelcomeScreen";
import QuizHeader from "./components/QuizHeader";
import Question from "./components/Question";
import Result from "./components/Result";
import QuizStats from "./components/QuizStats";
import QuestionNavigation from "./components/QuestionNavigation";
import { initializeQuiz, startQuiz, answerQuestion, goToQuestion, finishQuiz, resetQuiz } from "./store/quizSlice";
import {
  selectShuffledQuestions,
  selectCurrentQuestion,
  selectScore,
  selectIsFinished,
  selectAnsweredQuestions,
  selectSelectedAnswers,
  selectIsCorrectByQuestion,
  selectIsLoading,
  selectShowWelcome,
  selectHasAnsweredCurrent,
  selectSelectedAnswerCurrent
} from "./store/selectors";

export default function App() {
  const dispatch = useDispatch();
  // selectors
  const shuffledQuestions = useSelector(selectShuffledQuestions);
  const currentQuestion = useSelector(selectCurrentQuestion);
  const score = useSelector(selectScore);
  const isFinished = useSelector(selectIsFinished);
  const answeredQuestions = useSelector(selectAnsweredQuestions);
  const selectedAnswers = useSelector(selectSelectedAnswers);
  const isCorrectByQuestion = useSelector(selectIsCorrectByQuestion);
  const isLoading = useSelector(selectIsLoading);
  const showWelcome = useSelector(selectShowWelcome);
  const hasAnsweredCurrent = useSelector(selectHasAnsweredCurrent);
  const selectedIndexCurrent = useSelector(selectSelectedAnswerCurrent);

  useEffect(() => {
    dispatch(initializeQuiz());
  }, [dispatch]);

  const handleStartQuiz = (category) => {
    dispatch(startQuiz(category));
  };

  const handleAnswer = (isCorrect, answerIndex) => {
    dispatch(answerQuestion({
      questionIndex: currentQuestion,
      answerIndex,
      isCorrect
    }));
  };

  const handleFinishQuiz = () => {
    dispatch(finishQuiz());
  };

  const handleGoToQuestion = (questionIndex) => {
    dispatch(goToQuestion(questionIndex));
  };

  const handleRestart = () => {
    dispatch(resetQuiz());
  };

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto mt-10 p-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Загрузка викторины...</p>
      </div>
    );
  }

  
  if (showWelcome) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-4">
        <div className="bg-white border rounded-lg shadow-lg overflow-hidden">
          <WelcomeScreen onStartQuiz={handleStartQuiz} />
        </div>
      </div>
    );
  }

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
                    onFinishQuiz={handleFinishQuiz}
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
                    onQuestionClick={handleGoToQuestion}
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
