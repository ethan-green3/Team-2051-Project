<template>
  <div class="actions-container">
    <h1 class="actions-title">Product Management</h1>

    <!-- Check In and Check Out Buttons -->
    <div class="buttons-container">
      <button class="check-in-button" @click="checkInProducts">
        Check In Products
      </button>
      <button class="check-out-button" @click="checkOutProducts">
        Check Out Products
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductActionsPage",
  methods: {
    checkInProducts() {
      // Logic for checking in products
      console.log("Check In Products clicked");
    },
    checkOutProducts() {
      // Logic for checking out products
      console.log("Check Out Products clicked");
    },
  },
};
</script>

<style scoped>
.actions-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  text-align: center;
}

.actions-title {
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.buttons-container {
  display: flex;
  justify-content: center;
  gap: 50px; /* Space between buttons */
}

.check-in-button {
  background-color: #28a745; /* Green */
  color: white;
  border: none;
  padding: 40px 100px; /* Increased padding for size */
  font-size: 1.5rem; /* Larger text size */
  font-weight: bold;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.check-in-button:hover {
  background-color: #218838; /* Darker green */
}

.check-out-button {
  background-color: #dc3545; /* Red */
  color: white;
  border: none;
  padding: 40px 100px; /* Increased padding for size */
  font-size: 1.5rem; /* Larger text size */
  font-weight: bold;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.check-out-button:hover {
  background-color: #c82333; /* Darker red */
}
</style>
