<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const selectClass = (classId) => {
  router.push(`/students/${classId}`)
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="class-select-page">
    <div class="container">
      <header class="header">
        <button @click="goHome" class="back-button">← Home</button>
        <h1>Choose Your Class</h1>
        <p>Select a class to see the students</p>
      </header>

      <div class="class-grid">
        <div 
          @click="selectClass('A')" 
          class="class-card class-a"
        >
          <div class="class-label">Class A</div>
          <div class="class-info">20 Students</div>
          <div class="class-emoji">🟡</div>
        </div>

        <div 
          @click="selectClass('B')" 
          class="class-card class-b"
        >
          <div class="class-label">Class B</div>
          <div class="class-info">20 Students</div>
          <div class="class-emoji">🟣</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.class-select-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--spacing-md);
  background: linear-gradient(135deg, var(--color-cyan) 0%, var(--color-pink) 100%);
}

.container {
  width: 100%;
  max-width: 600px;
}

.header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.back-button {
  align-self: flex-start;
  background: var(--color-white);
  color: var(--color-purple);
  border: 2px solid var(--color-purple);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 1rem;
  margin-bottom: var(--spacing-md);
}

.back-button:hover {
  transform: translateX(-4px);
}

h1 {
  margin-bottom: var(--spacing-sm);
}

.header p {
  font-size: 1.1rem;
  color: var(--color-gray-dark);
}

.class-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
}

.class-card {
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  border: 4px solid;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  min-height: 250px;
  background: var(--color-white);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.class-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.class-card:active {
  transform: translateY(-4px);
}

.class-a {
  border-color: var(--color-gold);
}

.class-a:hover {
  background: rgba(235, 169, 9, 0.05);
}

.class-b {
  border-color: var(--color-purple);
}

.class-b:hover {
  background: rgba(206, 106, 199, 0.05);
}

.class-label {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--color-purple);
}

.class-info {
  font-size: 0.95rem;
  color: var(--color-gray-dark);
  font-weight: 600;
}

.class-emoji {
  font-size: 3rem;
}

@media (max-width: 640px) {
  .class-grid {
    grid-template-columns: 1fr;
  }

  .class-card {
    min-height: 180px;
    padding: var(--spacing-lg);
  }

  .class-label {
    font-size: 1.5rem;
  }

  .class-emoji {
    font-size: 2.5rem;
  }
}
</style>
