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
import ShowProperty from '@/components/Show/Property';
//用户后台
//用户后台框架
import UserMain from '@/components/User/Main';
import UserIndex from '@/components/User/Index';
import UserInfo from '@/components/User/Info';
import UserSafe from '@/components/User/Safe';
import UserInfos from '@/components/User/Infos';
import UserProperty from '@/components/User/Property';
import UserPropertys from '@/components/User/Propertys';
import UserWants from '@/components/User/Wants';
import UserNeeds from '@/components/User/Needs';
import UserAllWants from '@/components/User/AllWants';

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
        },
        {
          path: 'property/:id',
          component: ShowProperty
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
          path: 'infos',
          component: UserInfos
        },
        {
          path: 'property',
          component: UserProperty
        },
        {
          path: 'propertys',
          component: UserPropertys
        },
        {
          path: 'wants',
          component: UserWants
        },
        {
          path: 'needs',
          component: UserNeeds
        },
        {
          path: 'allWants',
          component: UserAllWants
        }
      ]
    }
  ]
})
