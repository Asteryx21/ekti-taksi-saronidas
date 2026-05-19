<template>
  <div class="leaderboard-container">
    <table class="leaderboard-table">
      <thead>
        <tr class="table-header">
          <th class="rank-col">Rank</th>
          <th class="name-col">Player</th>
          <th class="score-col">Score</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(entry, index) in sortedScores"
          :key="index"
          class="table-row"
          :class="['rank-' + (index + 1)]"
        >
          <td class="rank-cell">
            <span class="medal">{{ getMedal(index) }}</span>
            <span class="rank-number">{{ index + 1 }}</span>
          </td>
          <td class="name-cell">{{ entry.username }}</td>
          <td class="score-cell">{{ entry.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  scores: {
    type: Array,
    required: true,
    validator(value) {
      return Array.isArray(value) && value.every(
        (item) => typeof item.username === 'string' && typeof item.score === 'number'
      );
    },
  },
});

const sortedScores = computed(() => {
  return [...props.scores].sort((a, b) => b.score - a.score);
});

const getMedal = (index) => {
  const medals = ['🥇', '🥈', '🥉'];
  return medals[index] || '•';
};
</script>

<style scoped>
.leaderboard-container {
  background: var(--color-white);
  border: 3px solid var(--color-purple);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  box-shadow: 0 4px 16px rgba(206, 106, 199, 0.15);
  overflow-x: auto;
}

.leaderboard-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-primary);
}

.table-header {
  background: var(--gradient-primary);
  color: var(--color-white);
}

.table-header th {
  padding: var(--spacing-md);
  text-align: left;
  font-weight: 700;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.rank-col {
  width: 15%;
}

.name-col {
  width: 50%;
}

.score-col {
  width: 35%;
  text-align: right;
}

.table-row {
  border-bottom: 2px solid var(--color-gray-light);
  transition: all 0.3s ease;
  animation: slideIn 0.5s ease-out;
}

.table-row:hover {
  background: var(--color-gray-light);
  transform: translateX(4px);
}

.rank-1 {
  background: rgba(235, 169, 9, 0.1);
}

.rank-1:hover {
  background: rgba(235, 169, 9, 0.2);
}

.rank-2 {
  background: rgba(206, 106, 199, 0.05);
}

.rank-2:hover {
  background: rgba(206, 106, 199, 0.1);
}

.rank-3 {
  background: rgba(194, 249, 248, 0.1);
}

.rank-3:hover {
  background: rgba(194, 249, 248, 0.2);
}

.rank-cell,
.name-cell,
.score-cell {
  padding: var(--spacing-md);
}

.rank-cell {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: 600;
}

.medal {
  font-size: 1.4rem;
  display: inline-block;
}

.rank-number {
  color: var(--color-gray-dark);
  font-family: var(--font-display);
  font-size: 1.1rem;
}

.rank-1 .rank-number {
  color: var(--color-gold);
  font-weight: 900;
}

.name-cell {
  font-weight: 600;
  color: var(--color-gray-dark);
}

.rank-1 .name-cell {
  color: var(--color-gold);
}

.score-cell {
  text-align: right;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--color-purple);
}

.rank-1 .score-cell {
  color: var(--color-gold);
  font-size: 1.2rem;
}

.table-row:last-child {
  border-bottom: none;
}

@media (max-width: 640px) {
  .leaderboard-container {
    padding: var(--spacing-sm);
  }

  .table-header th,
  .rank-cell,
  .name-cell,
  .score-cell {
    padding: var(--spacing-sm);
    font-size: 0.85rem;
  }

  .medal {
    font-size: 1.2rem;
  }

  .rank-number {
    font-size: 0.95rem;
  }

  .score-cell {
    font-size: 0.95rem;
  }
}
</style>
