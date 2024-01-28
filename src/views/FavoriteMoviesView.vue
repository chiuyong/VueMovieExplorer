<template>
  <v-layout align-center class="h-full">
    <v-container fluid>
      <div v-if="getMovies">
        <movie-card
          v-for="(movie, index) in getMovies"
          :key="index"
          :id="movie?.imdbID"
          :image="movie?.Poster"
          :title="movie?.Title"
          :year="movie?.Year"
          :director="movie?.Director"
          :runtime="movie?.Runtime"
          :genre="movie?.Genre"
          :plot="movie?.Plot"
          :isFavorited="true"
          :rating="movie?.rating"
          @favorited="updateFavoriteList"
          @rated="updateRating($event, movie?.imdbID)"
        ></movie-card>
      </div>
      <div v-else>
        <h1 class="text-center">Empty Moviee</h1>
      </div>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex';

export default Vue.extend({
  name: 'FavoriteMoviesView',
  components: {
    MovieCard: () => import('@/components/base/MovieCard.vue'),
  },
  computed: {
    ...mapGetters('favoriteMovies', [
      'getMovies',
      'getMovieLoading',
      'getMovieError',
    ]),
  },

  data: () => ({
    dialog: false,
  }),
  methods: {
    ...mapMutations('favoriteMovies', ['SET_MOVIES']),
    ...mapMutations('notification', [
      'SET_NOTIFICATION_STATUS',
      'SET_NOTIFICATION_MESSAGE',
    ]),
    updateFavoriteList(id: string) {
      const updatedList = this.getMovies.filter(
        (movie: { imdbID: string }) => movie.imdbID !== id
      );
      this.sendNotification(true, 'Movie removed from favorites');
      this.SET_MOVIES(updatedList);
    },
    sendNotification(status: Boolean, message: string): void {
      this.SET_NOTIFICATION_STATUS(status);
      this.SET_NOTIFICATION_MESSAGE(message);
    },
    updateRating(stars: number, id: string): void {
      const updatedList = this.getMovies.map((movie: { imdbID: string }) => {
        if (movie.imdbID === id) {
          return {
            ...movie,
            rating: stars,
          };
        }
        return movie;
      });
      this.SET_MOVIES(updatedList);
      this.sendNotification(true, 'Movie rated successfully');
    },
  },
  async created() {},
  watch: {},
});
</script>
