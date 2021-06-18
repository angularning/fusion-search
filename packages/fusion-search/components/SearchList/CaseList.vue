<template>
  <div class="CaseList" v-loading="loading">
    <CaseItem v-for="(item, i) in list" :key="i" :item="item" />
  </div>
</template>

<script>
import CaseItem from './CaseItem'
export default {
  name: 'CaseList',
  inject: ['theme', 'hit'],
  props: {
    list: {
      type: Array,
      default: () => [{ location: 654223 }, { location: 654223 }, { location: 654223 }]
    }
  },
  data() {
    return {
      loading: false,
      theme: this.theme,
      hit: this.hit
    }
  },
  components: {
    CaseItem
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import '../../common/common';
</style>
