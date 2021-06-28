<template>
  <div
    v-loading="loading"
    class="SupplierList"
  >
    <div v-if="data&&data.result&&data.result.length>0">
      <SupplierItem
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
import SupplierItem from './SupplierItem'
import NoResult from '../NoHit/NoResult'
export default {
  name: 'SupplierList',
  inject: ['provideData'],
  components: {
    SupplierItem,
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
  watch: {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';
.SupplierList{
  height: auto;
}
</style>
