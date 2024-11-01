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
      <button class="primary-button" @click="saveProfile">Save Profile</button>
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
      <button class="primary-button" @click="saveNotifications">Save Notifications</button>
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
      <button class="primary-button" @click="saveDisplaySettings">Save Display Settings</button>
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
        <button class="secondary-button" @click="openCategoryManager">Manage Categories</button>
      </div>
      <button class="primary-button" @click="saveInventorySettings">Save Inventory Settings</button>
    </section>

    <!-- Category Manager Modal -->
    <div v-if="isCategoryManagerOpen" class="modal-overlay" @click="closeCategoryManager">
      <div class="modal-content" @click.stop>
        <h2>Manage Product Categories</h2>
        <ul>
          <li v-for="(category, index) in inventorySettings.categories" :key="index">
            {{ category }} <button class="delete-button" @click="removeCategory(index)">Remove</button>
          </li>
        </ul>
        <input v-model="newCategory" placeholder="Add new category" />
        <button class="primary-button" @click="addCategory">Add Category</button>
        <button class="secondary-button" @click="closeCategoryManager">Close</button>
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
    if (this.displaySettings.darkMode) {
      document.body.classList.add('dark-mode');
    }
  }
};
</script>

<style scoped>
.settings-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.settings-section {
  margin-bottom: 40px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
}

.settings-section h2 {
  font-size: 1.5rem;
  color: #5e2aa0;
  margin-bottom: 15px;
  border-bottom: 2px solid #5e2aa0;
  padding-bottom: 5px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"],
input[type="number"],
select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.primary-button,
.secondary-button,
.delete-button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.primary-button {
  background-color: #5e2aa0;
  color: white;
}

.primary-button:hover {
  background-color: #4b1e7a;
}

.secondary-button {
  background-color: #ddd;
  color: #333;
}

.secondary-button:hover {
  background-color: #ccc;
}

.delete-button {
  background-color: #d9534f;
  color: white;
  margin-left: 10px;
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
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.dark-mode {
  background-color: #333;
  color: #fff;
}
</style>
