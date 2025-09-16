import React from 'react';

const QuizHeader = ({ currentQuestion, totalQuestions }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl mb-2 text-center font-bold text-gray-800">
        Мини-викторина
      </h1>
      <div className="text-center text-gray-600">
        Вопрос {currentQuestion + 1} из {totalQuestions}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuizHeader;
