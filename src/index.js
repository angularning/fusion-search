import FusionSearch from '../packages/fusion-search/index'
import { version } from '../package.json'
import element from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
const components = [FusionSearch]
const install = function(Vue) {
  Vue.prototype.$EventBus = new Vue()
  Vue.prototype.$axios = axios
  Vue.use(axios)
  Vue.use(element)
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

export default { version, install, FusionSearch }
