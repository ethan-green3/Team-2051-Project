<template>
  <div class="dashboard-container">
    <h1>Dashboard</h1>
    
    <!-- Inventory Summary -->
    <div class="summary-cards">
      <div class="summary-card">
        <h3>Total Products</h3>
        <p>{{ products.length }}</p>
      </div>
      <div class="summary-card">
        <h3>Total Stock</h3>
        <p>{{ totalStock }}</p>
      </div>
      <div class="summary-card">
        <h3>Low Stock Items</h3>
        <p>{{ lowStockList.length }}</p>
      </div>
    </div>

    <!-- Live Feed of Products -->
    <div class="section">
      <h2>Live Feed of Products</h2>
      <table class="products-table">
        <thead>
          <tr>
            <th>Tag Number</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td>{{ product.tag_number }}</td>
            <td>{{ product.sku }}</td>
            <td>{{ product.quantity }}</td>
            <td :class="{ 'low-stock': product.quantity <= lowStockThreshold }">
              {{ product.quantity <= lowStockThreshold ? 'Low Stock' : 'Available' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Low Stock Alerts -->
    <div class="section low-stock">
      <h2>Low Stock Alerts</h2>
      <ul v-if="lowStockList.length > 0">
        <li v-for="(product, index) in lowStockList" :key="index">
          SKU: {{ product.sku }} - Stock: {{ product.quantity }}
        </li>
      </ul>
      <p v-else>No low stock items at the moment.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DashboardPage",
  data() {
    return {
      products: [],
      lowStockThreshold: 5, // Define the threshold for low stock
    };
  },
  computed: {
    totalStock() {
      return this.products.reduce((total, product) => total + product.quantity, 0);
    },
    lowStockList() {
      return this.products.filter((product) => product.quantity <= this.lowStockThreshold);
    },
  },
  methods: {
    fetchProducts() {
      axios
        .get("http://localhost:8080/products") // Replace with your backend API endpoint
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    },
  },
  mounted() {
    this.fetchProducts();
    // Optional: Auto-refresh every 10 seconds
    setInterval(this.fetchProducts, 10000);
  },
};
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.summary-cards {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.summary-card {
  background-color: #5e2aa0;
  color: white;
  border-radius: 10px;
  padding: 20px;
  flex: 1;
  text-align: center;
}

.section {
  margin-bottom: 30px;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.products-table th,
.products-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.low-stock {
  color: red;
  font-weight: bold;
}
</style>
