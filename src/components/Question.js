import React from 'react';
import AnswerButton from './AnswerButton';

const Question = ({ question, onAnswer, hasAnswered, selectedIndex, onFinishQuiz, isLastQuestion, onNextQuestion, currentQuestionIndex, totalQuestions }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl mb-4 font-semibold text-gray-800">{question.text}</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {question.answers.map((answer, index) => (
          <AnswerButton
            key={index}
            answer={answer.text}
            onClick={() => onAnswer(answer.isCorrect, index)}
            selected={selectedIndex === index}
            disabled={hasAnswered}
            isCorrect={answer.isCorrect}
          />
        ))}
      </div>
      
      {/* Кнопка завершения викторины только на последнем вопросе */}
      {hasAnswered && isLastQuestion && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onFinishQuiz}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Завершить викторину
          </button>
        </div>
      )}
    </div>
  );
};

export default Question;
