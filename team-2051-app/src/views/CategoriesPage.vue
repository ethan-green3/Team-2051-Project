<template>
  <div class="check-in-container">
    <h1 class="page-title">Check In / Check Out</h1>

    <!-- Check In Button -->
    <button class="check-in-button" @click="showCheckInForm = true">Check In</button>

    <!-- Check In Form Modal -->
    <div v-if="showCheckInForm" class="modal-overlay">
      <div class="modal-content">
        <h2>Check In Product</h2>
        <form @submit.prevent="submitCheckIn">
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
          <div class="form-actions">
            <button type="submit" class="submit-button">Submit</button>
            <button type="button" class="cancel-button" @click="closeCheckInForm">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Checked-In Products Table -->
    <div class="checked-in-products">
      <h2>Checked-In Products</h2>
      <table class="product-table" v-if="checkedInProducts.length">
        <thead>
          <tr>
            <th>RFID Tag</th>
            <th>SKU</th>
            <th>Product Name</th>
            <th>Availability Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in checkedInProducts" :key="index">
            <td>{{ product.tag_number }}</td>
            <td>{{ product.sku }}</td>
            <td>{{ product.product_name }}</td>
            <td>{{ formatAvailabilityStatus(product.availability_status) }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>No checked-in products found.</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "CheckInPage",
  data() {
    return {
      showCheckInForm: false,
      form: {
        rfidTag: "",
        barcode: "",
      },
      checkedInProducts: [], // To store the list of checked-in products
    };
  },
  methods: {
    closeCheckInForm() {
      this.showCheckInForm = false;
      this.form.rfidTag = "";
      this.form.barcode = "";
    },
    submitCheckIn() {
      // API Call to Check In Product
      axios
        .post("http://localhost:8080/check-in", {
          rfidTag: this.form.rfidTag,
          barcode: this.form.barcode,
        })
        .then(() => {
          alert("Product checked in successfully!");
          this.closeCheckInForm();
          this.fetchCheckedInProducts(); // Refresh the table after a new check-in
        })
        .catch((error) => {
          console.error("Error checking in product:", error);
          alert("Failed to check in product. Please try again.");
        });
    },
    fetchCheckedInProducts() {
      // API Call to fetch checked-in products
      axios
        .get("http://localhost:8080/products/checked-in")
        .then((response) => {
          this.checkedInProducts = response.data;
        })
        .catch((error) => {
          console.error("Error fetching checked-in products:", error);
        });
    },
    formatAvailabilityStatus(status) {
      if (status === 1) return "Available";
      if (status === 0) return "Missing";
      return "Checked In";
    },
  },
  mounted() {
    this.fetchCheckedInProducts(); // Fetch data on component mount
  },
};
</script>
<style scoped>
.check-in-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.page-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

.check-in-button {
  display: block;
  margin: 0 auto 20px;
  padding: 10px 20px;
  background-color: #28a745;
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
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
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

.checked-in-products {
  margin-top: 20px;
}

.checked-in-products h2 {
  text-align: center;
  margin-bottom: 10px;
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
</style>
