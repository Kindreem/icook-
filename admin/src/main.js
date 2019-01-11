// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueDND from 'awe-dnd'
import {bus} from './bus';
import store1 from './store';
import {store} from './vuex'
Vue.prototype.$_store=store1;
Vue.prototype.$bus=bus;
Vue.use(VueDND)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

