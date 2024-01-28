/** Vue main script */
import store from '@/store';
import Vue from 'vue';

import App from '@/App.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/router';
import 'vuetify/dist/vuetify.min.css';
Vue.config.productionTip = false;

const vue = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
});

// Run!
vue.$mount('#app');
