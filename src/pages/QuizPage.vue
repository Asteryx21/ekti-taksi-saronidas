<script setup>
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGameState } from '../composables/useGameState'
import { useAudio } from '../composables/useAudio'
import QuestionCard from '../components/QuestionCard.vue'
import ProgressBar from '../components/ProgressBar.vue'
import studentsData from '../data/students.json'

const route = useRoute()
const router = useRouter()
const gameState = useGameState()
const audio = useAudio()

const studentId = parseInt(route.params.studentId)
const student = computed(() => {
  return studentsData.find(s => s.id === studentId)
})

const currentQuestion = computed(() => {
  return gameState.getCurrentQuestion()
})

const progress = computed(() => {
  return gameState.getQuestionProgress()
})

onMounted(() => {
  gameState.startQuiz(studentId)
})

const handleAnswer = (answer) => {
  if (answer === currentQuestion.value?.answer) {
    audio.playCorrect()
  } else {
    audio.playWrong()
  }

  const quizComplete = gameState.submitAnswer(answer)
  
  if (quizComplete) {
    audio.playComplete()
    setTimeout(() => {
      router.push('/result')
    }, 800)
  }
}

const goBack = () => {
  gameState.quizStarted.value = false
  router.back()
}
</script>

<template>
  <div class="quiz-page">
    <div class="quiz-container">
      <header class="quiz-header">
        <button @click="goBack" class="back-button">← Back</button>
        <div class="student-info">
          <h2>{{ student?.name }}</h2>
          <p class="class-label">Class {{ student?.class }}</p>
        </div>
      </header>

      <div class="progress-section">
        <ProgressBar 
          :current="progress.current" 
          :total="progress.total"
        />
      </div>

      <div class="question-section">
        <QuestionCard 
          v-if="currentQuestion"
          :question="currentQuestion"
          :student-name="student?.name"
          :question-number="progress.current"
          :total-questions="progress.total"
          @answer="handleAnswer"
        />
      </div>

      <div class="score-display">
        <div class="current-score">
          Score: <span class="score-value">{{ gameState.currentScore.value }}</span> 🌟
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quiz-page {
  min-height: 100vh;
  padding: var(--spacing-lg);
  background: linear-gradient(135deg, var(--color-cyan) 0%, var(--color-pink) 100%);
}

.quiz-container {
  max-width: 700px;
  margin: 0 auto;
}

.quiz-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.back-button {
  background: var(--color-white);
  color: var(--color-purple);
  border: 2px solid var(--color-purple);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 1rem;
}

.back-button:hover {
  transform: translateX(-4px);
}

.student-info {
  flex: 1;
}

.student-info h2 {
  margin: 0;
  font-size: 1.5rem;
}

.class-label {
  margin: var(--spacing-xs) 0 0 0;
  color: var(--color-gray-dark);
  font-size: 0.9rem;
}

.progress-section {
  margin-bottom: var(--spacing-lg);
}

.question-section {
  margin-bottom: var(--spacing-lg);
  animation: slideIn 0.3s ease-out;
}

.score-display {
  text-align: center;
  padding: var(--spacing-md);
  background: rgba(255, 255, 255, 0.9);
  border-radius: var(--radius-md);
  font-size: 1.1rem;
  font-weight: 600;
}

.current-score {
  color: var(--color-purple);
}

.score-value {
  font-size: 1.4rem;
  color: var(--color-gold);
}

@media (max-width: 640px) {
  .quiz-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .student-info h2 {
    font-size: 1.2rem;
  }
}
</style>
