<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameState } from '../composables/useGameState'
import StudentCard from '../components/StudentCard.vue'
import studentsData from '../data/students.json'

const router = useRouter()
const gameState = useGameState()

const students = computed(() => studentsData)

const selectStudent = () => {
  gameState.startRandomQuiz()
  router.push('/quiz')
}

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="student-select-page">
    <div class="container">
      <header class="header">
        <button @click="goBack" class="back-button">← Back</button>
        <h1>Select a Student</h1>
        <p>{{ students.length }} students available</p>
      </header>

      <div class="student-grid">
        <StudentCard
          v-for="student in students"
          :key="student.id"
          :student="student"
          :onSelect="selectStudent"
        />
      </div>

      <div v-if="students.length === 0" class="no-students">
        <p>No students found.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.student-select-page {
  min-height: 100vh;
  padding: var(--spacing-lg);
  background: linear-gradient(135deg, var(--color-cyan) 0%, var(--color-pink) 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  margin-bottom: var(--spacing-xl);
}

.back-button {
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

.student-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--spacing-lg);
}

.no-students {
  text-align: center;
  padding: var(--spacing-xl);
  font-size: 1.1rem;
  color: var(--color-gray-dark);
}

@media (max-width: 768px) {
  .student-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .student-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
