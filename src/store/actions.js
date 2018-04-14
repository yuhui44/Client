import * as types from './types.js'
// import { userStatus } from "@/axios/api.js"

export default {
  setStatus({ commit }, data) {
    commit(
      types.STATUS,
      {
        username: data.username,
        isLogin: data.isLogin,
        isAdmin: data.isAdmin
      }
    );
  },
  loginDialog({ commit }) {
    commit(
      types.DIALOG,
      {
        loginDialog: !loginDialog
      }
    );
  },
  // removeStatus({ commit }) {
  //   commit(
  //     types.STATUS,
  //     {
  //       username: '',
  //       isLogin: false,
  //       isAdmin: false
  //     }
  //   );
  // },
}