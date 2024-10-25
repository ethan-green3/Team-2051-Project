<template>
  <div class="add-product-container">
    <h1>Add product</h1>
    <form @submit.prevent="addProduct" class="product-form">
      <div class="form-group">
        <label for="name">Name*</label>
        <input id="name" v-model="newProduct.name" placeholder="Enter product name" required />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="newProduct.description" placeholder="Enter product description"></textarea>
      </div>
      <div class="form-group">
        <label for="category">Category*</label>
        <input id="category" v-model="newProduct.category" placeholder="Enter category" required />
      </div>
      <div class="form-group">
        <label for="price">Price*</label>
        <input id="price" v-model="newProduct.price" placeholder="Enter price" required />
      </div>
      <div class="form-group">
        <label for="itemCode">Item code*</label>
        <input id="itemCode" v-model="newProduct.itemCode" placeholder="Enter item code" required />
      </div>
      <div class="form-group">
        <label for="stockSize">Stock size*</label>
        <input id="stockSize" v-model="newProduct.stockSize" placeholder="Enter stock size" required />
      </div>
      <div class="form-group">
        <label for="storeAvailability">Store availability*</label>
        <select id="storeAvailability" v-model="newProduct.storeAvailability" required>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
      </div>
      <div class="form-group">
        <label for="productPhotos">Product photos*</label>
        <input type="file" @change="handleFileUpload"/>
      </div>
      <button type="submit" class="save-button">Save product</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddProduct',
  data() {
    return {
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
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newProduct.productPhotos = e.target.result; // Store the base64 image
        };
        reader.readAsDataURL(file);
      }
    },
    addProduct() {
      const products = JSON.parse(localStorage.getItem('products')) || [];
      products.push({ ...this.newProduct });
      localStorage.setItem('products', JSON.stringify(products));

      // Clear the form fields after saving
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

      // Redirect to Products Page
      alert("Product has been added");
    }
  }
};
</script>

<style scoped>
/* General container styling */
.add-product-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f9fc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

/* Form styling */
.product-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input, textarea, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
}

input:focus, textarea:focus, select:focus {
  border-color: #5e2aa0;
  box-shadow: 0 0 5px rgba(94, 42, 160, 0.3);
}

textarea {
  resize: vertical;
}

/* Save button styling */
.save-button {
  padding: 12px;
  background-color: #5e2aa0;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #4b1e7a;
}
</style>
