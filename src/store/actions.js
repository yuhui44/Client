import * as types from './types.js'
import { userStatus } from "@/axios/api.js"

export default {
  UserStatus({ commit }) {
    return new Promise((resolve, reject) => {
      userStatus()
        .then(res => {
          commit(types.STATUS, {
            username: res.data.username,
            isLogin: res.data.isLogin,
            isAdmin: res.data.isAdmin
          });
          resole(res);
        })
        .catch(err => {
          reject(err);
        });
    })
  }
}