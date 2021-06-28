<template>
  <div
    v-loading="loading"
    class="CaseList"
  >
    <div v-if="data&&data.result&&data.result.length>0">
      <CaseItem
        v-for="(item, i) in data.result"
        :key="i"
        :item="item"
      />
    </div>
    <div v-else>
      <NoResult :from="'list'" />
    </div>
  </div>
</template>

<script>
import CaseItem from './CaseItem'
import NoResult from '../NoHit/NoResult'
export default {
  name: 'CaseList',
  inject: ['provideData'],
  components: {
    CaseItem,
    NoResult
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      total: 0
    }
  },
  methods: {
    changePage() {}
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';
</style>
