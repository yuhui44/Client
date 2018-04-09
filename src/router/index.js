import Vue from 'vue'
import Router from 'vue-router'

//引入组件
import HelloWorld from '@/components/HelloWorld'
//前台
//前台框架
import ShowMain from '@/components/Show/Main';
import ShowIndex from '@/components/Show/Index';
import ValiEmail from '@/components/Show/ValiEmail';
import ResetPass from '@/components/Show/ResetPass';
//用户后台
//用户后台框架
import UserMain from '@/components/User/Main';
import UserIndex from '@/components/User/Index';
import UserInfo from '@/components/User/Info';
import UserSafe from '@/components/User/Safe';
import UsersInfo from '@/components/User/Users';

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
      path: '',
      component: ShowMain,
      children: [
        {
          path: '',
          component: ShowIndex
        },
        {
          path: 'valiEmail/:token',
          component: ValiEmail
        },
        {
          path: 'resetPass/:token',
          component: ResetPass
        }
      ]
    },
    {
      path: '/user',
      component: UserMain,
      children: [
        {
          path: '',
          component: UserIndex
        },
        {
          path: 'info',
          component: UserInfo
        },
        {
          path: 'safe',
          component: UserSafe
        },
        {
          path: 'users',
          component: UsersInfo
        }
      ]
    }
  ]
})
