<template>
  <div
    v-loading="loading"
    class="PurchaserList"
  >
    <div v-if="data&&data.result&&data.result.length>0">
      <PurchaserItem
        v-for="(item, i) in data && data.result"
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
import PurchaserItem from './PurchaserItem'
import NoResult from '../NoHit/NoResult'
export default {
  name: 'PurchaserList',
  inject: ['provideData'],
  components: {
    PurchaserItem,
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
    changePage(value) {}
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';
.PurchaserList{
  height: auto;
}
</style>
