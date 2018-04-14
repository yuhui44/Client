import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

Vue.use(Vuex);

const state = {
  username: '',
  isAdmin: false,
  isLogin: false,
  loginDialog: false
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});