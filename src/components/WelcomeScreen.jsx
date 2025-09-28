import React from 'react';

const WelcomeScreen = ({ onStartQuiz }) => {
  return (
    <div className="p-8 text-center">
      <div className="max-w-2xl mx-auto">
        {/* Заголовок */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          🎯 Добро пожаловать в викторину!
        </h1>
        
        {/* Описание */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            О викторине
          </h2>
          <p className="text-blue-700 mb-4">
            Проверьте свои знания в увлекательной викторине! 
            Вам предстоит ответить на 5 вопросов о футболе.
          </p>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
             <div className="bg-white rounded-lg p-4 border border-blue-100">
               <div className="text-2xl mb-2">📊</div>
               <div className="font-semibold text-blue-800">5 вопросов</div>
               <div className="text-blue-600">Различной сложности</div>
             </div>
             <div className="bg-white rounded-lg p-4 border border-blue-100">
               <div className="text-2xl mb-2">⏱️</div>
               <div className="font-semibold text-blue-800">Без ограничений</div>
               <div className="text-blue-600">Отвечайте в своем темпе</div>
             </div>
             <div className="bg-white rounded-lg p-4 border border-blue-100">
               <div className="text-2xl mb-2">🎯</div>
               <div className="font-semibold text-blue-800">Один ответ</div>
               <div className="text-blue-600">Выберите правильный вариант</div>
             </div>
             <div className="bg-white rounded-lg p-4 border border-blue-100">
               <div className="text-2xl mb-2">🏆</div>
               <div className="font-semibold text-blue-800">Результаты</div>
               <div className="text-blue-600">Узнайте свой уровень</div>
             </div>
           </div>
        </div>

        {/* Выбор категории и старт */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => onStartQuiz('football')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              ⚽ Начать викторину: Футбол
            </button>
            <button
              onClick={() => onStartQuiz('movies')}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🎬 Начать викторину: Фильмы
            </button>
          </div>
          <p className="text-gray-500 text-sm">
            Выберите тематику и начните викторину!
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
