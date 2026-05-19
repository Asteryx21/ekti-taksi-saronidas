<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-backdrop" @click.self="$emit('close')">
        <div class="modal-container slideIn">
          <button class="close-button" @click="$emit('close')">✕</button>

          <div class="modal-header">
            <h2 class="modal-title">Enter Your Name</h2>
            <p class="modal-subtitle">Let's get started with the quiz!</p>
          </div>

          <form class="modal-form" @submit.prevent="handleSubmit">
            <input
              v-model="username"
              type="text"
              class="username-input"
              placeholder="Your awesome name"
              maxlength="30"
              @keyup.enter="handleSubmit"
            />

            <div class="button-group">
              <CartoonButton
                text="Cancel"
                variant="danger"
                @click="$emit('close')"
              />
              <CartoonButton
                text="Start Quiz"
                variant="success"
                :disabled="!username.trim()"
                @click="handleSubmit"
              />
            </div>
          </form>

          <div class="modal-footer">
            <p class="footer-text">Ready for some fun?</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import CartoonButton from './CartoonButton.vue';

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close', 'submit']);

const username = ref('');

const handleSubmit = () => {
  if (username.value.trim()) {
    emit('submit', username.value);
    username.value = '';
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-container {
  background: var(--color-white);
  border: 4px solid var(--color-gold);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  max-width: 400px;
  width: 90%;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  position: relative;
}

.close-button {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: var(--color-pink);
  border: 2px solid var(--color-pink);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--color-white);
  font-weight: bold;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  transform: rotate(90deg) scale(1.1);
  background: #e89bc5;
}

.modal-header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.modal-title {
  margin: 0 0 var(--spacing-sm);
  font-size: 1.6rem;
  font-family: var(--font-display);
  color: var(--color-gray-dark);
}

.modal-subtitle {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-purple);
  font-family: var(--font-primary);
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.username-input {
  padding: var(--spacing-md);
  font-size: 1rem;
  border: 3px solid var(--color-purple);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  transition: all 0.3s ease;
  background: var(--color-white);
  color: var(--color-gray-dark);
}

.username-input:focus {
  outline: none;
  border-color: var(--color-gold);
  box-shadow: 0 0 0 4px rgba(235, 169, 9, 0.2);
}

.username-input::placeholder {
  color: var(--color-gray-light);
}

.button-group {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

:deep(.cartoon-button) {
  flex: 1;
}

.modal-footer {
  text-align: center;
  padding-top: var(--spacing-md);
  border-top: 2px dashed var(--color-pink);
}

.footer-text {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-cyan);
  font-family: var(--font-primary);
  font-weight: 500;
}

.modal-enter-active {
  animation: slideIn 0.3s ease-out;
}

.modal-leave-active {
  animation: slideIn 0.3s ease-out reverse;
}

@media (max-width: 640px) {
  .modal-container {
    padding: var(--spacing-lg);
    border: 3px solid var(--color-gold);
  }

  .modal-title {
    font-size: 1.3rem;
  }

  .username-input {
    padding: var(--spacing-sm);
    font-size: 0.95rem;
  }

  .button-group {
    flex-direction: column;
  }

  :deep(.cartoon-button) {
    width: 100%;
  }
}
</style>
