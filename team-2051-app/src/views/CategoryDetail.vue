<template>
  <div class="category-detail-container">
    <h1>{{ categoryName }} Details</h1>

    <!-- Check if there are products in the category and display accordingly -->
    <div v-if="filteredProducts.length > 0">
      <table class="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Item Code</th>
            <th>Stock Size</th>
            <th>Store Availability</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in filteredProducts" :key="index">
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.itemCode }}</td>
            <td>{{ product.stockSize }}</td>
            <td>{{ product.storeAvailability }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No products found in this category.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['categoryName'], // Receive category name as a prop

  computed: {
    // Map Vuex getter to fetch products by category
    ...mapGetters(['productsByCategory']),

    // Use the productsByCategory getter to get products for the current category
    filteredProducts() {
      return this.productsByCategory(this.categoryName);
    }
  }
};
</script>

<style scoped>
.category-detail-container {
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.product-table th,
.product-table td {
  padding: 15px;
  text-align: left;
}

.product-table th {
  background-color: #5e2aa0;
  color: white;
}

.product-table td {
  border-bottom: 1px solid #ddd;
}
</style>
