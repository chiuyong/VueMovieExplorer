// initial state
const state = () => ({
  status: false,
  message: '',
});

// getters
const getters = {
  getStatus: (state: any) => state.status as Boolean,
  getMessage: (state: any) => state.message as string,
};

// actions
const actions = {};

// mutations
const mutations = {
  SET_NOTIFICATION_STATUS(state: any, payload: boolean) {
    state.status = payload;
  },
  SET_NOTIFICATION_MESSAGE(state: any, payload: string) {
    state.message = payload;
  },
  RESET_NOTIFICATION(state: any, payload: boolean) {
    if (payload) {
      state.status = false;
      state.message = '';
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
