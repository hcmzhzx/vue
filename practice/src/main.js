import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index'

Vue.config.productionTip = false;

// 配置默认地址
axios.defaults.baseURL = 'https://wd0760838031xgmfir.wilddogio.com/';
// 配置Vue原型
Vue.prototype.$http = axios;

//全局守卫 to:去哪 from:离开 next:函数
// router.beforeEach((to,from,next) => {
    /*alert('还没登录');
    next();*/
// });

//后置钩子
// router.afterEach((to,from) =>{

// });

/* eslint-disable no-new */
new Vue({
   el: '#app',
   router,
   store,
   components: { App },
   template: '<App/>'
});
