<template>
  <div :class="[config.THEME]" class="fusion-search-wrap">
    <!--    搜索框组件-->
    <template v-if="config && config.showInput">
      <FusionInput @search="search"></FusionInput>
    </template>
    <!--    命中详情卡片-->
    <template v-if="config && config.showMix">
      <FusionMix :data="{}" />
    </template>
    <!--    命中列表组件-->
    <template>
      <FusionList />
    </template>
  </div>
</template>

<script>
// 首页搜索框
import FusionInput from '../components/FusionInput'
//
import FusionMix from '../components/FusionMix'
import FusionList from '../components/FusionList'
import defaultMixins from '../minxins/default'

export default {
  name: 'FusionSearch',
  components: {
    FusionMix,
    FusionInput,
    FusionList
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
  mounted() {},
  methods: {
    fusionSearch() {},
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
