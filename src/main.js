import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'
Vue.use(Element)

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (window._axiosPromiseArr) {
    window._axiosPromiseArr.forEach((ele, index) => {
      ele.cancel()
      delete window._axiosPromiseArr[index]
    })
  }
  next()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
