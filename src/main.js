// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//完整引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import '@/assets/icon/iconfont.css'

// 引入store
import store from './store';

Vue.config.productionTip = false;
//开启debug模式
Vue.config.debug = true;

//完整引入element
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data: {
    eventHub: new Vue()
  },
  components: { App },
  template: '<App/>'
})
