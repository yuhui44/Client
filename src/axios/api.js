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
// 获得用户信息
export function getUserInfo() {
  return fetch({
    url: '/api/userInfo',
    method: 'get'
  })
};
//修改用户信息
export function postUserInfo(data) {
  return fetch({
    url: '/api/userInfo',
    method: 'post',
    data
  })
};
// 发送验证邮件
export function resendEmail() {
  return fetch({
    url: '/api/resendEmail',
    method: 'get'
  })
};
//对验证邮件链接进行验证
export function checkEmailToken(data) {
  return fetch({
    url: '/api/checkEmailToken',
    method: 'post',
    data
  })
}
// 修改用户密码
export function changePass(data) {
  return fetch({
    url: '/api/changePass',
    method: 'post',
    data
  })
};
// 修改邮箱
export function changeEmail(data) {
  return fetch({
    url: '/api/changeEmail',
    method: 'post',
    data
  })
}
// 忘记密码
export function forgetPass(data) {
  return fetch({
    url: '/api/forgetPass',
    method: 'post',
    data
  })
}
// 重置密码1
export function resetPass1(data) {
  return fetch({
    url: '/api/resetPass1',
    method: 'post',
    data
  })
}
// 重置密码2
export function resetPass2(data) {
  return fetch({
    url: '/api/resetPass2',
    method: 'post',
    data
  })
}
// 获取所有用户信息
export function getUsersInfo() {
  return fetch({
    url: '/api/usersInfo',
    method: 'get'
  })
};

// 获取个人产权信息
export function getPropertysInfo() {
  return fetch({
    url: '/api/propertys',
    method: 'get'
  })
};

// 获产权信息详情
export function getPropertyInfo(params) {
  return fetch({
    url: '/api/property',
    method: 'get',
    params
  })
};

// 更新产权信息
export function postPropertyInfo(data) {
  return fetch({
    url: '/api/property',
    method: 'post',
    data
  })
};

// 管理员获取所有用户产权信息
export function getAllPropertysInfo() {
  return fetch({
    url: '/api/allPropertys',
    method: 'get'
  })
}

// 获取首页产权列表
export function getIndexPropertysInfo() {
  return fetch({
    url: '/api/indexPropertys',
    method: 'get'
  })
}