const iterator = require.context('./modals', true, /\.(vue)/)
const keys = iterator.keys()
const modals = {}
keys.map(iterator).forEach((_item, i) => {
  const item = _item.default
  // ./Example.vue
  const name = keys[i].slice(2, -4);
  if (item.name) {
    modals[item.name] = item
  } else {
    modals[name] = item
  }
})
const instances = {}
export default {
  install (Vue) {
    Vue.mixin({
      beforeCreate () {
        const store = this.$options.store
        const router = this.$options.router
        this.$modal = function (name, options = {}) {
          const Ctor = Vue.extend(modals[name])
          options.store = store || options.$store
          options.router = router || options.$router
          Ctor.prototype.router = router || options.$router
          const modal = new Ctor(options).$mount();
          (instances[name] || (instances[name] = [])).push(modal)
          // eslint-disable-next-line nuxt/no-globals-in-created
          document.body.appendChild(modal.$el)
          const promise = new Promise((resolve, reject) => {
            modal.$once('confirm', (val) => {
              modal.$off('cancel')
              resolve(val)
            })
            modal.$once('cancel', (val) => {
              modal.$off('confirm')
              // reject(val)
            })
          })
          return promise
        }
        this.$modal_close = function (name) {
          const instance = instances[name].shift()
          if (instance) {
            instance.$el.parentNode.removeChild(instance.$el)
          }
        }
      }
    })
  }
}
