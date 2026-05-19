<template>
  <div class="progress-bar-wrapper">
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: percentComplete + '%' }"></div>
    </div>
    <p class="progress-text">{{ percentComplete }}%</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  current: {
    type: Number,
    required: true,
    validator(value) {
      return value >= 0;
    },
  },
  total: {
    type: Number,
    required: true,
    validator(value) {
      return value >= 0;
    },
  },
});

const percentComplete = computed(() => {
  return Math.round((props.current / props.total) * 100);
});
</script>

<style scoped>
.progress-bar-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  width: 100%;
}

.progress-bar-container {
  width: 100%;
  height: 24px;
  background: var(--color-gray-light);
  border: 2px solid var(--color-purple);
  border-radius: var(--radius-sm);
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.progress-bar {
  height: 100%;
  background: var(--gradient-primary);
  width: 0%;
  transition: width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
}

.progress-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.progress-text {
  text-align: center;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-purple);
  margin: 0;
  font-family: var(--font-primary);
}

@media (max-width: 640px) {
  .progress-bar-container {
    height: 20px;
    border: 2px solid var(--color-purple);
  }

  .progress-text {
    font-size: 0.85rem;
  }
}
</style>
