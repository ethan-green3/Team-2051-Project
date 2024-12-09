<template>
  <div class="sidebar">
    <!-- Logo -->
    <div class="sidebar-logo">
      <h2>Tag-Sense-Management</h2>
    </div>

    <!-- Navigation Links -->
    <nav class="sidebar-nav">
      <router-link to="/dashboard" class="nav-item" active-class="active">
        <i class="icon-home"></i> Dashboard
      </router-link>
      <router-link to="/products" class="nav-item" active-class="active">
        <i class="icon-products"></i> Products
      </router-link>
      <router-link to="/categories" class="nav-item" active-class="active">
        <i class="icon-categories"></i> Activity
      </router-link>
      <router-link to="/settings" class="nav-item" active-class="active">
        <i class="icon-settings"></i> Settings
      </router-link>
    </nav>

    <!-- Bottom Buttons -->
    <div class="sidebar-bottom">
      <router-link to="/add-product" class="sidebar-button">
        <i class="icon-add"></i> Add product
      </router-link>
      <button class="sidebar-button" @click="logout">
       <i class="icon-logout"></i> Log out
      </button>

    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarComponent",
  methods: {
    logout() {
      // Remove login flag from localStorage
      localStorage.removeItem('isLoggedIn');
      
      // Redirect to the login page
      this.$router.push({ name: 'LoginPage' });
    }
  }
};
</script>


<style scoped>
/* Sidebar container styling */
.sidebar {
  width: 220px; /* Adjusted to be slightly narrower */
  height: 100vh;
  background-color: #5e2aa0;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Slight shadow for depth */
  border-radius: 20px;
}

/* Logo styling */
.sidebar-logo {
  text-align: center;
  margin: 1rem 0;
}

.sidebar-logo h2 {
  font-size: 1.6rem; /* Reduced font size for balance */
  margin: 0;
  padding: 10px;
  color: white;
  font-weight: bold;
}

/* Navigation links styling */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  font-size: 1.1rem;
  text-decoration: none;
  color: white;
}

.nav-item i {
  margin-right: 12px;
}

.nav-item:hover {
  background-color: #7e4bb7;
  border-radius: 20px;
}

.active {
  background-color: #7e4bb7;
  border-radius: 20px;
}

/* Icons placeholder (you can replace with real icons) */
.icon-home::before {
  content: "🏠";
  margin-right: 10px;
}

.icon-products::before {
  content: "📦";
  margin-right: 10px;
}

.icon-categories::before {
  content: "📂";
  margin-right: 10px;
}

.icon-settings::before {
  content: "⚙️";
  margin-right: 10px;
}

/* Bottom buttons */
.sidebar-bottom {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.sidebar-button {
  background-color: white;
  color: #5e2aa0;
  font-size: 1.1rem;
  border: none;
  border-radius: 25px; /* More rounded buttons */
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  text-align: left;
}

.sidebar-button i {
  margin-right: 10px;
}

.sidebar-button:hover {
  background-color: #ddd;
}
</style>
