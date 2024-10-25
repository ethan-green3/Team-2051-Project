import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import CategoriesPage from '@/views/CategoriesPage.vue';
import AddProduct from '../views/AddProduct.vue';

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/dashboard',
    name: 'DashboardPage',
  },

  {
    path: '/categories',
    name: 'CategoriesPage',
    component: CategoriesPage,
  },
  
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProduct,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation Guard to protect routes
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (!isLoggedIn && to.name !== 'LoginPage') {
    // Redirect to login if not logged in and trying to access another page
    next({ name: 'LoginPage' });
  } else {
    // Continue to the requested route
    next();
  }
});

export default router;
