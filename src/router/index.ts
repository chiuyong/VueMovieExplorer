import FavoriteMoviesView from '@/views/FavoriteMoviesView.vue';
import MovieView from '@/views/MovieView.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'movieView',
      component: MovieView,
      props: route => ({ search: route.query.search }),
    },
    {
      path: '/favorite-movies',
      name: 'favoriteMoviesView',
      component: FavoriteMoviesView,
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   if (to.path === from.path) {
//     next(false); // prevent redundant navigation by calling next(false)
//   } else {
//     next(); // proceed with the navigation
//   }
// });

export default router;
