<template>
  <div
    :class="[config.THEME]"
    class="fusion-search-wrap"
  >
    13333333
    <!--    搜索框组件-->
    <template v-if="config&&config.showInput">
      <input
        v-model="keyword"
        type="text"
      >
      <button @click="mixSearch(keyword)">
        搜索
      </button>
    </template>
    <!--    命中详情卡片-->
    <template v-if="config&&config.showMix">
      <FusionMix :data="{}" />
    </template>
  </div>
</template>

<script>
import FusionMix from '../components/FusionMix'
import defaultMixins from '../minxins/default'

export default {
  name: 'FusionSearch',
  components: {
    FusionMix
  },
  mixins: [defaultMixins],
  props: {
    config: {
      type: Object,
      default: () => ({
        THEME: 'XUYUAN',
        APIHOST: '',
        LOGIN: true,
        showInput: true,
        showMix: true
      })
    }
  },
  data() {
    return {
      keyword: null
    }
  },
  mounted() {
  },
  methods: {
    fusionSearch() {
    },
    mixSearch(value) {
      this.search(value)
    }
  }
}
</script>
<style scoped>
.fusion-search-wrap {
  width: 100%;
}
</style>
