<!-- Demo file showing how to use all 6 components -->
<template>
  <div class="demo-container">
    <h1>Saronida Quiz Game - Component Demo</h1>

    <!-- 1. StudentCard Demo -->
    <section class="demo-section">
      <h2>1. StudentCard</h2>
      <div class="demo-grid">
        <StudentCard
          :student="{ id: 1, name: 'Alice', avatar: null, class: '4A' }"
          :completed="false"
          :onSelect="handleStudentSelect"
        />
        <StudentCard
          :student="{ id: 2, name: 'Bob', avatar: null, class: '4B' }"
          :completed="true"
          :onSelect="handleStudentSelect"
        />
        <StudentCard
          :student="{ id: 3, name: 'Charlie', avatar: null, class: '4A' }"
          :completed="true"
          :onSelect="handleStudentSelect"
        />
      </div>
    </section>

    <!-- 2. QuestionCard Demo -->
    <section class="demo-section">
      <h2>2. QuestionCard</h2>
      <QuestionCard
        :question="{
          text: 'What is 2 + 2?',
          options: ['3', '4', '5', '6'],
          correct: '4',
        }"
        student-name="Alice"
        :question-number="1"
        :total-questions="10"
        @answer="handleAnswer"
      />
    </section>

    <!-- 3. LeaderboardTable Demo -->
    <section class="demo-section">
      <h2>3. LeaderboardTable</h2>
      <LeaderboardTable :scores="leaderboardScores" />
    </section>

    <!-- 4. ProgressBar Demo -->
    <section class="demo-section">
      <h2>4. ProgressBar</h2>
      <div style="max-width: 400px">
        <h3>50% Progress</h3>
        <ProgressBar :current="5" :total="10" />
      </div>
      <div style="max-width: 400px; margin-top: 2rem">
        <h3>100% Progress</h3>
        <ProgressBar :current="10" :total="10" />
      </div>
    </section>

    <!-- 5. CartoonButton Demo -->
    <section class="demo-section">
      <h2>5. CartoonButton</h2>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap">
        <CartoonButton text="Primary" variant="primary" @click="handleClick" />
        <CartoonButton text="Success" variant="success" @click="handleClick" />
        <CartoonButton text="Danger" variant="danger" @click="handleClick" />
        <CartoonButton text="Disabled" variant="primary" disabled @click="handleClick" />
      </div>
    </section>

    <!-- 6. UsernameModal Demo -->
    <section class="demo-section">
      <h2>6. UsernameModal</h2>
      <CartoonButton text="Open Modal" variant="success" @click="showModal = true" />
      <UsernameModal :show="showModal" @close="showModal = false" @submit="handleUsernameSubmit" />
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import StudentCard from './StudentCard.vue';
import QuestionCard from './QuestionCard.vue';
import LeaderboardTable from './LeaderboardTable.vue';
import ProgressBar from './ProgressBar.vue';
import CartoonButton from './CartoonButton.vue';
import UsernameModal from './UsernameModal.vue';

const showModal = ref(false);

const leaderboardScores = ref([
  { username: 'Alice', score: 950 },
  { username: 'Bob', score: 890 },
  { username: 'Charlie', score: 850 },
  { username: 'Diana', score: 820 },
  { username: 'Eve', score: 780 },
]);

const handleStudentSelect = (studentId) => {
  console.log('Student selected:', studentId);
};

const handleAnswer = (option) => {
  console.log('Answer selected:', option);
};

const handleClick = () => {
  console.log('Button clicked!');
};

const handleUsernameSubmit = (username) => {
  console.log('Username submitted:', username);
  showModal.value = false;
};
</script>

<style scoped>
.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-xl);
  background: var(--color-gray-light);
  min-height: 100vh;
}

h1 {
  text-align: center;
  font-family: var(--font-display);
  font-size: 2.5rem;
  color: var(--color-purple);
  margin: 0 0 var(--spacing-xl);
}

.demo-section {
  background: var(--color-white);
  border: 3px solid var(--color-purple);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.demo-section h2 {
  margin-top: 0;
  font-family: var(--font-display);
  color: var(--color-gold);
  font-size: 1.8rem;
}

.demo-section h3 {
  font-family: var(--font-primary);
  color: var(--color-purple);
  margin-top: 0;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  margin: var(--spacing-lg) 0;
}
</style>
