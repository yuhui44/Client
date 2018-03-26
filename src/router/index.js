import Vue from 'vue'
import Router from 'vue-router'

//引入组件
import HelloWorld from '@/components/HelloWorld'
//前台
//前台框架
import ShowMain from '@/components/Show/Main';
//用户后台
//用户后台框架
import UserMain from '@/components/User/Main';
//管理后台
//管理后台框架
import AdminMain from '@/components/Admin/Main';

//挂载router实例
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      component: ShowMain
    },
    {
      path: '/user',
      component: UserMain
    },
    {
      path: '/admin',
      component: AdminMain
    },
    // {
    //   path: '/',
    //   // name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ]
})
