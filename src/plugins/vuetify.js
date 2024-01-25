import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import pt from 'vuetify/lib/locale/pt';
import Vuex from 'vuex';

Vue.use(Vuetify);
Vue.use(Vuex);

export default new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt',
  },
});
