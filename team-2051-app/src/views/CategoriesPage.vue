<template>
  <div class="check-in-container">
    <h1 class="page-title">Product Activity</h1>

    <!-- Check In and Check Out Buttons -->
    <div class="button-container">
      <button class="check-in-button" @click="showCheckInForm = true">Check In</button>
      <button class="check-out-button" @click="showCheckOutForm = true">Check Out</button>
    </div>
      <!-- Search Bar -->
    <div class="search-bar-container">
      <input
        type="text"
        v-model="searchQuery"
        class="search-bar"
        placeholder="Search by RFID Tag or Product Name..."
      />
    </div>
    <!-- Check In Form Modal -->
    <div v-if="showCheckInForm" class="modal-overlay">
      <div class="modal-content">
        <h2>Check In Products</h2>
        <form @submit.prevent="submitBulkCheckIn">
          <div class="form-group">
            <label for="barcode">Barcode</label>
            <input
              type="text"
              id="barcode"
              v-model="form.barcode"
              required
              placeholder="Enter Product Barcode"
            />
          </div>
          <div class="form-group">
            <label for="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              v-model.number="form.quantity"
              min="1"
              :max="maxQuantity"
              @input="generateRFIDFields"
              required
              placeholder="Enter Quantity (Max 12)"
            />
          </div>
          <div class="form-group" v-for="(tag, index) in form.rfidTags" :key="index">
            <label :for="`rfidTag-${index}`">RFID Tag Number {{ index + 1 }}</label>
            <input
              type="text"
              :id="`rfidTag-${index}`"
              v-model="form.rfidTags[index]"
              required
              placeholder="Enter RFID Tag Number"
            />
          </div>
          <div class="form-actions">
            <button type="submit" class="submit-button">Submit</button>
            <button type="button" class="cancel-button" @click="closeCheckInForm">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Check Out Form Modal -->
    <div v-if="showCheckOutForm" class="modal-overlay">
      <div class="modal-content">
        <h2>Check Out Product</h2>
        <form @submit.prevent="submitCheckOut">
          <div class="form-group">
            <label for="rfidTag">RFID Tag Number</label>
            <input
              type="text"
              id="rfidTag"
              v-model="form.rfidTag"
              required
              placeholder="Enter RFID Tag Number"
            />
          </div>
          <div class="form-actions">
            <button type="submit" class="submit-button">Submit</button>
            <button type="button" class="cancel-button" @click="closeCheckOutForm">Cancel</button>
          </div>
        </form>
      </div>
    </div>

   <!-- Checked-In Products Table -->
<h2 class="table-title">Checked-In Products</h2>
<table class="product-table" v-if="filteredProducts.length">
  <thead>
    <tr>
      <th>RFID Tag</th>
      <th>SKU</th>
      <th>Product Name</th>
      <th>Availability Status</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(product, index) in filteredProducts" :key="index">
      <td>{{ product.tag_number }}</td>
      <td>{{ product.sku }}</td>
      <td>{{ product.product_name }}</td>
      <td>{{ product.availability_status === 1 ? 'Checked In' : 'Checked Out' }}</td>
    </tr>
  </tbody>
</table>
<p v-else>No products match your search.</p>

  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "CheckInPage",
  data() {
    return {
      showCheckInForm: false,
      showCheckOutForm: false,
      form: {
        barcode: "",
        quantity: 1,
        rfidTags: [""],
        rfidTag: "",
      },
      maxQuantity: 12,
      products: [],
      searchQuery: "",
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        const productName = product.product_name
          ? product.product_name.toLowerCase()
          : "";
        const tagNumber = product.tag_number
          ? product.tag_number.toLowerCase()
          : "";
        const searchQuery = this.searchQuery.toLowerCase();
        return productName.includes(searchQuery) || tagNumber.includes(searchQuery);
      });
    },
  },
  methods: {
    fetchCheckedInProducts() {
      const toast = useToast();
      axios
        .get("http://localhost:8080/products/checked-in")
        .then((response) => {
          this.products = response.data;
          toast.success("Fetched checked-in products successfully!");
        })
        .catch((error) => {
          console.error("Error fetching checked-in products:", error);
          toast.error("Failed to fetch checked-in products. Please try again.");
        });
    },
    closeCheckInForm() {
      this.showCheckInForm = false;
      this.resetForm();
    },
    closeCheckOutForm() {
      this.showCheckOutForm = false;
      this.resetForm();
    },
    resetForm() {
      this.form = {
        barcode: "",
        quantity: 1,
        rfidTags: [""],
        rfidTag: "",
      };
    },
    generateRFIDFields() {
      const quantity = Math.min(this.form.quantity || 1, this.maxQuantity);
      this.form.rfidTags = Array.from(
        { length: quantity },
        (_, i) => this.form.rfidTags[i] || ""
      );
    },
    submitBulkCheckIn() {
      const toast = useToast();
      axios
        .post("http://localhost:8080/check-in", {
          barcode: this.form.barcode,
          rfidTags: this.form.rfidTags,
        })
        .then(() => {
          toast.success("Products checked in successfully!");
          this.closeCheckInForm();
          this.fetchCheckedInProducts();
        })
        .catch((error) => {
          console.error("Error checking in products:", error);
          toast.error("Failed to check in products. Please try again.");
        });
    },
    submitCheckOut() {
      const toast = useToast();
      axios
        .post("http://localhost:8080/check-out", {
          rfidTag: this.form.rfidTag,
        })
        .then(() => {
          toast.success("Product checked out successfully!");
          this.closeCheckOutForm();
          this.fetchCheckedInProducts();
        })
        .catch((error) => {
          console.error("Error checking out product:", error);
          toast.error("Failed to check out product. Please try again.");
        });
    },
  },
  mounted() {
    this.fetchCheckedInProducts();
  },
};
</script>


<style scoped>
/* Style for Check In and Check Out Buttons */
.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.check-in-button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.check-out-button {
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.check-in-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.page-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.check-in-button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.check-out-button {
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
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
}

.modal-content {
  background: white;
  padding: 20px; /* Add padding for spacing */
  border-radius: 10px;
  width: 100%;
  max-width: 400px; /* Set a maximum width for the modal */
  box-sizing: border-box; /* Ensure padding doesn't increase width */
  overflow-y: auto; /* Add scrolling for long content */
}

.form-group {
  margin-bottom: 15px; /* Add space between form groups */
  display: flex;
  flex-direction: column; /* Stack labels and inputs vertically */
}

label {
  margin-bottom: 5px; /* Add space below the label */
  font-weight: bold;
}

input {
  width: 100%; /* Make the input take full width of the container */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Prevent padding from affecting width */
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px; /* Add space above the buttons */
}

.submit-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.product-table th,
.product-table td {
  padding: 10px;
  text-align: left;
}

.product-table th {
  background-color: #6a11cb;
  color: white;
}

.product-table tr:nth-child(even) {
  background-color: #f8f9fa;
}
.search-bar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-bar {
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 16px;
}
</style>
