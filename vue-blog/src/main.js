import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import BaseFunc from './common/Basefunc'

import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
Vue.use(ElementUI); //使用elementUI

// Vue.use(ElementUI,  { size: 'small', zIndex: 3000 }); //使用elementUI

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