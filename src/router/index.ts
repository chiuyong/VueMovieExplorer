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
      name: 'movie',
      component: MovieView,
      props: route => ({ search: route.query.search }),
    },
  ],
});

export default router;
