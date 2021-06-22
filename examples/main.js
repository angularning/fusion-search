import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../lib/theme/index.css'
import modals from '../packages/fusion-search/utils/modals'
Vue.use(modals)
// import FusionSearch from '../lib/index.js'
// import FusionSearch from '../packages/fusion-search/src/index'
// Vue.use(FusionSearch)
Vue.use(ElementUI)
Vue.prototype.$EventBus = new Vue()
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
