<template>
  <div :id="id" ref="ChartRoot" :style="chartStyle" />
</template>
<script>
function isEmpty(value) {
  return value === null || value === undefined || value === '' || JSON.stringify(value) === '{}'
}

function debounce(fn, wait) {
  let timer = null,
    _this = this
  return function(...arg) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(_this, arg)
    }, wait)
  }
}

function cloneDeep(value) {
  if (value === null) return value
  if (typeof value !== 'object') return value
  let result = Array.isArray(value) ? [] : {}
  for (let i in value) {
    if (value.hasOwnProperty(i)) {
      result[i] = typeof value === 'object' ? cloneDeep(value[i]) : value[i]
    }
  }
  return result
}

const queue = []
let seed = 0
const echarts = require('echarts')

function registerChart(componentInstance) {
  if (!queue.includes(componentInstance)) {
    queue.push(componentInstance)
  }
}

function redraw() {
  // 当浏览器改变大小时, 所有已经绘制的图表都需要重绘
  queue.forEach((comp) => {
    comp.chart.resize()
  })
}

function logoutChart(component) {
  const i = queue.indexOf(component)
  if (i > -1) {
    queue.splice(i, 1)
  }
}

const isServer = typeof window === 'undefined'
if (!isServer) {
  window.addEventListener('resize', debounce(redraw, 300))
}
setInterval(() => {
  queue.forEach((comp) => {
    comp.cacheSize(comp.$el.parentNode)
  })
}, 100)
export default {
  name: 'ZbChart',
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    width: {
      type: String,
      default() {
        return '140px'
      }
    },
    height: {
      type: String,
      default() {
        return '160px'
      }
    }
  },
  data() {
    return {
      id: 'zb-chart-' + seed++,
      chart: null,
      chart_width: 300,
      chart_height: 400
    }
  },
  computed: {
    chartStyle() {
      return {
        width: this.width,
        height: this.height
      }
    },
    container_size() {
      if (this.chart_width) {
        return {
          width: this.chart_width,
          height: this.chart_height
        }
      } else {
        return {}
      }
    }
  },
  watch: {
    options: {
      deep: true,
      handler: 'setOption'
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el)
    if (!isEmpty(this.options)) {
      this.setOption()
    }
    // 注册表单
    registerChart(this)
  },
  beforeDestroy() {
    // 注销表单
    logoutChart(this)
  },
  methods: {
    setOption() {
      this.chart.clear()
      this.chart.setOption(cloneDeep(this.options))
    },
    // 缓存图表当前容器宽高.
    // 当图表容器的宽高变更时重绘图表
    cacheSize(container) {
      if (
        this.chart_width !== container.offsetWidth ||
        this.chart_height !== container.offsetHeight
      ) {
        this.chart_width = container.offsetWidth
        this.chart_height = container.offsetHeight

        this.chart.resize(this.container_size)
      }
    },
    getDataURL(
      opts = {
        type: 'png',
        pixelRatio: window.devicePixelRatio,
        backgroundColor: '#FFFFFF',
        excludeComponents: []
      }
    ) {
      return this.chart.getDataURL(opts)
    },
    listenEvent(event) {
      this.chart.on(event, (ev) => {
        this.$emit('echart-event', ev)
      })
    }
  }
}
</script>
