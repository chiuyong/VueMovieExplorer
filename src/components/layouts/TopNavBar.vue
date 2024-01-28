<template>
  <v-app-bar app color="primary" dark height="80" class="topnavbar">
    <div
      class="d-flex align-center justify-center topnavbar__logo"
      @click="goToMovie"
    >
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
      v-if="!isFavoritePage"
      flat
      solo-inverted
      hide-details
      label="Search movie"
      v-model="movieTitle"
      class="mr-2"
      @keyup.enter="updateQueryParams"
    ></v-text-field>

    <v-spacer v-if="isFavoritePage"></v-spacer>

    <v-btn icon class="mx-1" @click="updateQueryParams" v-if="!isFavoritePage">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-badge
      color="red"
      overlap
      :content="getMovies.length"
      :value="getMovies.length"
    >
      <v-btn icon class="mx-1" @click="goToFavoriteMovies">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-badge>
  </v-app-bar>
</template>

<script lang="ts">
import { navigate } from '@/utils/navigation';
import { isObjectEmpty } from '@/utils/object';
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex';

export default Vue.extend({
  name: 'TopNavBar',
  props: {},
  computed: {
    ...mapGetters('favoriteMovies', ['getMovies']),
  },
  data() {
    return {
      movieTitle: '' as string,
      isFavoritePage: false as Boolean,
    };
  },
  methods: {
    ...mapMutations('movie', ['SET_SEARCH_QUERY']),
    updateQueryParams(): void {
      // If there's a search term, update the query params, otherwise clear them.
      const query: Record<string, string | undefined> = this.movieTitle
        ? { search: this.movieTitle }
        : {};

      // Update the store with the search query.
      this.SET_SEARCH_QUERY(this.movieTitle);

      // Push method to update the URL.
      navigate(this.$router, 'movieView', query);
    },
    goToFavoriteMovies(): void {
      navigate(this.$router, 'favoriteMoviesView');
    },
    goToMovie(): void {
      navigate(this.$router, 'movieView');
    },
    setIsFavoritePage(routeName: string | null | undefined = null): void {
      routeName = routeName ?? this.$route.name;
      if (routeName === 'favoriteMoviesView') {
        this.isFavoritePage = true;
      } else {
        this.isFavoritePage = false;
      }
    },
    resetSearchField(): void {
      this.movieTitle = '';
    },
  },
  created() {
    this.movieTitle = this.$route.query.search as string;
    this.setIsFavoritePage();
  },
  watch: {
    '$route.name'(newName, oldName) {
      this.setIsFavoritePage(newName);
      this.resetSearchField();
    },
    $route(to, from) {
      // This method will be called whenever the route changes
      if (
        to.name !== from.name ||
        (to.path === from.path && isObjectEmpty(to.query))
      ) {
        this.resetSearchField();
      }
    },
  },
});
</script>

<style scoped lang="scss">
/* Add your styles here */
::v-deep.topnavbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  &__logo {
    width: 100px;
    &:hover {
      cursor: pointer;
    }
    .v-toolbar-title {
      display: block;
    }
  }
}

/* SM, MD, LG, XL */
@media screen and (min-width: 769px) {
  ::v-deep.topnavbar {
    &__logo {
      width: 230px;
    }
  }
}

/* Mobile */
@media screen and (max-width: 768px) {
  ::v-deep.topnavbar {
    .v-toolbar__title {
      display: none;
    }
  }
}
</style>
