import React from 'react';
import { calculateStats } from '../utils/quizUtils';

const QuizStats = ({ questions, answeredQuestions, score, currentQuestion }) => {
  const stats = calculateStats(questions, answeredQuestions, score);

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Статистика</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Прогресс:</p>
          <p className="font-semibold">{currentQuestion + 1} / {stats.totalQuestions}</p>
        </div>
        <div>
          <p className="text-gray-600">Правильных ответов:</p>
          <p className="font-semibold text-green-600">{stats.correctAnswers}</p>
        </div>
        <div>
          <p className="text-gray-600">Неправильных ответов:</p>
          <p className="font-semibold text-red-600">{stats.incorrectAnswers}</p>
        </div>
        <div>
          <p className="text-gray-600">Точность:</p>
          <p className="font-semibold text-blue-600">{stats.accuracy}%</p>
        </div>
      </div>
    </div>
  );
};

export default QuizStats;
