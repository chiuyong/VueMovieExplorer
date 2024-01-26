<template>
  <v-app>
    <top-nav-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  components: {
    TopNavBar: () => import('@/components/layouts/TopNavBar.vue'),
  },
  data: () => ({
    //
  }),
});
</script>
