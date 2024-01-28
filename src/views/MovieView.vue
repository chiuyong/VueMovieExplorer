<template>
  <v-layout align-center class="h-full">
    <v-container fluid>
      <v-dialog
        v-if="!!getMovieError"
        v-model="dialog"
        hide-overlay
        persistent
        width="300"
      >
        <v-alert
          :value="!!getMovieError"
          type="error"
          dark
          transition="slide-y-reverse-transition"
        >
          {{ getMovieError }}
        </v-alert>
      </v-dialog>
      <v-skeleton-loader
        v-else-if="getMovieLoading"
        class="mx-auto grey darken-2"
        max-width="800"
        type="card, list-item-three-line"
        dark
      ></v-skeleton-loader>
      <movie-card
        v-else-if="!getMovieLoading && getMovie"
        :id="getMovie?.imdbID"
        :image="getMovie?.Poster"
        :title="getMovie?.Title"
        :year="getMovie?.Year"
        :director="getMovie?.Director"
        :runtime="getMovie?.Runtime"
        :genre="getMovie?.Genre"
        :plot="getMovie?.Plot"
        :isFavorited="isFavorited"
        @favorited="updateFavoriteList"
      ></movie-card>
      <div v-else>
        <h1 class="text-center">Empty Movie</h1>
      </div>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { isObjectEmpty } from '@/utils/object';
import Vue from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default Vue.extend({
  name: 'HomeView',
  components: {
    MovieCard: () => import('@/components/base/MovieCard.vue'),
  },
  props: {
    search: String,
  },
  computed: {
    ...mapGetters('movie', ['getMovie', 'getMovieLoading', 'getMovieError']),
    ...mapGetters('favoriteMovies', ['getMovies']),
  },

  data: () => ({
    dialog: false,
    isFavorited: false,
  }),
  methods: {
    ...mapActions('movie', ['fetchMovie']),
    ...mapMutations('favoriteMovies', ['SET_MOVIES']),
    ...mapMutations('movie', ['RESET_STORE']),
    ...mapMutations('notification', [
      'SET_NOTIFICATION_STATUS',
      'SET_NOTIFICATION_MESSAGE',
    ]),

    updateFavoriteList(id: string) {
      if (this.isFavorited) {
        this.removeFavorite(id);
        this.isFavorited = false;
        this.sendNotification(true, 'Movie removed from favorites');
      } else {
        this.addToFavorite(this.getMovie);
        this.isFavorited = true;
        this.sendNotification(true, 'Movie added to favorites');
      }
    },
    removeFavorite(id: string) {
      const updatedList = this.getMovies.filter((movie: { imdbID: string }) => {
        if (movie.imdbID !== id) {
          return {
            ...movie,
            rating: 0,
          };
        }
      });
      this.SET_MOVIES(updatedList);
    },
    addToFavorite(movie: any) {
      const updatedList = [...this.getMovies, movie];
      this.SET_MOVIES(updatedList);
    },
    handleRouteChange() {
      this.RESET_STORE(true);
    },
    sendNotification(status: Boolean, message: string): void {
      this.SET_NOTIFICATION_STATUS(status);
      this.SET_NOTIFICATION_MESSAGE(message);
    },
  },
  async created() {
    if (this.search) {
      await this.fetchMovie(this.search);
    }
  },
  beforeDestroy() {
    this.RESET_STORE(true);
  },
  watch: {
    async search(newVal, oldVal) {
      if (newVal) {
        await this.fetchMovie(newVal);
      }
    },
    getMovieError(newVal, oldVal) {
      if (newVal) {
        this.dialog = true;
      }
    },
    getMovie(newVal, oldVal) {
      if (newVal) {
        this.isFavorited = !!this.getMovies.find(
          (movie: { imdbID: string }) => movie.imdbID === newVal.imdbID
        );
      }
    },
    $route(to, from) {
      // This method will be called whenever the route changes
      if (to.name === from.name && isObjectEmpty(to.query)) {
        this.handleRouteChange();
      }
    },
  },
});
</script>
