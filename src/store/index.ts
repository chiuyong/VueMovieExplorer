import createLogger from '@/plugins/logger';
import Vue from 'vue';
import Vuex from 'vuex';
import movies from './modules/movies';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    movies,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
