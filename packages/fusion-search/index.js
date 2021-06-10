import FusionSearch from './src/index.vue'

FusionSearch.install = (vue) => {
  vue.component(name, FusionSearch)
}

export default FusionSearch
