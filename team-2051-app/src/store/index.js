// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    // Initial in-memory data for products and categories (can be removed when connected to a database)
    products: [
      { 
        name: 'Universal Protein', 
        category: 'Universal', 
        price: 29.99, 
        description: 'High-quality protein', 
        itemCode: 'UP123', 
        stockSize: 50, 
        storeAvailability: 'Available', 
        productPhotos: '' 
      },
      { 
        name: 'Repp BCAA', 
        category: 'Repp Sports', 
        price: 19.99, 
        description: 'BCAA for muscle recovery', 
        itemCode: 'RB456', 
        stockSize: 30, 
        storeAvailability: 'Available', 
        productPhotos: '' 
      },
    ],
    categories: [
      { name: 'Universal', items: 10, logo: '@/assets/universal-logo.png' },
      { name: 'Repp Sports', items: 5, logo: '@/assets/repp-logo.jpg' },
    ],
  },
  
  getters: {
    // Retrieve all products
    allProducts: (state) => state.products,

    // Retrieve products by a specific category
    productsByCategory: (state) => (categoryName) => {
      return state.products.filter(product => product.category === categoryName);
    },

    // Retrieve all categories
    allCategories: (state) => state.categories,

    // Total number of products
    totalProductsCount(state) {
      return state.products.length;
    },

    // Total available stock across all products
    totalAvailableStock(state) {
      return state.products.reduce((total, product) => total + parseInt(product.stockSize), 0);
    },

    // Count of low stock items (e.g., stock size below 5)
    lowStockItemsCount(state) {
      return state.products.filter(product => parseInt(product.stockSize) < 5).length;
    },

    // List of recently added products (last 5 products)
    recentProductsList(state) {
      return [...state.products].slice(-5).reverse();
    },

    // List of products with low stock
    lowStockListItems(state) {
      return state.products.filter(product => parseInt(product.stockSize) < 5);
    },

    // Overview of categories with item counts
    categoriesOverviewList(state) {
      const categoryCounts = state.products.reduce((counts, product) => {
        counts[product.category] = (counts[product.category] || 0) + 1;
        return counts;
      }, {});
      return Object.keys(categoryCounts).map(category => ({
        name: category,
        itemCount: categoryCounts[category],
      }));
    },
  },
  
  mutations: {
    // Add a new product to the state
    ADD_PRODUCT(state, product) {
      state.products.push(product);
    },

    // Add a new category to the state
    ADD_CATEGORY(state, category) {
      state.categories.push(category);
    },

    // Update an existing product in the state
    UPDATE_PRODUCT(state, updatedProduct) {
      const index = state.products.findIndex(product => product.itemCode === updatedProduct.itemCode);
      if (index !== -1) {
        state.products.splice(index, 1, updatedProduct);
      }
    },

    // Delete a product from the state by itemCode
    DELETE_PRODUCT(state, itemCode) {
      state.products = state.products.filter(product => product.itemCode !== itemCode);
    },

    // Delete a category from the state by name
    DELETE_CATEGORY(state, categoryName) {
      state.categories = state.categories.filter(category => category.name !== categoryName);
    },
  },
  
  actions: {
    // Add a new product (simulates an asynchronous call, such as a database operation)
    addProduct({ commit }, product) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('ADD_PRODUCT', product);
          resolve();
        }, 500); // Simulate a delay
      });
    },

    // Add a new category (simulates an async operation)
    addCategory({ commit }, category) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('ADD_CATEGORY', category);
          resolve();
        }, 500);
      });
    },

    // Update an existing product (simulated async operation)
    updateProduct({ commit }, updatedProduct) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('UPDATE_PRODUCT', updatedProduct);
          resolve();
        }, 500);
      });
    },

    // Delete a product by itemCode (simulated async operation)
    deleteProduct({ commit }, itemCode) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('DELETE_PRODUCT', itemCode);
          resolve();
        }, 500);
      });
    },

    // Delete a category by name (simulated async operation)
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
    // Additional Vuex modules can be added here if needed as the app grows
  }
});
