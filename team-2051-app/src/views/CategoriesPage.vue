<template>
  <div class="categories-container">
    <div class="header-container">
      <button class="add-category-button" @click="openModal">
        <i class="plus-icon">+</i> Add Category
      </button>
    </div>

    <!-- Search Bar -->
    <div class="search-bar-container">
      <input 
        type="text" 
        v-model="searchQuery" 
        class="search-bar" 
        placeholder="Search categories..." 
      />
    </div>

    <!-- Display Filtered Categories -->
    <div class="categories-grid">
      <div 
        v-for="(category, index) in filteredCategories" 
        :key="index" 
        class="category-card"
      >
        <div class="category-icon">
          <img :src="category.logo" :alt="category.name + ' Logo'" class="category-logo" />
        </div>
        <div class="category-details">
          <h2>{{ category.name }}</h2>
          <p>{{ category.items }} items</p>
        </div>
        <div class="action-buttons">
          <button @click="navigateToCategory(category.name)" class="view-button">View</button>
          <button @click="openDeleteModal(category.name)" class="delete-button">Delete</button>
        </div>
      </div>
    </div>

    <!-- Modal for adding new category -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
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

    <!-- Confirmation Modal for Deletion -->
    <div v-if="isDeleteModalOpen" class="modal-overlay" @click="closeDeleteModal">
      <div class="modal-content" @click.stop>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete the category "{{ categoryToDelete }}"?</p>
        <div class="form-actions">
          <button @click="confirmDelete" class="confirm-button">Yes, Delete</button>
          <button @click="closeDeleteModal" class="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CategoriesPage',
  data() {
    return {
      isModalOpen: false,
      isDeleteModalOpen: false,
      categoryToDelete: null,
      searchQuery: '',
      newCategory: {
        name: '',
        items: '',
        logo: ''
      }
    };
  },
  computed: {
    ...mapState(['categories']),
    filteredCategories() {
      return this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    ...mapActions(['addCategory', 'deleteCategory']),
    navigateToCategory(categoryName) {
      this.$router.push({ name: 'CategoryDetail', params: { categoryName } });
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    submitCategory() {
      this.addCategory({ ...this.newCategory });
      this.newCategory = { name: '', items: '', logo: '' };
      this.closeModal();
    },
    openDeleteModal(categoryName) {
      this.categoryToDelete = categoryName;
      this.isDeleteModalOpen = true;
    },
    closeDeleteModal() {
      this.categoryToDelete = null;
      this.isDeleteModalOpen = false;
    },
    confirmDelete() {
      if (this.categoryToDelete) {
        this.deleteCategory(this.categoryToDelete);
        this.closeDeleteModal();
      }
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

.add-category-button {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #5e2aa0;
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

/* Search bar styles */
.search-bar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-bar {
  width: 50%;
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 25px;
  outline: none;
  transition: box-shadow 0.3s ease;
}

.search-bar:focus {
  box-shadow: 0 0 10px rgba(94, 42, 160, 0.5);
}

/* Categories grid and cards */
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
  position: relative;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.category-logo {
  max-width: 150px;
  height: auto;
}

.category-details {
  margin-top: 10px;
}

.action-buttons {
  display: none;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  gap: 10px;
}

.category-card:hover .action-buttons {
  display: flex;
}

.view-button,
.delete-button {
  background-color: #5e2aa0;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.delete-button {
  background-color: red;
}

/* Modal styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  max-width: 500px;
  width: 100%;
}

.form-group {
  margin-bottom: 15px;
  width: 475px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.save-button,
.cancel-button,
.confirm-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-button {
  background-color: #5e2aa0;
  color: white;
}

.cancel-button {
  background-color: #ccc;
}

.confirm-button {
  background-color: #d9534f;
  color: white;
}
</style>
