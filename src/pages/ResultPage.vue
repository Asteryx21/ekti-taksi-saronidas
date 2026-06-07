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
  border-left-color: var(--color-purple);
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
  font-size: 1.2rem;
  color: var(--color-gold);
}

.completion-badge {
  text-align: center;
  padding: var(--spacing-md);
  background: linear-gradient(135deg, var(--color-gold), var(--color-pink));
  color: var(--color-white);
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: var(--radius-md);
  animation: pulse 1.5s ease-in-out infinite;
}

.actions {
  margin-bottom: var(--spacing-md);
}

.action-btn {
  width: 100%;
  padding: var(--spacing-md);
  font-size: 1.1rem;
  font-weight: 700;
  border: 3px solid var(--color-purple);
}

.leaderboard-btn {
  background: var(--color-white);
  color: var(--color-purple);
}

.home-link {
  width: 100%;
  background: transparent;
  color: var(--color-purple);
  padding: var(--spacing-sm);
  font-size: 0.95rem;
}

@media (max-width: 640px) {
  .result-page {
    padding: var(--spacing-md);
  }

  .result-card {
    padding: var(--spacing-lg);
  }

  .celebration,
  .result-title {
    font-size: 1.6rem;
  }

  .score-value {
    font-size: 2rem;
  }

  .detail-item {
    flex-direction: column;
    gap: var(--spacing-xs);
  }
}
</style>
