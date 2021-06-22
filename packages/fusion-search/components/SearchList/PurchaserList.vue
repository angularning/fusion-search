<template>
  <div class="SupplierList" v-loading="loading">
    <div>
      <PurchaserItem v-for="(item, i) in list" :key="i" :item="item" />
    </div>
    <SearchPagination :total="total" @change-page="changePage" />
  </div>
</template>

<script>
import SearchPagination from './SearchPagination'
import PurchaserItem from './PurchaserItem'
export default {
  name: 'PurchaserList',
  inject: ['provideData'],
  props: {
    list: {
      type: Array,
      default: () => [{ location: 654223 }, { location: 654223 }, { location: 654223 }]
    }
  },
  data() {
    return {
      loading: false,
      total: 1000
    }
  },
  components: {
    SearchPagination,
    PurchaserItem
  },
  methods: {
    changePage(value) {}
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';
</style>
