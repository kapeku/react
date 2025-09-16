import React from 'react';

const AnswerButton = ({ answer, onClick, selected, disabled, isCorrect }) => {
  let className = "p-2 m-1 border rounded transition-colors duration-200 ";

  if (disabled) {
    className += " cursor-not-allowed ";
  }

  // Цвета
  if (selected && disabled) {
    className += isCorrect 
      ? " bg-green-500 text-white border-green-600 " 
      : " bg-red-500 text-white border-red-600 ";
  } else {
    className += " bg-blue-500 text-white hover:bg-blue-600 ";
  }

  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {answer}
    </button>
  );
};

export default AnswerButton;
