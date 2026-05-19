import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ClassSelectPage from '../pages/ClassSelectPage.vue'
import StudentSelectPage from '../pages/StudentSelectPage.vue'
import QuizPage from '../pages/QuizPage.vue'
import ResultPage from '../pages/ResultPage.vue'
import LeaderboardPage from '../pages/LeaderboardPage.vue'

const router = createRouter({
  history: createWebHashHistory(),

  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/select-class',
      name: 'ClassSelect',
      component: ClassSelectPage,
    },
    {
      path: '/students/:classId',
      name: 'StudentSelect',
      component: StudentSelectPage,
    },
    {
      path: '/quiz/:studentId',
      name: 'Quiz',
      component: QuizPage,
    },
    {
      path: '/result',
      name: 'Result',
      component: ResultPage,
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: LeaderboardPage,
    },
  ],
})

export default router