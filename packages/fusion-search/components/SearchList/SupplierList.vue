<template>
  <div class="SupplierList" v-loading="loading">
    <div>
      <SupplierItem v-for="(item, i) in list" :key="i" :item="item" />
    </div>
    <SearchPagination :total="total" @change-page="changePage" />
  </div>
</template>

<script>
import SearchPagination from './SearchPagination'
import SupplierItem from './SupplierItem'
export default {
  name: 'SupplierList',
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
      hit: this.hit,
      total: 1000
    }
  },
  components: {
    SupplierItem,
    SearchPagination
  },
  methods: {
    changePage(value) {}
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';
</style>
