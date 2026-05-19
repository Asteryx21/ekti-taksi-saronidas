import { ref, computed } from 'vue'

export function useLeaderboard() {
  const scores = ref(JSON.parse(localStorage.getItem('leaderboard') || '[]'))

  const sorted = computed(() => {
    return [...scores.value].sort((a, b) => b.score - a.score)
  })

  const addScore = (username, points) => {
    const existing = scores.value.find(s => s.username === username)
    if (existing) {
      existing.score += points
    } else {
      scores.value.push({ username, score: points })
    }
    localStorage.setItem('leaderboard', JSON.stringify(scores.value))
  }

  const refresh = () => {
    scores.value = JSON.parse(localStorage.getItem('leaderboard') || '[]')
  }

  const getPlayerRank = (username) => {
    const sortedPlayers = sorted.value
    const rankIndex = sortedPlayers.findIndex(s => s.username === username)
    return rankIndex >= 0 ? rankIndex + 1 : null
  }

  const getTopPlayers = (limit = 10) => {
    return sorted.value.slice(0, limit)
  }

  const getTotalPlayers = () => {
    return scores.value.length
  }

  return {
    scores,
    sorted,
    addScore,
    refresh,
    getPlayerRank,
    getTopPlayers,
    getTotalPlayers,
  }
}
