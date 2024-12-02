<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">Inventory Dashboard</h1>

    <!-- Inventory Summary -->
    <div class="summary-cards">
      <div class="summary-card">
        <h3>Total Products</h3>
        <p class="summary-value">{{ products.length }}</p>
      </div>
      <div class="summary-card">
        <h3>Total Stock</h3>
        <p class="summary-value">{{ totalStock }}</p>
      </div>
      <div class="summary-card">
        <h3>Low Stock Items</h3>
        <p class="summary-value">{{ lowStockList.length }}</p>
      </div>
    </div>

    <!-- Live Feed of Products -->
    <div class="section">
      <h2 class="section-title">Recent Products (Last 5)</h2>
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
          <tr v-for="(product, index) in recentProducts" :key="index">
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

    <!-- Restocking Recommendations -->
    <div class="section restocking">
      <h2 class="section-title">Restocking Recommendations</h2>
      <table class="restocking-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Current Stock</th>
            <th>Suggested Restock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in lowStockList" :key="index">
            <td>{{ product.product_name }}</td>
            <td>{{ product.sku }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ calculateRestock(product.quantity) }}</td>
          </tr>
        </tbody>
      </table>
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
      lowStockThreshold: 10, // Define the threshold for low stock
    };
  },
  computed: {
    totalStock() {
      return this.products.reduce((total, product) => total + product.quantity, 0);
    },
    lowStockList() {
      return this.products.filter((product) => product.quantity <= this.lowStockThreshold);
    },
    recentProducts() {
      return this.products.slice(-5).reverse();
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
    calculateRestock(quantity) {
      return Math.max(this.lowStockThreshold * 2 - quantity, 5); // Example restock calculation
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
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Title Styling */
.dashboard-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #4a4a4a;
  text-align: center;
}

/* Summary Cards Styling */
.summary-cards {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.summary-card {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  border-radius: 10px;
  padding: 20px;
  flex: 1;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.summary-card:hover {
  transform: translateY(-5px);
}

.summary-value {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 10px;
}

/* Section Styling */
.section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a4a4a;
  margin-bottom: 10px;
}

/* Table Styling */
.products-table, .restocking-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.products-table th, .restocking-table th,
.products-table td, .restocking-table td {
  padding: 15px;
  text-align: left;
}

.products-table th, .restocking-table th {
  background-color: #6a11cb;
  color: white;
  font-weight: bold;
}

.products-table tr:nth-child(even),
.restocking-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.low-stock {
  color: red;
  font-weight: bold;
}
</style>
