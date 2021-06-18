<template>
  <div class="CaseList" v-loading="loading">
    <div>
      <CaseItem v-for="(item, i) in list" :key="i" :item="item" />
    </div>
    <SearchPagination :total="total" @change-page="changePage" />
  </div>
</template>

<script>
import SearchPagination from './SearchPagination'
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
      hit: this.hit,
      total: 1000
    }
  },
  components: {
    CaseItem,
    SearchPagination
  },
  methods: {
    changePage() {}
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';
</style>
