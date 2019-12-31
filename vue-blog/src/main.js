import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import BaseFunc from './common/Basefunc'

Vue.config.productionTip = false;
Vue.prototype.BaseFunc = BaseFunc;

// router.beforeEach((to, form, next) => {
//   to.query.meta = to.meta;
//   return next();
// });

// router.afterEach(() => {
//   console.error(to.meta.parent_title, to.meta.title);
// });

new Vue({
  render: h => h(App),
  router
}).$mount('#app');