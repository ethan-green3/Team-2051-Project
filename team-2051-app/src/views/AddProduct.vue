<template>
  <div class="add-product-container">
    <h1>Add product</h1>
    <form @submit.prevent="addProduct">
      <div>
        <label>Name*</label>
        <input v-model="newProduct.name" placeholder="Enter product name" required />
      </div>
      <div>
        <label>Description</label>
        <textarea v-model="newProduct.description" placeholder="Enter product description"></textarea>
      </div>
      <div>
        <label>Category*</label>
        <input v-model="newProduct.category" placeholder="Enter category" required />
      </div>
      <div>
        <label>Price*</label>
        <input v-model="newProduct.price" placeholder="Enter price" required />
      </div>
      <div>
        <label>Item code*</label>
        <input v-model="newProduct.itemCode" placeholder="Enter item code" required />
      </div>
      <div>
        <label>Stock size*</label>
        <input v-model="newProduct.stockSize" placeholder="Enter stock size" required />
      </div>
      <div>
        <label>Store availability*</label>
        <select v-model="newProduct.storeAvailability" required>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
      </div>
      <div>
        <label>Product photos*</label>
        <input type="file" @change="handleFileUpload" required />
      </div>
      <button type="submit">Save product</button>
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
      this.$router.push({ name: 'ProductsPage' });
    }
  }
};
</script>
