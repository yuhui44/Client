import fetch from "./fetch"; //引用fetch.js


//用户登录
export function userRegister(username, password) {
  return fetch({
    url: '/api/register',
    method: 'post',//请求方法
    data:{
      username, //传过去的参数
      password
    }
  })
}

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