// import FileHandle from '../packages/file-handle/index'
// import TestModule from '../packages/test-module/index'
import FusionSearch from '../packages/fusion-search/index'
import { version } from '../package.json'

// const components = [FileHandle, TestModule, FusionSearch]
const components = [FusionSearch]
const install = function (Vue) {
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
