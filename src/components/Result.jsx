import React from 'react';

const Result = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  
  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl mb-4 font-bold text-gray-800">
        Викторина окончена!
      </h2>
      <div className="mb-6">
        <p className="text-xl text-gray-600 mb-2">
          Ваш результат: <span className="font-bold text-blue-600">{score}</span> из <span className="font-bold">{total}</span>
        </p>
        <p className="text-lg text-gray-500">
          Процент правильных ответов: <span className="font-bold text-green-600">{percentage}%</span>
        </p>
      </div>
      <button
        onClick={onRestart}
        className="px-6 py-3 border rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg"
      >
        Вернуться на экран выбора викторины
      </button>
    </div>
  );
};

export default Result;
