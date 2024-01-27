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
      ></movie-card>
      <div v-else>
        <h1 class="text-center">Empty Movie</h1>
      </div>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

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
  },

  data: () => ({
    dialog: false,
    movie: {
      id: '1',
      image:
        'https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg',
      title: 'Star Wars: Episode IV - A New Hope',
      year: '1977',
      director: 'George Lucas',
      runtime: '2h 22min',
      genre: 'Action, Adventure, Fantasy',
      plot: 'The Imperial Forces, under orders from cruel Darth Vader, hold Princess Leia hostage in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker and Han Solo, captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 and C-3PO to rescue the beautiful princess, help the Rebel Alliance and restore freedom and justice to the Galaxy.',
    },
  }),
  methods: {
    ...mapActions('movie', ['fetchMovie']),
  },
  async created() {
    if (this.search) {
      await this.fetchMovie(this.search);
    }
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
        setTimeout(() => (this.dialog = false), 4000);
      }
    },
  },
});
</script>
