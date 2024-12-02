<template>
  <div class="products-container">
    <div class="header-container">
      <h1 class="products-title">Product Management</h1>
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
    <div v-if="filteredProducts.length" class="table-container">
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
                class="quantity-input"
              />
            </td>
            <td>
              <button class="delete-button" @click="confirmDelete(product.sku)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="no-products">
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
import { useToast } from "vue-toastification"; // Import Toastification composable

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
      const toast = useToast();
      axios
        .get("http://localhost:8080/products")
        .then((response) => {
          this.products = response.data;
          toast.success("Products loaded successfully!");
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          toast.error("Failed to fetch products. Please try again.");
        });
    },

    // Update quantity in the database
    updateQuantity(sku, quantity) {
      const toast = useToast();
      axios
        .put(`http://localhost:8080/products/${sku}`, { quantity })
        .then(() => {
          toast.success(`Quantity updated successfully for SKU: ${sku}`);
        })
        .catch((error) => {
          console.error("Error updating quantity:", error);
          toast.error(`Failed to update quantity for SKU: ${sku}. Please try again.`);
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
      const toast = useToast();
      try {
        await axios.delete(`http://localhost:8080/products/${sku}`);
        this.products = this.products.filter((product) => product.sku !== sku);
        toast.success(`Product with SKU: ${sku} deleted successfully.`);
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error(`Failed to delete product with SKU: ${sku}. Please try again.`);
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
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.products-title {
  font-size: 2rem;
  font-weight: bold;
  color: #4a4a4a;
  text-align: center;
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
  transition: border-color 0.3s;
}

.search-bar:focus {
  border-color: #6a11cb;
}

.table-container {
  margin-top: 20px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th,
.product-table td {
  padding: 15px;
  text-align: left;
}

.product-table th {
  background-color: #6a11cb;
  color: white;
  font-weight: bold;
}

.product-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.quantity-input {
  width: 70px;
  padding: 5px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.delete-button {
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #c9302c;
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
