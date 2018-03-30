import fetch from "./fetch"; //引用fetch.js


//用户注册
export function userRegister(data) {
  return fetch({
    url: '/api/register',
    method: 'post',//请求方法
    data
  })
}
//用户登录
export function userLogin(data) {
  return fetch({
    url: '/api/login',
    method: 'post',
    data
  })
};
//用户退出登录
export function userLogout() {
  return fetch({
    url: '/api/logout',
    method: 'post'
  })
};
// 用户状态查询
export function userStatus() {
  return fetch({
    url: '/api/userStatus',
    method: 'get'
  })
};



//有新接口的时候像上面那样再来一次
// //修改昵称接口
// export function userID(name){
//   return fetch({
//     url:api.myself_name,
//     method:"put",
//     data:{
//       nickname:name
//     }
//   })
// }
//
//
// //取消转发赞踩接口
// export function cancelForward(articleId,type){
//   return fetch({
//     url:api.detail_article+articleId+"/forwarded_impress",
//     method:"delete",
//     params:{
//       type:type
//     }
//   })
// }