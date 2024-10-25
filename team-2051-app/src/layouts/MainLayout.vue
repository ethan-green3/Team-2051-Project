<template>
  <div class="main-layout">
    <SidebarComponent /> <!-- Sidebar included here -->
    <router-view />
  </div>
</template>

<script>
import SidebarComponent from '@/components/SidebarComponent.vue';

export default {
  name: 'MainLayout',
  components: {
    SidebarComponent
  }
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
  