<template>
  <div class="question-card slideIn">
    <div class="progress-section">
      <p class="progress-text">Question {{ questionNumber }} of {{ totalQuestions }}</p>
      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
      </div>
    </div>

    <div class="question-header">
      <h1 class="question-text">{{ question.question || question.text }}</h1>
      <p class="student-greeting">for {{ studentName }}</p>
    </div>

    <div class="options-container">
      <button
        v-for="(option, index) in question.options"
        :key="index"
        class="option-button"
        :class="['option-' + index]"
        @click="handleAnswer(option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  question: {
    type: Object,
    required: true,
    validator(value) {
      return (
        (typeof value.question === 'string' || typeof value.text === 'string') &&
        Array.isArray(value.options) &&
        value.options.length > 0 &&
        (typeof value.answer === 'string' || typeof value.correct === 'string')
      );
    },
  },
  studentName: {
    type: String,
    required: true,
  },
  questionNumber: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['answer']);

const progressPercent = Math.round((props.questionNumber / props.totalQuestions) * 100);

const handleAnswer = (option) => {
  emit('answer', option);
};
</script>

<style scoped>
.question-card {
  background: var(--color-white);
  border: 4px solid var(--color-gold);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: 0 8px 24px rgba(235, 169, 9, 0.2);
  animation: slideIn 0.5s ease-out;
}

.progress-section {
  margin-bottom: var(--spacing-xl);
}

.progress-text {
  font-size: 0.9rem;
  color: var(--color-purple);
  font-weight: 600;
  margin: 0 0 var(--spacing-sm);
  font-family: var(--font-primary);
}

.progress-bar-container {
  width: 100%;
  height: 8px;
  background: var(--color-gray-light);
  border-radius: 4px;
  overflow: hidden;
  border: 2px solid var(--color-purple);
}

.progress-bar {
  height: 100%;
  background: var(--gradient-primary);
  transition: width 0.3s ease;
}

.question-header {
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.question-text {
  margin: 0;
  font-size: 1.8rem;
  color: var(--color-gray-dark);
  font-family: var(--font-display);
  line-height: 1.3;
}

.student-greeting {
  margin: var(--spacing-sm) 0 0;
  font-size: 1rem;
  color: var(--color-pink);
  font-family: var(--font-primary);
  font-weight: 500;
}

.options-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  width: 100%;
}

.option-button {
  padding: var(--spacing-md);
  font-size: 1rem;
  font-weight: 600;
  border: 3px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-primary);
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  word-wrap: break-word;
}

.option-0 {
  background: var(--color-gold);
  color: var(--color-white);
  border-color: var(--color-gold);
}

.option-0:hover {
  transform: scale(1.05) translateY(-4px);
  box-shadow: 0 6px 12px rgba(235, 169, 9, 0.4);
}

.option-1 {
  background: var(--color-purple);
  color: var(--color-white);
  border-color: var(--color-purple);
}

.option-1:hover {
  transform: scale(1.05) translateY(-4px);
  box-shadow: 0 6px 12px rgba(206, 106, 199, 0.4);
}

.option-2 {
  background: var(--color-cyan);
  color: var(--color-gray-dark);
  border-color: var(--color-cyan);
}

.option-2:hover {
  transform: scale(1.05) translateY(-4px);
  box-shadow: 0 6px 12px rgba(194, 249, 248, 0.6);
}

.option-3 {
  background: var(--color-pink);
  color: var(--color-white);
  border-color: var(--color-pink);
}

.option-3:hover {
  transform: scale(1.05) translateY(-4px);
  box-shadow: 0 6px 12px rgba(241, 174, 216, 0.4);
}

.option-button:active {
  transform: scale(0.98);
}

.option-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .question-card {
    padding: var(--spacing-lg);
  }

  .question-text {
    font-size: 1.4rem;
  }

  .options-container {
    grid-template-columns: 1fr;
  }

  .option-button {
    min-height: 50px;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .question-card {
    padding: var(--spacing-md);
    border: 3px solid var(--color-gold);
  }

  .question-text {
    font-size: 1.2rem;
  }

  .student-greeting {
    font-size: 0.9rem;
  }
}
</style>
