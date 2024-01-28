<template>
  <v-app>
    <v-app-bar app>
      <top-nav-bar />
    </v-app-bar>

    <v-main>
      <v-snackbar
        v-if="$vuetify.breakpoint.width > 768"
        :timeout="1000"
        :value="getStatus"
        right
        color="green darken-1"
        class="notification"
        @input="onNotificationChange"
        top
        transition="scroll-x-reverse-transition"
      >
        {{ getMessage }}
      </v-snackbar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex';

export default Vue.extend({
  name: 'App',
  components: {
    TopNavBar: () => import('@/components/layouts/TopNavBar.vue'),
    MovieCard: () => import('@/components/base/MovieCard.vue'),
  },
  computed: {
    ...mapGetters('notification', ['getStatus', 'getMessage']),
  },
  data: () => ({}),
  methods: {
    ...mapMutations('notification', ['RESET_NOTIFICATION']),
    onNotificationChange(value: boolean) {
      if (!value) this.RESET_NOTIFICATION(true);
    },
  },
  watch: {},
});
</script>

<style scoped lang="scss">
::v-deep.v-main {
  padding: 26px 0px 0px !important;
}

/* Mobile */
@media screen and (min-width: 769px) {
  ::v-deep.v-main {
    padding-top: 0px !important;
    .notification {
      top: 90px;
    }
  }
}
</style>
