import createLogger from '@/plugins/logger';
import Vue from 'vue';
import Vuex from 'vuex';
import movie from './modules/movie';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    movie,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
