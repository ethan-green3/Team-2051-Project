<template>
    <div class="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      <p>You are now logged in.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DashboardPage',
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f7f9fc;
    flex-direction: column;
  }
  
  h1 {
    font-size: 32px;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 18px;
    color: #555;
  }
  </style>
  