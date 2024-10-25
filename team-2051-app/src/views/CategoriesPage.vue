<template>
  <div class="categories-container">
    <div class="header-container">
      <h1>Categories</h1>
      <button class="add-category-button" @click="openModal">
        <i class="plus-icon">+</i> Add Category
      </button>
    </div>
    <p class="last-update">Last update: January 29, 2023 at 2:39PM</p>
    
    <div class="categories-grid">
      <!-- Predefined Universal Category -->
      <div class="category-card" @click="navigateToCategory('Universal')">
        <div class="category-icon">
          <img src="@/assets/universal-logo.png" alt="Universal Logo" class="category-logo" />
        </div>
        <div class="category-details">
          <h2>Universal</h2>
          <p>49 items</p>
        </div>
      </div>

      <!-- Predefined Repp Sports Category -->
      <div class="category-card" @click="navigateToCategory('Repp Sports')">
        <div class="category-icon">
          <img src="@/assets/repp-logo.jpg" alt="Repp Sports Logo" class="category-logo" />
        </div>
        <div class="category-details">
          <h2>Repp Sports</h2>
          <p>30 items</p>
        </div>
      </div>

      <!-- Dynamically generated categories -->
      <div 
        v-for="(category, index) in categories" 
        :key="index" 
        class="category-card" 
        @click="navigateToCategory(category.name)"
      >
        <div class="category-icon">
          <img :src="category.logo" :alt="category.name + ' Logo'" class="category-logo" />
        </div>
        <div class="category-details">
          <h2>{{ category.name }}</h2>
          <p>{{ category.items }} items</p>
        </div>
      </div>
    </div>

    <!-- Modal for adding new category -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h2>Add New Category</h2>
        <form @submit.prevent="submitCategory">
          <div class="form-group">
            <label for="vendorName">Vendor Name:</label>
            <input v-model="newCategory.name" type="text" id="vendorName" required />
          </div>
          <div class="form-group">
            <label for="vendorItems">Number of Items:</label>
            <input v-model="newCategory.items" type="number" id="vendorItems" required />
          </div>
          <div class="form-group">
            <label for="vendorLogo">Vendor Logo URL:</label>
            <input v-model="newCategory.logo" type="text" id="vendorLogo" required />
          </div>
          <div class="form-actions">
            <button type="submit" class="save-button">Save</button>
            <button type="button" class="cancel-button" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoriesPage',
  data() {
    return {
      isModalOpen: false, // Modal visibility
      newCategory: {
        name: '',
        items: '',
        logo: ''
      },
      categories: [] // Array to store new categories
    };
  },
  methods: {
    navigateToCategory(category) {
      console.log(`Navigating to ${category}`);
      // Add logic to navigate to item list for the selected category
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    submitCategory() {
      // Add new category to categories array
      this.categories.push({ ...this.newCategory });

      // Clear the form and close modal
      this.newCategory = { name: '', items: '', logo: '' };
      this.closeModal();
    }
  }
};
</script>

<style scoped>
/* General container styles */
.categories-container {
  padding: 20px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.add-category-button {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #5e2aa0; /* Purple button color */
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-category-button:hover {
  background-color: #4b1e7a;
}

.plus-icon {
  margin-right: 5px;
}

.last-update {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.category-card {
  background-color: #f7f9fc;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.category-logo {
  max-width: 150px; /* Adjust size as needed */
  height: auto;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-content h2 {
  margin-top: 0;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.save-button, .cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-button {
  background-color: #5e2aa0;
  color: white;
}

.save-button:hover {
  background-color: #4b1e7a;
}

.cancel-button {
  background-color: #ccc;
}

.cancel-button:hover {
  background-color: #999;
}
</style>
