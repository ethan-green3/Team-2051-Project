<template>
    <div class="login-layout">
      <router-view /> <!-- This renders the login form without the sidebar -->
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginLayout",
  };
  </script>
  
  <style scoped>
  .login-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #5e2aa0; /* Ensure a full-screen purple background */
  }
  </style>
  