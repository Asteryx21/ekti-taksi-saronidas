import { ref, computed } from 'vue'
import questionsData from '../data/questions.json'

const BONUS_POINTS = 10

// Shared singleton state
const username = ref(localStorage.getItem('quiz_username') || '')
const currentScore = ref(0)
const completedStudents = ref(
  JSON.parse(localStorage.getItem('completed_students') || '[]')
)

// Quiz flow state
const currentStudentId = ref(null)
const currentQuestionIndex = ref(0)
const currentQuestions = ref([])
const quizStarted = ref(false)
const answerHistory = ref([])

export function useGameState() {
  const totalScore = computed(() => {
    const scores = JSON.parse(localStorage.getItem('leaderboard') || '[]')
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

  const markStudentCompleted = (studentId) => {
    if (!completedStudents.value.includes(studentId)) {
      completedStudents.value.push(studentId)

      localStorage.setItem(
        'completed_students',
        JSON.stringify(completedStudents.value)
      )
    }
  }

  const saveLeaderboardScore = (score) => {
    const leaderboard = JSON.parse(
      localStorage.getItem('leaderboard') || '[]'
    )

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

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard))
  }

  const startQuiz = (studentId) => {
    currentStudentId.value = studentId
    currentQuestionIndex.value = 0
    currentScore.value = 0
    answerHistory.value = []
    quizStarted.value = true

    const studentQuestions = questionsData.find(
      q => q.studentId === studentId
    )

    currentQuestions.value = studentQuestions?.questions || []
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

    const isComplete =
      currentQuestionIndex.value >= currentQuestions.value.length

    if (isComplete) {
      finishQuiz()
    }

    return isComplete
  }

  const finishQuiz = () => {
    const allCorrect =
      answerHistory.value.length > 0 &&
      answerHistory.value.every(a => a.isCorrect)

    // Apply bonus only once
    if (allCorrect) {
      currentScore.value += BONUS_POINTS
    }

    const currentResults = {
      answerHistory: answerHistory.value,
      currentScore: currentScore.value,
      currentStudentId: currentStudentId.value,
    }

    localStorage.setItem(
      'current_quiz_results',
      JSON.stringify(currentResults)
    )

    const quizHistory = JSON.parse(
      localStorage.getItem('quiz_history') || '[]'
    )

    quizHistory.push({
      username: username.value,
      studentId: currentStudentId.value,
      score: currentScore.value,
      completedAt: new Date().toISOString(),
      allCorrect,
      answerCount: answerHistory.value.length,
    })

    localStorage.setItem(
      'quiz_history',
      JSON.stringify(quizHistory)
    )

    markStudentCompleted(currentStudentId.value)

    saveLeaderboardScore(currentScore.value)

    quizStarted.value = false
  }

  const getCurrentQuizResults = () => {
    return JSON.parse(
      localStorage.getItem('current_quiz_results') || '{}'
    )
  }

  const resetQuiz = () => {
    currentStudentId.value = null
    currentQuestionIndex.value = 0
    currentQuestions.value = []
    answerHistory.value = []
    currentScore.value = 0
  }

  return {
    username,
    currentScore,
    completedStudents,
    totalScore,
    currentStudentId,
    currentQuestionIndex,
    currentQuestions,
    quizStarted,
    answerHistory,

    setUsername,
    addScore,
    markStudentCompleted,
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