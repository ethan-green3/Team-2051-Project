<template>
    <div class="products-container">
      <h1>Product List</h1>
      <div v-if="products.length">
        <ul>
          <li v-for="(product, index) in products" :key="index">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <p>Category: {{ product.category }}</p>
            <p>Price: {{ product.price }}</p>
            <p>Item Code: {{ product.itemCode }}</p>
            <p>Stock Size: {{ product.stockSize }}</p>
            <p>Store Availability: {{ product.storeAvailability }}</p>
            <img v-if="product.productPhotos" :src="product.productPhotos" alt="Product photo" />
          </li>
        </ul>
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
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
  </style>
  