import React from 'react';

const QuestionNavigation = ({ 
  currentQuestion, 
  totalQuestions, 
  answeredQuestions, 
  onQuestionClick,
  isCorrectByQuestion 
}) => {
  const renderQuestionButton = (index) => {
    const isAnswered = answeredQuestions.has(index);
    const isCurrent = index == currentQuestion;
    const isCorrect = isCorrectByQuestion && isCorrectByQuestion[index];
    
    let buttonClass = "w-8 h-8 rounded-full text-sm font-medium transition-colors duration-200 flex items-center justify-center ";
    
    if (isCurrent) {
      buttonClass += " bg-blue-600 text-white ";
    } else if (isAnswered) {
      buttonClass += isCorrect ? " bg-green-500 text-white " : " bg-red-500 text-white ";
    } else {
      buttonClass += " bg-gray-200 text-gray-700 hover:bg-gray-300 ";
    }

    return (
      <button
        key={index}
        onClick={() => onQuestionClick(index)}
        className={buttonClass}
        title={`Вопрос ${index + 1}`}
      >
        {index + 1}
      </button>
    );
  };

  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Навигация по вопросам:</h4>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: totalQuestions }, (_, index) => 
          renderQuestionButton(index)
        )}
      </div>
      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span>Текущий</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Верно</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Неверно</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
          <span>Не отвечен</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigation;
