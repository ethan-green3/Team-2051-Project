<template>
  <div class="categories-container">
    <div class="header-container">
      <h1>Categories</h1>
      <button class="add-category-button" @click="openModal">
        <i class="plus-icon">+</i> Add Category
      </button>
    </div>
    <p class="last-update">Last update: January 29, 2023 at 2:39PM</p>
    
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
      <!-- Universal Category -->
      <div 
        v-if="matchesSearch('Universal')" 
        class="category-card" 
        @click="navigateToCategory('Universal')"
      >
        <div class="category-icon">
          <img src="@/assets/universal-logo.png" alt="Universal Logo" class="category-logo" />
        </div>
        <div class="category-details">
        </div>
      </div>

      <!-- Repp Sports Category -->
      <div 
        v-if="matchesSearch('Repp Sports')" 
        class="category-card" 
        @click="navigateToCategory('Repp Sports')"
      >
        <div class="category-icon">
          <img src="@/assets/repp-logo.jpg" alt="Repp Sports Logo" class="category-logo" />
        </div>
        <div class="category-details">
        </div>
      </div>

      <div 
        v-if="matchesSearch('5% Nutrition')" 
        class="category-card" 
        @click="navigateToCategory('5% Nutrition')"
      >
        <div class="category-icon">
          <img src="@/assets/5percent-logo.png" alt="5% Logo" class="category-logo" />
        </div>
        <div class="category-details">
        </div>
      </div>

      <div 
        v-if="matchesSearch('Body Fx')" 
        class="category-card" 
        @click="navigateToCategory('Body Fx')"
      >
        <div class="category-icon">
          <img src="@/assets/bodyfx-logo.png" alt="5% Logo" class="category-logo" />
        </div>
        <div class="category-details">
        </div>
      </div>

      <div 
        v-if="matchesSearch('ABE' || 'All Black Everything')" 
        class="category-card" 
        @click="navigateToCategory('ABE')"
      >
        <div class="category-icon">
          <img src="@/assets/ABE-logo.jpg" alt="5% Logo" class="category-logo" />
        </div>
        <div class="category-details">
        </div>
      </div>

      <div 
        v-if="matchesSearch('ABL Pharma')" 
        class="category-card" 
        @click="navigateToCategory('ABL Pharma')"
      >
        <div class="category-icon">
          <img src="@/assets/ABL-logo.png" alt="5% Logo" class="category-logo" />
        </div>
        <div class="category-details">
        </div>
      </div>

      <div 
        v-if="matchesSearch('Adrenaline Nutrition')" 
        class="category-card" 
        @click="navigateToCategory('Adrenaline Nutrition')"
      >
        <div class="category-icon">
          <img src="@/assets/AdrenalineNutrition-logo.png" alt="5% Logo" class="category-logo" />
        </div>
        <div class="category-details">
        </div>
      </div>

      <div 
        v-if="matchesSearch('All American EFX')" 
        class="category-card" 
        @click="navigateToCategory('All American EFX')"
      >
        <div class="category-icon">
          <img src="@/assets/AllAmericanEFX-logo.png" alt="5% Logo" class="category-logo" />
        </div>
        <div class="category-details">
        </div>
      </div>

      
    

      <!-- Dynamically Added Categories -->
      <div 
        v-for="(category, index) in filteredCategories" 
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
  </div>
</template>

<script>
export default {
  name: 'CategoriesPage',
  data() {
    return {
      isModalOpen: false,
      newCategory: {
        name: '',
        items: '',
        logo: ''
      },
      categories: [],
      searchQuery: ''
    };
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  mounted() {
    this.loadCategories();
  },
  methods: {
    navigateToCategory(category) {
      this.$router.push({ name: 'CategoryDetail', params: { categoryName: category } });
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    submitCategory() {
      this.categories.push({ ...this.newCategory });
      localStorage.setItem('categories', JSON.stringify(this.categories)); // Save to local storage
      this.newCategory = { name: '', items: '', logo: '' };
      this.closeModal();
    },
    loadCategories() {
      const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
      this.categories = storedCategories;
    },
    matchesSearch(categoryName) {
      return categoryName.toLowerCase().includes(this.searchQuery.toLowerCase());
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

.last-update {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
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
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.category-logo {
  max-width: 150px;
  height: auto;
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
.cancel-button {
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
</style>
