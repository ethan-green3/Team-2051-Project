<template>
  <div class="products-container">
    <div class="header-container">
      <h1 class="products-title">Product Management</h1>
      <!-- Refresh Button -->
      <button class="refresh-button" @click="refreshPage">Refresh</button>
    </div>

    <!-- Search Bar -->
    <div class="search-bar-container">
      <input
        type="text"
        v-model="searchQuery"
        class="search-bar"
        placeholder="Search Products..."
      />
    </div>

    <!-- Products On Shelf Table -->
    <div class="table-container">
      <h2 class="table-title">Products Available</h2>
      <table class="product-table" v-if="productsOnShelf.length">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Tag Number</th>
            <th>Date Last Scanned</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in productsOnShelf" :key="index">
            <td>{{ product.product_name }}</td>
            <td>{{ product.sku }}</td>
            <td>{{ product.tag_number }}</td>
            <td>{{ formatLastScanned(product.last_scanned) }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>No products on the shelf.</p>
    </div>

    <!-- Products Missing Table -->
    <div class="table-container">
      <h2 class="table-title">Products Missing</h2>
      <table class="product-table" v-if="productsMissing.length">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Tag Number</th>
            <th>Date Last Scanned</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in productsMissing" :key="index">
            <td>{{ product.product_name }}</td>
            <td>{{ product.sku }}</td>
            <td>{{ product.tag_number }}</td>
            <td>{{ formatLastScanned(product.last_scanned) }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>No missing products.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "ProductsPage",
  data() {
    return {
      searchQuery: "",
      products: [],
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(
        (product) =>
          product.product_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.sku.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    productsOnShelf() {
      return this.filteredProducts.filter(
        (product) => product.availability_status === 1
      );
    },
    productsMissing() {
      return this.filteredProducts.filter(
        (product) => product.availability_status === 0
      );
    },
  },
  methods: {
    fetchProducts() {
      const toast = useToast();
      axios
        .get("http://localhost:8080/products")
        .then((response) => {
          this.products = response.data;
          toast.success("Products fetched successfully!");
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          toast.error("Failed to fetch products. Please try again.");
        });
    },
    formatLastScanned(date) {
      return date ? new Date(date).toLocaleString() : "N/A";
    },
    refreshPage() {
      const toast = useToast();
      this.fetchProducts();
      toast.info("Refreshing product data...");
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.products-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.products-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
}

.refresh-button {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.refresh-button:hover {
  background-color: #218838;
}

.table-container {
  margin-bottom: 30px;
  overflow-x: auto; /* Enables horizontal scrolling for the table container */
}

.table-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  min-width: 600px; /* Ensures the table doesn't collapse too much */
}

.product-table th,
.product-table td {
  padding: 10px;
  text-align: left;
}

.product-table th {
  background-color: #6a11cb;
  color: white;
}

.product-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.search-bar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-bar {
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border-radius: 25px;
  border: 1px solid #ccc;
}
</style>

