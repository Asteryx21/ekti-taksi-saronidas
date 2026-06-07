<template>
  <div class="student-card" @click="handleSelect">
    <div class="card-header">
      <div class="avatar">
        <img
          v-if="student.avatar"
          :src="student.avatar"
          :alt="student.name"
          class="avatar-img"
        />
        <span v-else class="avatar-placeholder">{{ student.name.charAt(0).toUpperCase() }}</span>
      </div>
      <div v-if="completed" class="completion-badge">✓</div>
    </div>

    <div class="card-body">
      <h3 class="student-name">{{ student.name }}</h3>
    </div>

    <div v-if="completed" class="stars">
      <span class="star">⭐</span>
      <span class="star">⭐</span>
      <span class="star">⭐</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  student: {
    type: Object,
    required: true,
    validator(value) {
      return (
        value.id !== undefined &&
        typeof value.name === 'string'
      )
    },
  },
  completed: {
    type: Boolean,
    default: false,
  },
  onSelect: {
    type: Function,
    required: true,
  },
})

const handleSelect = () => {
  props.onSelect(props.student.id)
}
</script>

<style scoped>
.student-card {
  background: var(--color-white);
  border: 3px solid var(--color-purple);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  position: relative;
}

.student-card:hover {
  animation: bounce 0.6s ease-in-out;
  box-shadow: 0 8px 16px rgba(206, 106, 199, 0.3);
  transform: translateY(-5px);
}

.student-card:active {
  transform: scale(0.98);
}

.card-header {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px solid var(--color-gold);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-white);
  font-family: var(--font-display);
}

.completion-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 32px;
  height: 32px;
  background: var(--color-gold);
  border: 2px solid var(--color-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-white);
  box-shadow: 0 2px 8px rgba(235, 169, 9, 0.4);
}

.card-body {
  text-align: center;
  width: 100%;
}

.student-name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-gray-dark);
  font-family: var(--font-primary);
}

.stars {
  display: flex;
  gap: var(--spacing-xs);
  justify-content: center;
  width: 100%;
  animation: bounce 0.8s ease-in-out;
}

.star {
  font-size: 1.2rem;
  animation: pulse 1.5s ease-in-out infinite;
}

@media (max-width: 640px) {
  .student-card {
    padding: var(--spacing-sm);
  }

  .avatar {
    width: 60px;
    height: 60px;
  }

  .avatar-placeholder {
    font-size: 1.5rem;
  }

  .student-name {
    font-size: 0.95rem;
  }
}
</style>
