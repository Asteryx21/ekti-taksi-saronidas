<template>
  <button
    class="cartoon-button"
    :class="['variant-' + variant, { disabled: disabled }]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <span class="button-text">{{ text }}</span>
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'success', 'danger'].includes(value);
    },
  },
});

defineEmits(['click']);
</script>

<style scoped>
.cartoon-button {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: 1rem;
  font-weight: 700;
  font-family: var(--font-primary);
  border: 4px solid;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  transform-origin: center;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cartoon-button:hover:not(:disabled) {
  animation: bounce 0.6s ease-in-out;
  transform: translateY(-4px);
  box-shadow: 0 6px 0 rgba(0, 0, 0, 0.25);
}

.cartoon-button:active:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2);
}

.cartoon-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
}

.button-text {
  position: relative;
  z-index: 1;
}

/* Primary Variant */
.variant-primary {
  background: var(--color-purple);
  color: var(--color-white);
  border-color: #a04fa0;
}

.variant-primary:hover:not(:disabled) {
  background: #df76d9;
}

/* Success Variant */
.variant-success {
  background: var(--color-yellow);
  color: var(--color-gray-dark);
  border-color: #c1c11c;
}

.variant-success:hover:not(:disabled) {
  background: #f0f053;
}

/* Danger Variant */
.variant-danger {
  background: var(--color-pink);
  color: var(--color-white);
  border-color: #d98bc0;
}

.variant-danger:hover:not(:disabled) {
  background: #f5c5e3;
}

@media (max-width: 640px) {
  .cartoon-button {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 0.95rem;
    border: 3px solid;
  }

  .cartoon-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 0 rgba(0, 0, 0, 0.2);
  }

  .cartoon-button:active:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.15);
  }
}
</style>
