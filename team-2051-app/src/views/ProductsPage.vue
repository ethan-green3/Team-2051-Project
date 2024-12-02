<template>
  <div class="products-container">
    <div class="header-container">
      <h1>Product List</h1>
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

    <!-- Product Table -->
    <div v-if="filteredProducts.length">
      <table class="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in filteredProducts" :key="index">
            <td>{{ product.product_name }}</td>
            <td>{{ product.sku }}</td>
            <td>
              <input
                type="number"
                v-model.number="product.quantity"
                @blur="updateQuantity(product.sku, product.quantity)"
              />
            </td>
            <td>
              <button class="delete-button" @click="confirmDelete(product.sku)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No products match your search criteria.</p>
    </div>

    <!-- Confirmation Modal for Deletion -->
    <div v-if="isDeleteModalOpen" class="modal-overlay" @click="closeDeleteModal">
      <div class="modal-content" @click.stop>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this product?</p>
        <div class="form-actions">
          <button class="confirm-button" @click="deleteRequestedProduct(confirmDeleteCode)">Confirm</button>
          <button class="cancel-button" @click="closeDeleteModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductsPage",
  data() {
    return {
      searchQuery: "",
      isDeleteModalOpen: false,
      confirmDeleteCode: null,
      products: [], // To hold products from the database
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
  },
  methods: {
    // Fetch products from the database
    fetchProducts() {
      axios
        .get("http://localhost:8080/products")
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    },

    // Update quantity in the database
    updateQuantity(sku, quantity) {
      axios
        .put(`http://localhost:8080/products/${sku}`, { quantity })
        .then(() => {
          // Show confirmation message
          alert(`Quantity updated successfully for SKU: ${sku}`);
        })
        .catch((error) => {
          console.error("Error updating quantity:", error);
          alert(`Failed to update quantity for SKU: ${sku}. Please try again.`);
        });
    },

    // Handle delete confirmation modal
    confirmDelete(sku) {
      this.confirmDeleteCode = sku;
      this.isDeleteModalOpen = true;
    },

    closeDeleteModal() {
      this.isDeleteModalOpen = false;
      this.confirmDeleteCode = null;
    },

    // Delete a product from the database
    async deleteRequestedProduct(sku) {
      try {
        await axios.delete(`http://localhost:8080/products/${sku}`);
        this.products = this.products.filter((product) => product.sku !== sku);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
      this.closeDeleteModal();
    },
  },
  mounted() {
    this.fetchProducts(); // Load products on component mount
  },
};
</script>

<style scoped>
.products-container {
  padding: 20px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

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

.delete-button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-button {
  background-color: #ccc;
  padding: 10px 20px;
  border-radius: 5px;
}

.confirm-button {
  background-color: #d9534f;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
