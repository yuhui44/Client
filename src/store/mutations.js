import * as types from './types.js';

const mutations = {
  [types.STATUS]: (state, data) => {
    state.username = data.username;
    state.isLogin = data.isLogin;
    state.isAdmin = data.isAdmin;
  }
};

export default mutations;