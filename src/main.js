import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/store";

import FastClick from 'fastclick';
import VueLazyload from "vue-lazyload";
import Toast from 'components/common/toast';

Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue();

//弹框
Vue.use(Toast);

//图片懒加载
Vue.use(VueLazyload, {
  loading: require('assets/img/common/placeholder.png'),
});

//解决移动端300ms延迟
FastClick.attach(document.body);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
