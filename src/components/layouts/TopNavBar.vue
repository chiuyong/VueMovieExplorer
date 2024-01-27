<template>
  <v-app-bar app color="primary" dark height="80" class="topnavbar">
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
      label="Search movie"
      v-model="movieTitle"
      class="mr-2"
      @keyup.enter="updateQueryParams"
    ></v-text-field>

    <v-btn icon class="mx-1" @click="updateQueryParams">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon class="mx-1">
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'TopNavBar',
  props: {},
  computed: {},
  data() {
    return {
      movieTitle: '' as string,
    };
  },
  methods: {
    ...mapActions('movie', ['setSearchQuery']),
    updateQueryParams(): void {
      // If there's a search term, update the query params, otherwise clear them.
      const query: Record<string, string | undefined> = this.movieTitle
        ? { search: this.movieTitle }
        : {};

      // Update the store with the search query.
      this.setSearchQuery(this.movieTitle);
      // Use Vue Router's push method to update the URL.
      this.$router.push({ name: 'movie', query });
    },
  },
});
</script>

<style scoped>
/* Add your styles here */
.topnavbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.logo {
  width: 300px;
}
</style>
