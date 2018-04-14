import fetch from "./fetch"; //引用fetch.js


//用户注册
export function userRegister(data) {
  return fetch({
    url: 'register',
    method: 'post',//请求方法
    data
  })
}
//用户登录
export function userLogin(data) {
  return fetch({
    url: 'login',
    method: 'post',
    data
  })
};
//用户退出登录
export function userLogout() {
  return fetch({
    url: 'logout',
    method: 'post'
  })
};
// 用户状态查询
export function userStatus() {
  return fetch({
    url: 'userStatus',
    method: 'get'
  })
};
// 获得用户信息
export function getUserInfo() {
  return fetch({
    url: 'userInfo',
    method: 'get'
  })
};
//修改用户信息
export function postUserInfo(data) {
  return fetch({
    url: 'userInfo',
    method: 'post',
    data
  })
};
// 发送验证邮件
export function resendEmail() {
  return fetch({
    url: 'resendEmail',
    method: 'get'
  })
};
//对验证邮件链接进行验证
export function checkEmailToken(data) {
  return fetch({
    url: 'checkEmailToken',
    method: 'post',
    data
  })
}
// 修改用户密码
export function changePass(data) {
  return fetch({
    url: 'changePass',
    method: 'post',
    data
  })
};
// 修改邮箱
export function changeEmail(data) {
  return fetch({
    url: 'changeEmail',
    method: 'post',
    data
  })
}
// 忘记密码
export function forgetPass(data) {
  return fetch({
    url: 'forgetPass',
    method: 'post',
    data
  })
}
// 重置密码1
export function resetPass1(data) {
  return fetch({
    url: 'resetPass1',
    method: 'post',
    data
  })
}
// 重置密码2
export function resetPass2(data) {
  return fetch({
    url: 'resetPass2',
    method: 'post',
    data
  })
}
// 获取所有用户信息
export function getUsersInfo() {
  return fetch({
    url: 'usersInfo',
    method: 'get'
  })
};

// 获取个人产权信息
export function getPropertysInfo() {
  return fetch({
    url: 'propertys',
    method: 'get'
  })
};

// 获产权信息详情
export function getPropertyInfo(params) {
  return fetch({
    url: 'property',
    method: 'get',
    params
  })
};

// 更新产权信息
export function postPropertyInfo(data) {
  return fetch({
    url: 'property',
    method: 'post',
    data
  })
};

// 管理员获取所有用户产权信息
export function getAllPropertysInfo() {
  return fetch({
    url: 'allPropertys',
    method: 'get'
  })
}

// 获取首页产权列表
export function getIndexPropertysInfo(params) {
  return fetch({
    url: 'indexPropertys',
    method: 'get',
    params
  })
}

// 获取首页产权详情
export function getIndexPropertyInfo(params) {
  return fetch({
    url: 'indexProperty',
    method: 'get',
    params
  })
}

// 发送产权意向
export function postIndexWantInfo(data) {
  return fetch({
    url: 'indexWant',
    method: 'post',
    data
  })
}

// 获取收到的意向
export function getWantsInfo(params) {
  return fetch({
    url: 'wants',
    method: 'get',
    params
  })
}

// 获取发出的意向
export function getNeedsInfo() {
  return fetch({
    url: 'needs',
    method: 'get'
  })
}

// 管理员获取所有的意向
export function getAllWantsInfo() {
  return fetch({
    url: 'allWants',
    method: 'get'
  })
}


