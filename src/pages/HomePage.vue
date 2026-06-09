<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameState } from '../composables/useGameState'

const router = useRouter()
const gameState = useGameState()
const username = ref(gameState.username.value)
const error = ref('')

const canStart = computed(() => username.value.trim().length >= 2)

const goToLeaderboard = () => {
  router.push('/leaderboard')
}

const startGame = () => {
  error.value = ''

  if (!canStart.value) {
    error.value = 'Username must be at least 2 characters'
    return
  }

  gameState.setUsername(username.value.trim())
  gameState.startRandomQuiz()
  router.push('/quiz')
}

const handleKeyup = (e) => {
  if (e.key === 'Enter' && canStart.value) {
    startGame()
  }
}
</script>

<template>
  <div class="home-page">
    <div class="content">
      <div class="header">
        <h2 class="title">🎮 ΣT ' 1 Quiz Game</h2>
      </div>

      <div class="form-container">
        <div class="form-group">
          <input
            v-model="username"
            type="text"
            placeholder="Enter your username"
            class="username-input"
            maxlength="20"
            @keyup="handleKeyup"
            autocomplete="off"
          />
          <p v-if="error" class="error-message">{{ error }}</p>
          <p class="char-count">{{ username.length }}/20</p>
        </div>

        <button
          @click="startGame"
          :disabled="!canStart"
          class="start-button"
        >
          Start Game 🚀
        </button>
      </div>

      <div class="info" @click="goToLeaderboard">
        <div class="info-item">
          <span>🏆 Leaderboard</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--spacing-md);
  background: linear-gradient(135deg, var(--color-cyan) 0%, var(--color-pink) 100%);
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
  max-width: 500px;
  width: 100%;
}

.header {
  text-align: center;
}

.title {
  font-size: 3rem;
  margin-bottom: var(--spacing-sm);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 1.2rem;
  color: var(--color-gray-dark);
}

.form-container {
  width: 100%;
  background: var(--color-white);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 4px solid var(--color-purple);
  box-shadow: 0 8px 24px rgba(206, 106, 199, 0.2);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.username-input {
  width: 100%;
  padding: var(--spacing-md);
  font-size: 1.1rem;
  border: 3px solid var(--color-gold);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  transition: all 0.3s ease;
}

.username-input:focus {
  outline: none;
  border-color: var(--color-purple);
  box-shadow: 0 0 12px rgba(206, 106, 199, 0.3);
  transform: scale(1.02);
}

.error-message {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: var(--spacing-xs);
}

.char-count {
  color: var(--color-gray-dark);
  font-size: 0.85rem;
  margin-top: var(--spacing-xs);
  text-align: right;
}

.start-button {
  width: 100%;
  padding: var(--spacing-md);
  font-size: 1.2rem;
  font-weight: 700;
  border: 3px solid var(--color-purple);
  transition: all 0.3s ease;
}

.start-button:not(:disabled) {
  cursor: pointer;
}

.start-button:not(:disabled):hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(235, 169, 9, 0.4);
}

.start-button:not(:disabled):active {
  transform: translateY(-2px);
}

.start-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  width: 100%;
}

.info-item {
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(255, 255, 255, 0.8);
  border-left: 4px solid var(--color-gold);
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  text-align: center;
}

@media (max-width: 640px) {
  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .content {
    gap: var(--spacing-md);
  }

  .form-container {
    padding: var(--spacing-md);
  }
}
</style>
