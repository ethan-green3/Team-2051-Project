<template>
    <div class="settings-container">
      <h1>Settings</h1>
  
      <!-- User Profile Settings -->
      <section class="settings-section">
        <h2>User Profile</h2>
        <div class="form-group">
          <label for="userName">Name</label>
          <input v-model="profile.name" id="userName" placeholder="Enter your name" />
        </div>
        <div class="form-group">
          <label for="userEmail">Email</label>
          <input v-model="profile.email" id="userEmail" placeholder="Enter your email" />
        </div>
        <div class="form-group">
          <label for="userPassword">Change Password</label>
          <input type="password" v-model="profile.password" id="userPassword" placeholder="Enter new password" />
        </div>
        <button class="save-button" @click="saveProfile">Save Profile</button>
      </section>
  
      <!-- Notification Preferences -->
      <section class="settings-section">
        <h2>Notification Preferences</h2>
        <div class="form-group">
          <label for="stockAlerts">Enable Stock Alerts</label>
          <input type="checkbox" v-model="notifications.stockAlerts" id="stockAlerts" />
        </div>
        <div class="form-group">
          <label for="notificationFrequency">Notification Frequency</label>
          <select v-model="notifications.frequency" id="notificationFrequency">
            <option value="instant">Instant</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <button class="save-button" @click="saveNotifications">Save Notifications</button>
      </section>
  
      <!-- Theme and Display Settings -->
      <section class="settings-section">
        <h2>Theme and Display</h2>
        <div class="form-group">
          <label for="darkMode">Dark Mode</label>
          <input type="checkbox" v-model="displaySettings.darkMode" id="darkMode" @change="toggleTheme" />
        </div>
        <div class="form-group">
          <label for="fontSize">Font Size</label>
          <select v-model="displaySettings.fontSize" id="fontSize">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <button class="save-button" @click="saveDisplaySettings">Save Display Settings</button>
      </section>
  
      <!-- Inventory and Product Settings -->
      <section class="settings-section">
        <h2>Inventory Settings</h2>
        <div class="form-group">
          <label for="lowStockThreshold">Low Stock Threshold</label>
          <input type="number" v-model="inventorySettings.lowStockThreshold" id="lowStockThreshold" placeholder="Enter threshold" />
        </div>
        <div class="form-group">
          <label for="manageCategories">Manage Product Categories</label>
          <button class="manage-button" @click="openCategoryManager">Manage Categories</button>
        </div>
        <button class="save-button" @click="saveInventorySettings">Save Inventory Settings</button>
      </section>
  
      <!-- Category Manager Modal -->
      <div v-if="isCategoryManagerOpen" class="modal-overlay" @click="closeCategoryManager">
        <div class="modal-content" @click.stop>
          <h2>Manage Product Categories</h2>
          <ul>
            <li v-for="(category, index) in inventorySettings.categories" :key="index">
              {{ category }} <button @click="removeCategory(index)">Remove</button>
            </li>
          </ul>
          <input v-model="newCategory" placeholder="Add new category" />
          <button @click="addCategory">Add Category</button>
          <button @click="closeCategoryManager">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SettingsPage',
    data() {
      return {
        profile: {
          name: '',
          email: '',
          password: ''
        },
        notifications: {
          stockAlerts: false,
          frequency: 'daily'
        },
        displaySettings: {
          darkMode: false,
          fontSize: 'medium'
        },
        inventorySettings: {
          lowStockThreshold: 10,
          categories: ['MHP', 'Optimum', 'PURUS LABS']
        },
        isCategoryManagerOpen: false,
        newCategory: ''
      };
    },
    methods: {
      saveProfile() {
        alert('Profile saved successfully!');
      },
      saveNotifications() {
        alert('Notification preferences saved successfully!');
      },
      toggleTheme() {
        document.body.classList.toggle('dark-mode', this.displaySettings.darkMode);
      },
      saveDisplaySettings() {
        alert('Display settings saved successfully!');
      },
      saveInventorySettings() {
        alert('Inventory settings saved successfully!');
      },
      openCategoryManager() {
        this.isCategoryManagerOpen = true;
      },
      closeCategoryManager() {
        this.isCategoryManagerOpen = false;
      },
      addCategory() {
        if (this.newCategory) {
          this.inventorySettings.categories.push(this.newCategory);
          this.newCategory = '';
        }
      },
      removeCategory(index) {
        this.inventorySettings.categories.splice(index, 1);
      }
    },
    mounted() {
      // Set theme based on saved settings
      if (this.displaySettings.darkMode) {
        document.body.classList.add('dark-mode');
      }
    }
  };
  </script>
  
  <style scoped>
  .settings-container {
    padding: 20px;
  }
  
  .settings-section {
    margin-bottom: 30px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
  }
  
  input[type="text"], input[type="password"], input[type="number"], select {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .save-button, .manage-button {
    background-color: #5e2aa0;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .save-button:hover, .manage-button:hover {
    background-color: #4b1e7a;
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
    width: 90%;
    max-width: 500px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  .dark-mode {
    background-color: #333;
    color: #fff;
  }
  </style>
  