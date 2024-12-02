import { createStore } from 'vuex';
import axios from 'axios'; // Import axios for API calls

export default createStore({
  state: {
    products: [], // Initially empty; will be populated from the server
    categories: [], // Fetch categories dynamically if needed
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
      return state.products.reduce((total, product) => total + parseInt(product.stockSize || 0), 0);
    },

    // Count of low stock items (e.g., stock size below 5)
    lowStockItemsCount(state) {
      return state.products.filter(product => parseInt(product.stockSize || 0) < 5).length;
    },

    // List of recently added products (last 5 products)
    recentProductsList(state) {
      return [...state.products].slice(-5).reverse();
    },

    // List of products with low stock
    lowStockListItems(state) {
      return state.products.filter(product => parseInt(product.stockSize || 0) < 5);
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
    // Set products in the state
    SET_PRODUCTS(state, products) {
      state.products = products;
    },

    // Set categories in the state
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },

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
    DELETE_PRODUCT(state, sku) {
      state.products = state.products.filter(product => product.sku !== sku);
    },

    // Delete a category from the state by name
    DELETE_CATEGORY(state, categoryName) {
      state.categories = state.categories.filter(category => category.name !== categoryName);
    },
  },

  actions: {
    // Fetch products from the server
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('http://localhost:8080/products');
        console.log('Server Response for Products:', response.data); // Replace with your backend URL
        commit('SET_PRODUCTS', response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },

    // Fetch categories from the server (if needed)
    async fetchCategories({ commit }) {
      try {
        const response = await axios.get('http://localhost:8080/categories'); // Replace with your backend URL
        commit('SET_CATEGORIES', response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },

    // Add a new product (simulated async operation)
    async addProduct({ commit }, product) {
      try {
        const response = await axios.post('http://localhost:8080/products', product); // Replace with your backend URL
        commit('ADD_PRODUCT', response.data);
      } catch (error) {
        console.error('Error adding product:', error);
      }
    },

    // Add a new category (simulated async operation)
    async addCategory({ commit }, category) {
      try {
        const response = await axios.post('http://localhost:8080/categories', category); // Replace with your backend URL
        commit('ADD_CATEGORY', response.data);
      } catch (error) {
        console.error('Error adding category:', error);
      }
    },

    // Update an existing product
    async updateProduct({ commit }, updatedProduct) {
      try {
        const response = await axios.put(`http://localhost:8080/products/${updatedProduct.itemCode}`, updatedProduct); // Replace with your backend URL
        commit('UPDATE_PRODUCT', response.data);
      } catch (error) {
        console.error('Error updating product:', error);
      }
    },

    // Delete a product by itemCode
    async deleteProduct({ commit }, itemCode) {
      try {
        await axios.delete(`http://localhost:8080/products/${itemCode}`); // Replace with your backend URL
        commit('DELETE_PRODUCT', itemCode);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },

    // Delete a category by name
    async deleteCategory({ commit }, categoryName) {
      try {
        await axios.delete(`localhost:8080/categories/${categoryName}`); // Replace with your backend URL
        commit('DELETE_CATEGORY', categoryName);
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    },
  },

  modules: {
    // Additional Vuex modules can be added here if needed as the app grows
  },
});
