<template>
  <div id="app">
    <!-- Conditionally show the sidebar only for non-login routes -->
    <SidebarComponent v-if="showSidebar" />

    <!-- Main content -->
    <div :class="showSidebar ? 'main-content-with-sidebar' : 'main-content-full'">
      <router-view />
    </div>
  </div>
</template>

<script>
import SidebarComponent from '@/components/SidebarComponent.vue';

export default {
  computed: {
    showSidebar() {
      // Only show the sidebar for routes other than /login
      return this.$route.path !== '/login';
    }
  },
  components: {
    SidebarComponent,
  }
};
</script>

<style scoped>
/* Adjust styling for full screen content on login */
#app {
  display: flex;
  height: 100vh;
}

.main-content-with-sidebar {
  flex-grow: 1;
  padding-left: 50px; /* Leave space for sidebar */
}

.main-content-full {
  width: 100%;
  padding: 0;
}
</style>
