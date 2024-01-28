import createLogger from '@/plugins/logger';
import Vue from 'vue';
import Vuex from 'vuex';
import favoriteMovies from './modules/favoriteMovies';
import movie from './modules/movie';
import notification from './modules/notification';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    movie,
    favoriteMovies,
    notification,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
