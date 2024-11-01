import { createStore } from 'vuex';

export default createStore({
  state: {
    products: [
      // Sample products (you can remove these when you connect to a database)
      { name: 'Universal Protein', category: 'Universal', price: 29.99, description: 'High-quality protein', itemCode: 'UP123', stockSize: 50, storeAvailability: 'Available', productPhotos: '' },
      { name: 'Repp BCAA', category: 'Repp Sports', price: 19.99, description: 'BCAA for muscle recovery', itemCode: 'RB456', stockSize: 30, storeAvailability: 'Available', productPhotos: '' },
    ],
    categories: [
      // Sample categories (can also be removed later)
      { name: 'Universal', items: 10, logo: '@/assets/universal-logo.png' },
      { name: 'Repp Sports', items: 5, logo: '@/assets/repp-logo.jpg' },
    ],
  },
  getters: {
    // Get all products
    allProducts: (state) => state.products,

    // Get products by category
    productsByCategory: (state) => (categoryName) => {
      return state.products.filter(product => product.category === categoryName);
    },

    // Get all categories
    allCategories: (state) => state.categories,
  },
  mutations: {
    // Add a new product
    ADD_PRODUCT(state, product) {
      state.products.push(product);
    },

    // Add a new category
    ADD_CATEGORY(state, category) {
      state.categories.push(category);
    },

    // Update an existing product
    UPDATE_PRODUCT(state, updatedProduct) {
      const index = state.products.findIndex(product => product.itemCode === updatedProduct.itemCode);
      if (index !== -1) {
        state.products.splice(index, 1, updatedProduct);
      }
    },

    // Delete a product
    DELETE_PRODUCT(state, itemCode) {
      state.products = state.products.filter(product => product.itemCode !== itemCode);
    },

    // Delete a category
    DELETE_CATEGORY(state, categoryName) {
      state.categories = state.categories.filter(category => category.name !== categoryName);
    },
  },
  actions: {
    // Add a new product (simulates an async call)
    addProduct({ commit }, product) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('ADD_PRODUCT', product);
          resolve();
        }, 500); // Simulate a database delay
      });
    },

    // Add a new category
    addCategory({ commit }, category) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('ADD_CATEGORY', category);
          resolve();
        }, 500);
      });
    },

    // Update a product
    updateProduct({ commit }, updatedProduct) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('UPDATE_PRODUCT', updatedProduct);
          resolve();
        }, 500);
      });
    },

    // Delete a product
    deleteProduct({ commit }, itemCode) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('DELETE_PRODUCT', itemCode);
          resolve();
        }, 500);
      });
    },

    // Delete a category
    deleteCategory({ commit }, categoryName) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('DELETE_CATEGORY', categoryName);
          resolve();
        }, 500);
      });
    },
  },
  modules: {
    // You can add additional modules here if the store grows
  },
});
