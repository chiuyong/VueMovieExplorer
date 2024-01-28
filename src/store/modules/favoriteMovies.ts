import { fetchMovieByTitle } from '@/services/movieService';

// initial state
const state = () => ({
  movies: [],
  searchQuery: '',
  loading: false,
  error: '',
});

// getters
const getters = {
  getMovies: (state: any) => state.movies as Array<any>,
  getMovieLoading: (state: any) => state.loading,
  getMovieError: (state: any) => state.error,
};

// actions
const actions = {
  async fetchMovie({ commit }: any, title: string) {
    try {
      commit('SET_LOADING_MOVIE', true);
      const response = await fetchMovieByTitle(title);
      if (response.data.Response === 'False')
        commit('SET_ERROR_MOVIE', response.data.Error);
      else {
        commit('SET_MOVIE', response.data);
        commit('SET_ERROR_MOVIE', '');
      }
    } catch (error) {
      console.error(error);
    } finally {
      commit('SET_LOADING_MOVIE', false);
    }
  },
  setSearchQuery({ commit }: any, query: string) {
    commit('SET_SEARCH_QUERY', query);
  },
};

// mutations
const mutations = {
  SET_LOADING_MOVIE(state: any, payload: boolean) {
    state.loading = payload;
  },
  SET_ERROR_MOVIE(state: any, payload: string) {
    state.error = payload;
  },
  SET_MOVIES: (state: any, payload: Array<any>) => {
    state.movies = payload;
  },
  SET_MOVIE_RATING: (state: any, payload: Array<any>) => {
    state.movies = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
