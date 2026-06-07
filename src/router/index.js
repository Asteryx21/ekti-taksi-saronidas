import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
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
      path: '/students',
      name: 'StudentSelect',
      component: StudentSelectPage,
    },
    {
      path: '/select-class',
      redirect: '/students',
    },
    {
      path: '/students/:classId',
      redirect: '/students',
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
