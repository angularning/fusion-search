import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FusionSearch from '../lib/index.js'
Vue.use(FusionSearch)
import '../lib/theme/index.css'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
