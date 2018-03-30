// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//完整引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//部分引入element
// import { Container, Header, Aside, Main, Footer, Button, Dropdown, DropdownItem, DropdownMenu } from 'element-ui';
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
//部分引入element
// Vue.use(Container);
// Vue.use(Header);
// Vue.use(Aside);
// Vue.use(Main);
// Vue.use(Footer);
// Vue.use(Button);
// Vue.use(Dropdown);
// Vue.use(DropdownMenu);
// Vue.use(DropdownItem);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
