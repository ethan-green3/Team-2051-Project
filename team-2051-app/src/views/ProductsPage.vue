<template>
  <div class="products-container">
    <div class="header-container">
      <h1>Product List</h1>
      <button class="add-product-button" @click="openModal">
        + Add Product
      </button>
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
              <button class="delete-button" @click="confirmDelete(index)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No products match your search criteria.</p>
    </div>

    <!-- Modal for Adding Product -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>Add New Product</h2>
        <form @submit.prevent="addProduct">
          <div class="form-group">
            <label for="name">Name*</label>
            <input v-model="newProduct.name" id="name" required />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea v-model="newProduct.description" id="description"></textarea>
          </div>
          <div class="form-group">
            <label for="category">Category*</label>
            <input v-model="newProduct.category" id="category" required />
          </div>
          <div class="form-group">
            <label for="price">Price*</label>
            <input v-model="newProduct.price" id="price" required />
          </div>
          <div class="form-group">
            <label for="itemCode">Item Code*</label>
            <input v-model="newProduct.itemCode" id="itemCode" required />
          </div>
          <div class="form-group">
            <label for="stockSize">Stock Size*</label>
            <input v-model="newProduct.stockSize" id="stockSize" required />
          </div>
          <div class="form-group">
            <label for="storeAvailability">Store Availability*</label>
            <select v-model="newProduct.storeAvailability" id="storeAvailability" required>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          <div class="form-group">
            <label for="productPhotos">Product Photo</label>
            <input type="file" @change="handleFileUpload" />
          </div>
          <div class="form-actions">
            <button type="submit" class="save-button">Save</button>
            <button type="button" class="cancel-button" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Confirmation Modal for Deletion -->
    <div v-if="isDeleteModalOpen" class="modal-overlay" @click="closeDeleteModal">
      <div class="modal-content" @click.stop>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this product?</p>
        <div class="form-actions">
          <button class="confirm-button" @click="deleteProduct(confirmDeleteIndex)">Confirm</button>
          <button class="cancel-button" @click="closeDeleteModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsPage',
  data() {
    return {
      products: [],
      searchQuery: '',
      isModalOpen: false,
      isDeleteModalOpen: false,
      confirmDeleteIndex: null,
      newProduct: {
        name: '',
        description: '',
        category: '',
        price: '',
        itemCode: '',
        stockSize: '',
        storeAvailability: 'Available',
        productPhotos: ''
      }
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
    confirmDelete(index) {
      this.confirmDeleteIndex = index;
      this.isDeleteModalOpen = true;
    },
    deleteProduct(index) {
      this.products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(this.products));
      this.closeDeleteModal();
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    closeDeleteModal() {
      this.isDeleteModalOpen = false;
      this.confirmDeleteIndex = null;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newProduct.productPhotos = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    addProduct() {
      this.products.push({ ...this.newProduct });
      localStorage.setItem('products', JSON.stringify(this.products));

      // Reset newProduct form
      this.newProduct = {
        name: '',
        description: '',
        category: '',
        price: '',
        itemCode: '',
        stockSize: '',
        storeAvailability: 'Available',
        productPhotos: ''
      };

      // Close modal after adding
      this.closeModal();
    }
  }
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

.add-product-button {
  padding: 10px 20px;
  background-color: #5e2aa0;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
}

.add-product-button:hover {
  background-color: #4b1e7a;
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

.product-table th, .product-table td {
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

.product-photo {
  max-width: 50px;
  height: auto;
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

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  font-weight: bold;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.save-button {
  background-color: #5e2aa0;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
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
