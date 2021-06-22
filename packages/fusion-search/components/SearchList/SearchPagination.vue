<template>
  <div class="SearchPagination">
    <span
      v-show="total > 0"
      class="total"
    >总共<span :class="[theme + '-color1']">{{ total }}</span>条</span>
    <el-pagination
      class="mt30"
      :class="[theme+'-planPagination']"
      layout="prev, pager, next"
      :total="total"
      :page="page"
      :page-size="page_size"
      background
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchPagination',
  props: {
    total: {
      type: Number,
      default: () => 0
    }
  },
  inject: ['theme', 'hit'],
  data() {
    return {
      page_size: 10,
      page: 1,
      theme: this.theme,
      hit: this.hit
    }
  },
  computed: {},
  methods: {
    handleCurrentChange(value) {
      this.$emit('change-page', value)
      this.page = value
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';

.SearchPagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  .total {
    font-size: 12px;
    font-family: MicrosoftYaqiHei;
  }
}
</style>
