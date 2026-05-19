<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLeaderboard } from '../composables/useLeaderboard'
import { useGameState } from '../composables/useGameState'
import LeaderboardTable from '../components/LeaderboardTable.vue'

const router = useRouter()
const leaderboard = useLeaderboard()
const gameState = useGameState()

const playerRank = computed(() => {
  return leaderboard.getPlayerRank(gameState.username.value)
})

onMounted(() => {
  leaderboard.refresh()
})

const playAgain = () => {
  router.push('/')
}
</script>

<template>
  <div class="leaderboard-page">
    <div class="container">
      <header class="header">
        <h1>🏆 Leaderboard</h1>
        <p class="subtitle">Top Scores</p>
      </header>

      <div v-if="leaderboard.sorted.value.length" class="leaderboard-wrapper">
        <LeaderboardTable :scores="leaderboard.sorted.value" />

        <div v-if="playerRank" class="player-info">
          <div class="player-stats">
            <span class="player-rank">Your Rank: <strong>#{{ playerRank }}</strong></span>
            <span class="player-score">Score: <strong>{{ gameState.totalScore.value }}</strong></span>
          </div>
        </div>
      </div>

      <div v-else class="no-scores">
        <p>No scores yet. Be the first to play! 🚀</p>
      </div>

      <div class="actions">
        <button @click="playAgain" class="play-btn">
          Play Again 🎮
        </button>
        <button @click="$router.push('/')" class="home-btn">
          Home
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.leaderboard-page {
  min-height: 100vh;
  padding: var(--spacing-lg);
  background: linear-gradient(135deg, var(--color-cyan) 0%, var(--color-pink) 100%);
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-sm);
}

.subtitle {
  font-size: 1.1rem;
  color: var(--color-gray-dark);
}

.leaderboard-wrapper {
  background: var(--color-white);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 4px solid var(--color-purple);
  box-shadow: 0 8px 24px rgba(206, 106, 199, 0.2);
  margin-bottom: var(--spacing-lg);
}

.player-info {
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 2px solid var(--color-gray-light);
}

.player-stats {
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 1rem;
  color: var(--color-purple);
}

.player-rank,
.player-score {
  font-weight: 600;
}

.no-scores {
  text-align: center;
  padding: var(--spacing-xl);
  background: var(--color-white);
  border-radius: var(--radius-lg);
  border: 4px solid var(--color-purple);
  font-size: 1.1rem;
  margin-bottom: var(--spacing-lg);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.play-btn,
.home-btn {
  padding: var(--spacing-md);
  font-size: 1.1rem;
  font-weight: 700;
  border: 3px solid;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s ease;
}

.play-btn {
  background: linear-gradient(135deg, var(--color-gold), var(--color-yellow));
  border-color: var(--color-gold);
  color: var(--color-white);
}

.play-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(235, 169, 9, 0.3);
}

.home-btn {
  background: var(--color-white);
  color: var(--color-purple);
  border-color: var(--color-purple);
}

.home-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(206, 106, 199, 0.3);
}

@media (max-width: 640px) {
  .header h1 {
    font-size: 2rem;
  }

  .leaderboard-wrapper {
    padding: var(--spacing-md);
  }
}
</style>
