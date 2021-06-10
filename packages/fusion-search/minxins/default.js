import Vue from 'vue'

Vue.prototype.$EventBus = new Vue()
export default {
  methods: {
    search(value) {
      console.log('search', value)
      this.$EventBus.$emit('fusion-search', value)
      console.log(this)
    }
  }
}
