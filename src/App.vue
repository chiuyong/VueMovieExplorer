<template>
  <v-app>
    <v-app-bar app>
      <top-nav-bar />
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <movie-card
          :id="movie.id"
          :image="movie.image"
          :title="movie.title"
          :year="movie.year"
          :director="movie.director"
          :runtime="movie.runtime"
          :genre="movie.genre"
          :plot="movie.plot"
        ></movie-card>
        <!-- <router-view /> -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  components: {
    TopNavBar: () => import('@/components/layouts/TopNavBar.vue'),
    MovieCard: () => import('@/components/base/MovieCard.vue'),
  },
  data: () => ({
    //
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
});
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
}

html,
body {
  font-size: 0.75rem;
  font-weight: 400;
}
</style>
