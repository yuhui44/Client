import Vue from 'vue'
import Router from 'vue-router'

//引入组件
// //前台
// //前台框架
// import ShowMain from '@/components/Show/Main';
// import ShowIndex from '@/components/Show/Index';
// import ValiEmail from '@/components/Show/ValiEmail';
// import ResetPass from '@/components/Show/ResetPass';
// import ShowProperty from '@/components/Show/Property';
// //用户后台
// //用户后台框架
// import UserMain from '@/components/User/Main';
// import UserIndex from '@/components/User/Index';
// import UserInfo from '@/components/User/Info';
// import UserSafe from '@/components/User/Safe';
// import UserInfos from '@/components/User/Infos';
// import UserProperty from '@/components/User/Property';
// import UserPropertys from '@/components/User/Propertys';
// import UserWants from '@/components/User/Wants';
// import UserNeeds from '@/components/User/Needs';
// import UserAllWants from '@/components/User/AllWants';

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
      // component: ShowMain,
      component:resolve => require(['@/components/Show/Main'],resolve),
      children: [
        {
          path: '',
          // component: ShowIndex,
          component:resolve => require(['@/components/Show/Index'],resolve)
        },
        {
          path: 'valiEmail/:token',
          // component: ValiEmail,
          component:resolve => require(['@/components/Show/ValiEmail'],resolve)
        },
        {
          path: 'resetPass/:token',
          // component: ResetPass,
          component:resolve => require(['@/components/Show/ResetPass'],resolve)
        },
        {
          path: 'property/:id',
          // component: ShowProperty,
          component:resolve => require(['@/components/Show/Property'],resolve)
        }
      ]
    },
    {
      path: '/user',
      // component: UserMain,
      component:resolve => require(['@/components/User/Main'],resolve),
      children: [
        {
          path: '',
          // component: UserIndex,
          component:resolve => require(['@/components/User/Index'],resolve)
        },
        {
          path: 'info',
          // component: UserInfo,
          component:resolve => require(['@/components/User/Info'],resolve)
        },
        {
          path: 'safe',
          // component: UserSafe,
          component:resolve => require(['@/components/User/Safe'],resolve)
        },
        {
          path: 'infos',
          // component: UserInfos,
          component:resolve => require(['@/components/User/Infos'],resolve)
        },
        {
          path: 'property',
          // component: UserProperty,
          component:resolve => require(['@/components/User/Property'],resolve)
        },
        {
          path: 'propertys',
          // component: UserPropertys,
          component:resolve => require(['@/components/User/Propertys'],resolve)
        },
        {
          path: 'wants',
          // component: UserWants,
          component:resolve => require(['@/components/User/Wants'],resolve)
        },
        {
          path: 'needs',
          // component: UserNeeds,
          component:resolve => require(['@/components/User/Needs'],resolve)
        },
        {
          path: 'allWants',
          // component: UserAllWants,
          component:resolve => require(['@/components/User/AllWants'],resolve)
        }
      ]
    }
  ]
})
