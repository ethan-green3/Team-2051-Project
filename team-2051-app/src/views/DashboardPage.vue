<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">Inventory Dashboard</h1>

    <!-- Inventory Summary -->
    <div class="summary-cards">
      <div class="summary-card">
        <h3>Total Products</h3>
        <p class="summary-value">{{ groupedProducts.length }}</p>
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

    <!-- Aggregated Product Table -->
    <div class="section">
      <h2 class="section-title">Aggregated Product Inventory</h2>
      <table class="products-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Total Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in groupedProducts" :key="index">
            <td>{{ product.product_name }}</td>
            <td>{{ product.sku }}</td>
            <td>{{ product.totalQuantity }}</td>
            <td :class="{ 'low-stock': product.totalQuantity <= lowStockThreshold }">
              {{ product.totalQuantity <= lowStockThreshold ? 'Low Stock' : 'Available' }}
            </td>
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
      lowStockThreshold: 5, // Define the threshold for low stock
    };
  },
  computed: {
  groupedProducts() {
    // Filter for products with availability_status = 1
    const availableProducts = this.products.filter(product => product.availability_status === 1);
    
    // Group the filtered products by SKU
    const grouped = availableProducts.reduce((acc, product) => {
      const existing = acc.find((item) => item.sku === product.sku);
      if (existing) {
        existing.totalQuantity += 1; // Increment count
      } else {
        acc.push({
          sku: product.sku,
          product_name: product.product_name,
          totalQuantity: 1, // Start with 1 for the first occurrence
        });
      }
      return acc;
    }, []);
    return grouped;
  },
  totalStock() {
    // Calculate the total stock based on grouped products
    return this.groupedProducts.reduce((total, product) => total + product.totalQuantity, 0);
  },
  lowStockList() {
    // Filter for low stock products
    return this.groupedProducts.filter((product) => product.totalQuantity <= this.lowStockThreshold);
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
/* Overall Page Styling */
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
.products-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.products-table th,
.products-table td {
  padding: 15px;
  text-align: left;
}

.products-table th {
  background-color: #6a11cb;
  color: white;
  font-weight: bold;
}

.products-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.low-stock {
  color: red;
  font-weight: bold;
}
</style>