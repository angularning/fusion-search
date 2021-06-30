import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../lib/theme/index.css'
// import modals from '../packages/fusion-search/utils/modals'
// import { $get, $post } from '../packages/fusion-search/utils/axios'
import FusionSearch from '../lib/index.js'
// Vue.use(modals)
Vue.use(FusionSearch)
Vue.use(ElementUI)
// Vue.prototype.$post = $post
// Vue.prototype.$get = $get
Vue.prototype.$EventBus = new Vue()
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
