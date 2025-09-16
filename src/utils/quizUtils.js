// Функция для перемешивания массива ответов
export const shuffleAnswers = (answers) => {
  const shuffled = [...answers];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Функция для перемешивания вопросов
export const shuffleQuestions = (questions) => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Функция для получения оценки по результату
export const getGrade = (score, total) => {
  const percentage = (score / total) * 100;
  
  if (percentage >= 90) return { grade: 'A', text: 'Отлично!', color: 'text-green-600' };
  if (percentage >= 80) return { grade: 'B', text: 'Хорошо!', color: 'text-blue-600' };
  if (percentage >= 70) return { grade: 'C', text: 'Удовлетворительно', color: 'text-yellow-600' };
  if (percentage >= 60) return { grade: 'D', text: 'Неудовлетворительно', color: 'text-orange-600' };
  return { grade: 'F', text: 'Плохо', color: 'text-red-600' };
};

// Функция для форматирования времени
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Функция для валидации ответа
export const validateAnswer = (answer) => {
  return answer && answer.text && typeof answer.isCorrect === 'boolean';
};

// Функция для подсчета статистики
export const calculateStats = (questions, answeredQuestions, score) => {
  const totalQuestions = questions.length;
  const answeredCount = answeredQuestions.size;
  const correctAnswers = score;
  const incorrectAnswers = answeredCount - correctAnswers;
  const accuracy = answeredCount > 0 ? (correctAnswers / answeredCount) * 100 : 0;

  return {
    totalQuestions,
    answeredCount,
    correctAnswers,
    incorrectAnswers,
    accuracy: Math.round(accuracy),
    remainingQuestions: totalQuestions - answeredCount
  };
};
