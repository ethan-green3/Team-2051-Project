import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import DashboardPage from '../views/DashboardPage.vue';  // Ensure this is updated

const routes = [
  { path: '/', name: 'Login', component: LoginPage },
  { path: '/dashboard', name: 'DashboardPage', component: DashboardPage },  // Update the name here
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
