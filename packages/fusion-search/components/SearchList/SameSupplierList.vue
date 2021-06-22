<template>
  <div
    v-loading="loading"
    class="SupplierList"
  >
    <div>
      <SupplierItem
        v-for="(item, i) in list"
        :key="i"
        :item="item"
      />
    </div>
    <SearchPagination
      :total="total"
      @change-page="changePage"
    />
  </div>
</template>

<script>
import SearchPagination from './SearchPagination'
import SupplierItem from './SupplierItem'
export default {
  name: 'SameSupplierList',
  inject: ['provideData'],
  components: {
    SupplierItem,
    SearchPagination
  },
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
  methods: {
    changePage(value) {}
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';
</style>
