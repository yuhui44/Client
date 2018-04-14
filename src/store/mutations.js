import * as types from './types.js';

const mutations = {
  [types.STATUS]: (state, data) => {
    state.username = data.username;
    state.isLogin = data.isLogin;
    state.isAdmin = data.isAdmin;
  },
  // [types.LOGOUT]: (state) => {
  //   state.username = '';
  //   state.isLogin = false;
  //   state.isAdmin = false;
  // },
  [types.DIALOG]: (state) => {
    state.loginDialog = !state.loginDialog;
  },
};

export default mutations;