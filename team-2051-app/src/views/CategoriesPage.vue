<template>
    <div class="categories-container">
      <h1>Categories</h1>
      <div class="categories-grid">
        <div class="category-card" @click="navigateToCategory('Universal')">
          <div class="category-icon"> <!-- You can replace this with an actual icon -->
            <i class="icon-placeholder">👕</i> <!-- Example icon -->
          </div>
          <div class="category-details">
            <h2>Universal</h2>
            <p>49 items</p> <!-- Example item count -->
          </div>
        </div>
  
        <div class="category-card" @click="navigateToCategory('Repp Sports')">
          <div class="category-icon">
            <i class="icon-placeholder">🎽</i> <!-- Example icon -->
          </div>
          <div class="category-details">
            <h2>Repp Sports</h2>
            <p>30 items</p> <!-- Example item count -->
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CategoriesPage',
    methods: {
      navigateToCategory(category) {
        // Example logic to navigate to the selected category
        console.log(`Navigating to ${category}`);
        // You can implement real navigation logic here
      }
    }
  };
  </script>
  
  <style scoped>
  .categories-container {
    padding: 20px;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
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
  
  .category-icon {
    font-size: 3rem;
    color: #5e2aa0; /* Use your theme color */
    margin-bottom: 10px;
  }
  
  .category-details h2 {
    font-size: 1.5rem;
    color: #333;
  }
  
  .category-details p {
    font-size: 1rem;
    color: #666;
  }
  </style>
  