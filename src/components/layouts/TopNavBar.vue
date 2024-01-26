<template>
  <v-app-bar app color="primary" dark height="80">
    <div class="d-flex align-center justify-center logo">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="25"
      />
      <v-toolbar-title class="mr-5">Movie Explorer</v-toolbar-title>
    </div>

    <!-- Search Input -->
    <v-text-field
      flat
      solo-inverted
      hide-details
      label="Search movies"
      v-model="search"
      @input="onSearch"
      class="mr-2"
    ></v-text-field>

    <v-btn icon class="mx-1">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon class="mx-1">
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TopNavBar',
  props: {},
  computed: {},
  data() {
    return {
      search: '' as string,
    };
  },
  methods: {
    onSearch() {
      // Emit an event or call an action to perform search
      this.$emit('search', this.search);
    },
  },
});
</script>

<style scoped>
/* Add your styles here */
.logo {
  width: 300px;
}
</style>
