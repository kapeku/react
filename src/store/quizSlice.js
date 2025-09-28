import { createSlice } from '@reduxjs/toolkit';
import { questions } from '../data/questions';
import { shuffleQuestions, shuffleAnswers } from '../utils/quizUtils';
import { questionsMovies } from '../data/questions_movies';

const initialState = {
  shuffledQuestions: [],
  currentQuestion: 0,
  score: 0,
  isFinished: false,
  answeredQuestions: [], // массив индексов отвеченных вопросов
  selectedAnswers: {}, // { [questionIndex]: answerIndex }
  isCorrectByQuestion: {}, // { [questionIndex]: boolean }
  isLoading: false,
  showWelcome: true, // показывать ли экран приветствия
  quizCategory: 'football',
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    initializeQuiz: (state) => {
      const shuffled = shuffleQuestions(questions).map(q => ({
        ...q,
        answers: shuffleAnswers(q.answers)
      }));
      state.shuffledQuestions = shuffled;
      state.isLoading = false;
    },

    startQuiz: (state, action) => {
      const category = action?.payload === 'movies' ? 'movies' : 'football';
      const source = category === 'movies' ? questionsMovies : questions;
      const shuffled = shuffleQuestions(source).map(q => ({
        ...q,
        answers: shuffleAnswers(q.answers)
      }));
      state.shuffledQuestions = shuffled;
      state.currentQuestion = 0;
      state.score = 0;
      state.isFinished = false;
      state.answeredQuestions = [];
      state.selectedAnswers = {};
      state.isCorrectByQuestion = {};
      state.showWelcome = false;
      state.isLoading = false;
      state.quizCategory = category;
    },
    
    answerQuestion: (state, action) => {
      const { questionIndex, answerIndex, isCorrect } = action.payload;
      
      // Проверяем, не отвечен ли уже на этот вопрос
      if (state.answeredQuestions.includes(questionIndex)) {
        return;
      }

      state.selectedAnswers[questionIndex] = answerIndex;
      state.isCorrectByQuestion[questionIndex] = isCorrect;
      state.answeredQuestions.push(questionIndex);

      if (isCorrect) {
        state.score += 1;
      }
    },

    goToQuestion: (state, action) => {
      const questionIndex = action.payload;
      if (questionIndex >= 0 && questionIndex < state.shuffledQuestions.length) {
        state.currentQuestion = questionIndex;
      }
    },

    finishQuiz: (state) => {
      state.isFinished = true;
    },

    restartQuiz: (state) => {
      state.currentQuestion = 0;
      state.score = 0;
      state.isFinished = false;
      state.answeredQuestions = [];
      state.selectedAnswers = {};
      state.isCorrectByQuestion = {};
    },

    resetQuiz: (state) => {
      state.shuffledQuestions = [];
      state.currentQuestion = 0;
      state.score = 0;
      state.isFinished = false;
      state.answeredQuestions = [];
      state.selectedAnswers = {};
      state.isCorrectByQuestion = {};
      state.showWelcome = true;
      state.quizCategory = 'football';
    },
  },
});

export const {
  initializeQuiz,
  startQuiz,
  answerQuestion,
  goToQuestion,
  finishQuiz,
  restartQuiz,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
