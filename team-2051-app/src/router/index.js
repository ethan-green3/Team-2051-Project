import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import CategoriesPage from '@/views/CategoriesPage.vue';
import AddProduct from '../views/AddProduct.vue';
import CategoryDetail from '@/views/CategoryDetail.vue'; // Import CategoryDetail
import DashboardPage from '@/views/DashboardPage.vue'; // Import DashboardPage or placeholder component
import ProductsPage from '@/views/ProductsPage.vue';
import SettingsPage from '@/views/SettingsPage.vue';

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: DashboardPage, // Assign the correct component
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
  },
  {
    path: '/products',
    name: 'ProductsPage',
    component: ProductsPage, // Add the Products page route
  },
  {
    path: '/category/:categoryName', // Dynamic route for category pages
    name: 'CategoryDetail',
    component: CategoryDetail,
    props: true, // Pass route params as props to the component
  },
  {
    path: '/settings',
    name: 'SettingsPage',
    component: SettingsPage,
  },
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
