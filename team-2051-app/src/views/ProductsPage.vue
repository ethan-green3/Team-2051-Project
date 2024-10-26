<template>
  <div class="products-container">
    <h1>Product List</h1>
    <div v-if="products.length">
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
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
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No products have been added yet.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsPage',
  data() {
    return {
      products: []
    };
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      this.products = storedProducts;
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
</style>
