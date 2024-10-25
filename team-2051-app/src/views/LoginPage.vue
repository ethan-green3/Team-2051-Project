<template>
  <div class="login-container">
    <h1 class="logo">Tag-Sense Management RFID Project</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="username" type="text" id="username" placeholder="Insert username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" placeholder="Insert password" required />
      </div>
      <button type="submit" class="login-button">Log in</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage', 
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      if (!this.username || !this.password) {
        alert('Please enter both username and password');
        return;
      }
      localStorage.setItem('isLoggedIn', true)
      alert(`Logged in as ${this.username}`);
      this.$router.push({ name: 'DashboardPage' });
    }
  }
};
</script>

<style scoped>
/* General styling */
body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
}

/* Full height and width for login page */
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw; /* Ensure it uses the full width of the viewport */
  background-color: #5e2aa0; /* Purple background color */
  color: white;
}

/* Logo */
.logo {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

/* Form Styling */
.login-form {
  width: 100%;
  max-width: 500px; /* Increase the max-width */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.1); /* Add some background transparency */
  border-radius: 20px;
}

/* Input Field Styling */
input {
  width: 100%;
  padding: 1rem; /* Increase padding for input fields */
  border-radius: 30px;
  border: none;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding-left: 1.5rem;
  outline: none;
}

/* Adjust Form Group Margins */
.form-group {
  width: 80%;
  margin-bottom: 1.75rem; /* Increase space between form fields */
}

/* Button Styling */
.login-button {
  width: 80%;
  padding: 1rem; /* Increase padding for button */
  background-color: white;
  color: #5e2aa0;
  border-radius: 30px;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add button shadow */
}

.login-button:hover {
  background-color: #ddd;
}
</style>
