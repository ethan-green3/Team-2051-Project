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
      }
      alert(`Logged in as ${this.username}`);
      this.$router.push({ name: 'DashboardPage' });
    }
  }
};
</script>

<style scoped>
/* Reset default body margins and padding */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Arial', sans-serif;
  background-color: #5e2aa0;
}

/* Container Styling */
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #5e2aa0; /* Purple background */
  color: white;
  box-sizing: border-box;
  padding: 0 20px;
}

/* Logo */
.logo {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
}

/* Form Styling */
.login-form {
  width: 100%;
  max-width: 400px; /* Ensure the form doesn't get too wide */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  width: 100%;
  margin-bottom: 1.5rem;
}

/* Label Styling */
label {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  display: block;
}

/* Input Field Styling */
input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 30px;
  border: none;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding-left: 1.5rem;
  outline: none;
}

input::placeholder {
  color: #999;
}

/* Button Styling */
.login-button {
  width: 100%; /* Make button same width as input */
  padding: 0.75rem;
  background-color: white;
  color: #5e2aa0;
  border-radius: 30px;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #ddd;
}
</style>
