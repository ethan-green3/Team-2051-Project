import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // Import the CSS for the notifications

const toastOptions = {
  position: 'bottom-right',
  timeout: 3000,
  hideProgressBar: true,
  closeButton: true,
  draggable: false,
  icon: '✅', // Custom icon
};

// Create the Vue app instance
const app = createApp(App);

// Use store, router, and toast in the app
app.use(store);
app.use(router);
app.use(Toast, toastOptions);

// Mount the app
app.mount('#app');
