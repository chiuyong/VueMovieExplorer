// src/components/__tests__/MovieView.spec.ts
import MovieCard from '@/components/base/MovieCard.vue';
import favoriteMovies from '@/store/modules/favoriteMovies';
import movie from '@/store/modules/movie';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import Vuex, { Store } from 'vuex';
import MovieView from '../views/MovieView.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const mockedMovie = {
  Title: 'Sonic',
  Year: '2013',
  Runtime: '18 min',
  Genre: 'Short, Action, Adventure',
  Director: 'Eddie Lebron',
  Plot: 'The evil Dr. Robotnik takes over the planet Mobius, and it is up to Sonic the Hedgehog to put a stop to his evil plans.',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BZWJkMTU5MjUtNGFmOC00NDFmLTk3NGYtMDgzMDY1NmI5NmFiXkEyXkFqcGdeQXVyMzYzNzc1NjY@._V1_SX300.jpg',
  imdbID: 'tt2622500',
  Response: 'True',
};

describe('MovieView.vue', () => {
  let store: Store<any>;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        movie,
        favoriteMovies,
      },
    });
  });

  /* Component Behavior Tests*/
  it('renders a default message when no movie is loaded', () => {
    store.commit('movie/SET_MOVIE', null);
    const wrapper = shallowMount(MovieView, { localVue, store });
    expect(wrapper.text()).toContain('Empty Movie');
  });

  it('renders error dialog when getMovieError is present', () => {
    // Simulate a state where there is an error
    store.commit('movie/SET_ERROR_MOVIE', 'Movie not found!');

    const wrapper = shallowMount(MovieView, {
      localVue,
      store,
      stubs: {
        MovieCard,
      },
    });

    expect(wrapper.findComponent({ name: 'VDialog' }).isVisible()).toBe(true);
    expect(wrapper.text()).toContain('Movie not found!');
  });

  it('renders loading skeleton when getMovieLoading is true', () => {
    store.commit('movie/SET_LOADING_MOVIE', true);

    const wrapper = shallowMount(MovieView, {
      localVue,
      store,
      stubs: {
        MovieCard,
      },
    });

    expect(wrapper.findComponent({ name: 'VSkeletonLoader' }).exists()).toBe(
      true
    );
  });

  it('renders MovieCard component when a movie is loaded', () => {
    store.commit('movie/SET_MOVIE', mockedMovie);

    const wrapper = shallowMount(MovieView, {
      localVue,
      store,
      stubs: {
        MovieCard,
      },
    });
    // Access the 'getMovie' getter directly from the store
    const { imdbID, Poster, Title, Year, Director, Runtime, Genre, Plot } =
      store.getters['movie/getMovie'];

    expect(wrapper.findComponent(MovieCard).exists()).toBe(true);
    expect(wrapper.findComponent(MovieCard).props().id).toBe(imdbID);
    expect(wrapper.findComponent(MovieCard).props().image).toBe(Poster);
    expect(wrapper.findComponent(MovieCard).props().title).toBe(Title);
    expect(wrapper.findComponent(MovieCard).props().year).toBe(Year);
    expect(wrapper.findComponent(MovieCard).props().director).toBe(Director);
    expect(wrapper.findComponent(MovieCard).props().runtime).toBe(Runtime);
    expect(wrapper.findComponent(MovieCard).props().genre).toBe(Genre);
    expect(wrapper.findComponent(MovieCard).props().plot).toBe(Plot);
  });

  it('adds a movie to favorites', async () => {
    store.commit('movie/SET_MOVIE', mockedMovie);
    const wrapper = shallowMount(MovieView, {
      localVue,
      store,
      stubs: {
        MovieCard,
      },
    });
    const { imdbID } = store.getters['movie/getMovie'];

    // Find MovieCard component and simulate emitting the 'favorited' event
    const movieCardWrapper = wrapper.findComponent(MovieCard);
    movieCardWrapper.vm.$emit('favorited', mockedMovie.imdbID);

    await wrapper.vm.$nextTick(); // Wait for Vue to process the event

    wrapper.vm.updateFavoriteList(imdbID);
  });
});
