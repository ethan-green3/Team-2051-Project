<template>
  <div class="dashboard-container">
    <h1>Dashboard</h1>

    <!-- Inventory Summary -->
    <div class="summary-cards">
      <div class="summary-card">
        <h3>Total Products</h3>
        <p>{{ totalProducts }}</p>
      </div>
      <div class="summary-card">
        <h3>Available Stock</h3>
        <p>{{ availableStock }}</p>
      </div>
      <div class="summary-card">
        <h3>Low Stock Items</h3>
        <p>{{ lowStockItems }}</p>
      </div>
    </div>

    <!-- Recently Added Products -->
    <div class="section">
      <h2>Recently Added Products</h2>
      <table class="recent-products">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Stock Size</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in recentProducts" :key="index">
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.stockSize }}</td>
            <td>{{ product.storeAvailability }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Low Stock Alerts -->
    <div class="section low-stock">
      <h2>Low Stock Alerts</h2>
      <p v-if="lowStockList.length === 0">No low stock items at the moment.</p>
      <ul v-else>
        <li v-for="(item, index) in lowStockList" :key="index">
          {{ item.name }} - Stock: {{ item.stockSize }}
        </li>
      </ul>
    </div>

    <!-- Categories Overview -->
    <div class="section categories-overview">
      <h2>Categories Overview</h2>
      <div class="category-cards">
        <div class="category-card" v-for="(category, index) in categoriesOverview" :key="index">
          <h3>{{ category.name }}</h3>
          <p>{{ category.itemCount }} items</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'DashboardPage',
  computed: {
    ...mapState(['products', 'categories']),
    ...mapGetters({
      totalProducts: 'totalProductsCount',
      availableStock: 'totalAvailableStock',
      lowStockItems: 'lowStockItemsCount',
      recentProducts: 'recentProductsList',
      lowStockList: 'lowStockListItems',
      categoriesOverview: 'categoriesOverviewList'
    }),
  },
  methods: {
    async fetchData() {
      // Trigger Vuex actions to fetch data from the server
      await this.$store.dispatch('fetchProducts');
      await this.$store.dispatch('fetchCategories');
    },
  },
  mounted() {
    // Fetch data when the component is mounted
    this.fetchData();
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

.recent-products,
.low-stock,
.categories-overview {
  margin-top: 20px;
}

.recent-products table {
  width: 100%;
  border-collapse: collapse;
}

.recent-products th, .recent-products td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.low-stock ul {
  list-style-type: none;
  padding: 0;
}

.low-stock li {
  padding: 5px;
  border-bottom: 1px solid #ddd;
}

.category-cards {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.category-card {
  flex: 1 1 200px;
  background-color: #f7f9fc;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}
</style>
