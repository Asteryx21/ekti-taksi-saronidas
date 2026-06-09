import { ref, computed } from 'vue'
import questionsData from '../data/questions.json'

const BONUS_POINTS = 10
const QUESTIONS_PER_GAME = 3

const readStoredJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const writeStoredJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const shuffle = (items) => {
  const pool = [...items]
  const shuffled = []

  while (pool.length > 0) {
    const randomIndex = Math.floor(Math.random() * pool.length)
    shuffled.push(pool.splice(randomIndex, 1)[0])
  }

  return shuffled
}

// Shared singleton state
const username = ref(localStorage.getItem('quiz_username') || '')
const currentScore = ref(0)
const pickedQuestions = ref(readStoredJson('picked_questions', []))

// Quiz flow state
const currentQuestionIndex = ref(0)
const currentQuestions = ref([])
const quizStarted = ref(false)
const answerHistory = ref([])

export function useGameState() {
  const totalScore = computed(() => {
    const scores = readStoredJson('leaderboard', [])
    const userEntry = scores.find(s => s.username === username.value)
    return userEntry?.score || 0
  })

  const setUsername = (name) => {
    username.value = name
    localStorage.setItem('quiz_username', name)
  }

  const addScore = (points) => {
    currentScore.value += points
  }

  const persistPickedQuestions = () => {
    writeStoredJson('picked_questions', pickedQuestions.value)
  }

  const getAvailableQuestions = () => {
    return questionsData.filter(question => !pickedQuestions.value.includes(question.id))
  }

  const pickRandomQuestions = (count = QUESTIONS_PER_GAME) => {
    if (pickedQuestions.value.length >= questionsData.length) {
      pickedQuestions.value = []
      persistPickedQuestions()
    }

    const availableQuestions = getAvailableQuestions()
    const sourceQuestions = availableQuestions.length >= count
      ? availableQuestions
      : questionsData

    const selectedQuestions = shuffle(sourceQuestions).slice(0, count)
    const selectedIds = selectedQuestions.map(question => question.id)

    pickedQuestions.value = [...new Set([
      ...pickedQuestions.value,
      ...selectedIds,
    ])]
    persistPickedQuestions()

    return selectedQuestions
  }

  const startRandomQuiz = () => {
    const selectedQuestions = pickRandomQuestions()
    startQuiz(selectedQuestions)
    return selectedQuestions
  }

  const saveLeaderboardScore = (score) => {
    const leaderboard = readStoredJson('leaderboard', [])

    const existingIndex = leaderboard.findIndex(
      entry => entry.username === username.value
    )

    if (existingIndex >= 0) {
      leaderboard[existingIndex].score += score
    } else {
      leaderboard.push({
        username: username.value,
        score,
      })
    }

    writeStoredJson('leaderboard', leaderboard)
  }

  const startQuiz = (questions = []) => {
    currentQuestionIndex.value = 0
    currentScore.value = 0
    answerHistory.value = []
    quizStarted.value = true
    currentQuestions.value = questions
  }

  const getCurrentQuestion = () => {
    if (currentQuestionIndex.value < currentQuestions.value.length) {
      return currentQuestions.value[currentQuestionIndex.value]
    }

    return null
  }

  const getQuestionProgress = () => {
    return {
      current: currentQuestionIndex.value + 1,
      total: currentQuestions.value.length,
    }
  }

  const submitAnswer = (answer) => {
    const currentQuestion = getCurrentQuestion()

    if (!currentQuestion) {
      return false
    }

    const isCorrect = answer === currentQuestion.answer

    answerHistory.value.push({
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      userAnswer: answer,
      correctAnswer: currentQuestion.answer,
      isCorrect,
      points: currentQuestion.points,
    })

    if (isCorrect) {
      addScore(currentQuestion.points)
    }

    currentQuestionIndex.value += 1

    const isComplete = currentQuestionIndex.value >= currentQuestions.value.length

    if (isComplete) {
      finishQuiz()
    }

    return isComplete
  }

  const finishQuiz = () => {
    const allCorrect =
      answerHistory.value.length > 0 &&
      answerHistory.value.every(a => a.isCorrect)

    if (allCorrect) {
      currentScore.value += BONUS_POINTS
    }

    const questionIds = currentQuestions.value.map(question => question.id)

    const currentResults = {
      answerHistory: answerHistory.value,
      currentScore: currentScore.value,
      questionIds,
    }

    writeStoredJson('current_quiz_results', currentResults)

    const quizHistory = readStoredJson('quiz_history', [])

    quizHistory.push({
      username: username.value,
      questionIds,
      score: currentScore.value,
      completedAt: new Date().toISOString(),
      allCorrect,
      answerCount: answerHistory.value.length,
    })

    writeStoredJson('quiz_history', quizHistory)
    saveLeaderboardScore(currentScore.value)
    quizStarted.value = false
  }

  const getCurrentQuizResults = () => {
    return readStoredJson('current_quiz_results', {})
  }

  const resetQuiz = () => {
    currentQuestionIndex.value = 0
    currentQuestions.value = []
    answerHistory.value = []
    currentScore.value = 0
    quizStarted.value = false
  }

  return {
    username,
    currentScore,
    pickedQuestions,
    totalScore,
    currentQuestionIndex,
    currentQuestions,
    quizStarted,
    answerHistory,

    setUsername,
    addScore,
    startRandomQuiz,
    saveLeaderboardScore,
    startQuiz,
    getCurrentQuestion,
    getQuestionProgress,
    submitAnswer,
    finishQuiz,
    resetQuiz,
    getCurrentQuizResults,
  }
}
