<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameState } from '../composables/useGameState'
import studentsData from '../data/students.json'

const router = useRouter()
const gameState = useGameState()

const student = computed(() => {
  return studentsData.find(
    s => s.id === gameState.currentStudentId.value
  )
})

const allCorrect = computed(() => {
  return (
    gameState.answerHistory.value.length > 0 &&
    gameState.answerHistory.value.every(a => a.isCorrect)
  )
})

const correctCount = computed(() => {
  return gameState.answerHistory.value.filter(
    a => a.isCorrect
  ).length
})

const totalQuestions = computed(() => {
  return gameState.answerHistory.value.length
})

const nextStudent = () => {
  gameState.resetQuiz()

  const currentClass = student.value?.class

  router.push(`/students/${currentClass}`)
}

const viewLeaderboard = () => {
  gameState.resetQuiz()
  router.push('/leaderboard')
}

const goHome = () => {
  gameState.resetQuiz()
  router.push('/')
}
</script>

<template>
  <div class="result-page">
    <div class="result-container">
      <header class="result-header">
        <div v-if="allCorrect" class="celebration">
          🎉 PERFECT! 🎉
        </div>

        <div v-else class="result-title">
          Quiz Complete!
        </div>
      </header>

      <div class="result-card">
        <h2>{{ student?.name }}</h2>

        <p class="class-info">
          Class {{ student?.class }}
        </p>

        <div class="score-section">
          <div class="score-display">
            <span class="score-label">
              Your Score
            </span>

            <span class="score-value">
              {{ gameState.currentScore.value }}
            </span>
          </div>
        </div>

        <div class="results-details">
          <div class="detail-item">
            <span class="detail-label">
              Correct Answers:
            </span>

            <span class="detail-value">
              {{ correctCount }}/{{ totalQuestions }}
            </span>
          </div>

          <div
            v-if="allCorrect"
            class="detail-item bonus"
          >
            <span class="detail-label">
              ✨ Bonus Points:
            </span>

            <span class="detail-value">
              +10
            </span>
          </div>

          <div class="detail-item">
            <span class="detail-label">
              Total Score:
            </span>

            <span class="detail-value total">
              {{ gameState.totalScore.value }}
            </span>
          </div>
        </div>

        <div
          v-if="allCorrect"
          class="completion-badge"
        >
          ⭐ Student Completed ⭐
        </div>
      </div>

      <div class="actions">
        <!-- <button
          @click="nextStudent"
          class="action-btn next-btn"
        >
          Next Student →
        </button> -->

        <button
          @click="viewLeaderboard"
          class="action-btn leaderboard-btn"
        >
          View Leaderboard 🏆
        </button>
      </div>

      <div class="back-option">
        <button
          @click="goHome"
          class="home-link"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.result-page {
  min-height: 100vh;
  padding: var(--spacing-lg);
  background: linear-gradient(
    135deg,
    var(--color-cyan) 0%,
    var(--color-pink) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
}

.result-container {
  max-width: 500px;
  width: 100%;
}

.result-header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.celebration {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-gold);
  animation: bounce 0.6s ease-in-out infinite;
}

.result-title {
  font-size: 2rem;
  color: var(--color-purple);
}

.result-card {
  background: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  border: 4px solid var(--color-purple);
  box-shadow: 0 8px 24px rgba(206, 106, 199, 0.2);
  margin-bottom: var(--spacing-lg);
}

.result-card h2 {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: 1.8rem;
}

.class-info {
  color: var(--color-gray-dark);
  margin: 0 0 var(--spacing-lg) 0;
  font-size: 0.95rem;
}

.score-section {
  text-align: center;
  padding: var(--spacing-lg);
  background: linear-gradient(
    135deg,
    rgba(206, 106, 199, 0.1),
    rgba(235, 169, 9, 0.1)
  );
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
}

.score-display {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.score-label {
  font-size: 0.9rem;
  color: var(--color-gray-dark);
}

.score-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-gold);
}

.results-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-md);
  background: var(--color-gray-light);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--color-gold);
}

.detail-item.bonus {
  background: linear-gradient(
    135deg,
    rgba(235, 169, 9, 0.1),
    rgba(241, 174, 216, 0.1)
  );
  border-left-color: var(--color-yellow);
}

.detail-label {
  font-weight: 600;
  color: var(--color-gray-dark);
}

.detail-value {
  font-weight: 700;
  color: var(--color-purple);
}

.detail-value.total {
  color: var(--color-gold);
  font-size: 1.1rem;
}

.completion-badge {
  text-align: center;
  padding: var(--spacing-md);
  background: linear-gradient(
    135deg,
    var(--color-yellow),
    var(--color-gold)
  );
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--color-white);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.action-btn {
  padding: var(--spacing-md);
  font-size: 1.1rem;
  font-weight: 700;
  border: 3px solid;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s ease;
}

.next-btn {
  background: linear-gradient(
    135deg,
    var(--color-gold),
    var(--color-yellow)
  );
  border-color: var(--color-gold);
  color: var(--color-white);
}

.next-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(235, 169, 9, 0.3);
}

.leaderboard-btn {
  background: linear-gradient(
    135deg,
    var(--color-purple),
    var(--color-pink)
  );
  border-color: var(--color-purple);
  color: var(--color-white);
}

.leaderboard-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(206, 106, 199, 0.3);
}

.back-option {
  text-align: center;
}

.home-link {
  background: var(--color-white);
  color: var(--color-purple);
  border: 2px solid var(--color-purple);
  padding: var(--spacing-sm) var(--spacing-md);
}

.home-link:hover {
  transform: translateX(-4px);
}

@media (max-width: 640px) {
  .result-card {
    padding: var(--spacing-lg);
  }

  .result-card h2 {
    font-size: 1.5rem;
  }

  .score-value {
    font-size: 2rem;
  }
}
</style>