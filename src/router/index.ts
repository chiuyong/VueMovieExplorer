import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL || '/',
  routes: [{ path: '*', redirect: '/' }],
});

export default router;