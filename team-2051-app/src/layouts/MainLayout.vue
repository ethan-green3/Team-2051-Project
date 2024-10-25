<template>
    <div class="main-layout">
      <SidebarComponent /> <!-- The sidebar is only rendered here -->
      <router-view /> <!-- The authenticated pages (dashboard, add product, etc.) are displayed here -->
    </div>
  </template>
  
  <script>
  import SidebarComponent from '@/components/SidebarComponent.vue';
  
  export default {
    components: {
      SidebarComponent,
    },
  };
  </script>
  
  <style scoped>
  .main-layout {
    display: flex;
  }
  
  .router-view {
    flex-grow: 1;
    padding: 20px;
  }
  </style>
  