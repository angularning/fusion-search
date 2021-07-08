import FusionSearch from '../packages/fusion-search/index'
import { version } from '../package.json'
import { $post, $get } from '../packages/fusion-search/utils/axios'
const components = [FusionSearch]
const install = function(Vue) {
  Vue.prototype.$EventBus = new Vue()
  Vue.prototype.$post = $post
  Vue.prototype.$get = $get
  // Vue.use(element)
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
