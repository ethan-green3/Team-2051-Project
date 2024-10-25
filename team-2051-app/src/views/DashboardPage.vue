<template>
  <div class="dashboard-layout">
    <SidebarComponent />
    <div class="dashboard-content">
      <h1>Welcome to the Dashboard</h1>
    </div>
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
.dashboard-layout {
  display: flex;
}

.dashboard-content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100vh; /* Ensure full height for vertical centering */
  background-color: #f8f8f8; /* Light background for content area */
}

h1 {
  font-size: 2rem;
  font-weight: bold;
}
</style>
