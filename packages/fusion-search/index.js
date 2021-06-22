import FusionSearch from './src/index'
import element from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import GlobalModal from './utils/modals'
const components = [FusionSearch]
const install = function(Vue) {
  Vue.prototype.$EventBus = new Vue()
  Vue.use(element)
  Vue.use(GlobalModal)
  Vue.prototype.$axios = axios
  Vue.use(axios)
  // 判断是否安装
  if (install.installed) {
    return
  }
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { install, FusionSearch }
