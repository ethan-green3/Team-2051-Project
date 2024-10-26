<template>
  <div class="products-container">
    <h1>Product List</h1>
    
    <!-- Search Bar -->
    <div class="search-bar-container">
      <input 
        type="text" 
        v-model="searchQuery" 
        class="search-bar" 
        placeholder="Search Products..." 
      />
    </div>

    <div v-if="filteredProducts.length">
      <table class="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Item Code</th>
            <th>Stock Size</th>
            <th>Store Availability</th>
            <th>Product Photo</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in filteredProducts" :key="index">
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.itemCode }}</td>
            <td>{{ product.stockSize }}</td>
            <td>{{ product.storeAvailability }}</td>
            <td>
              <img v-if="product.productPhotos" :src="product.productPhotos" alt="Product photo" class="product-photo" />
            </td>
            <td>
              <button class="delete-button" @click="deleteProduct(index)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No products match your search criteria.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsPage',
  data() {
    return {
      products: [],
      searchQuery: ''
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      this.products = storedProducts;
    },
    deleteProduct(index) {
      this.products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  }
};
</script>

<style scoped>
.products-container {
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

/* Search bar styling */
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

/* Table styling */
.product-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f7f9fc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.product-table th, .product-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.product-table th {
  background-color: #5e2aa0;
  color: white;
  font-weight: bold;
}

.product-table tr:hover {
  background-color: #f1f1f1;
}

.product-photo {
  max-width: 50px;
  height: auto;
  border-radius: 5px;
}

/* Delete button styling */
.delete-button {
  padding: 5px 10px;
  color: white;
  background-color: red;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: darkred;
}
</style>
