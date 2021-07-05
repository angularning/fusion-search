<template>
  <div class="SearchPagination">
    <span
      v-show="total > 0"
      class="total"
    >总共<span :class="[provideData.theme + '-color1']">{{ total }}</span>条</span>
    <el-pagination
      class="mt30"
      :class="[provideData.theme+'-planPagination']"
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
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
    },
    type: {
      type: Object,
      default: () => {}
    },
    cpage: {
      type: Boolean,
      default: () => false
    }
  },
  inject: ['provideData'],
  data() {
    return {
      page_size: 15,
      page: 1
    }
  },
  computed: {
  },
  watch: {
    cpage: {
      deep: true,
      handler(value) {
        if (value) {
          this.page = 1
        }
      }
    }
  },
  methods: {
    handleCurrentChange(value) {
      this.page = value
      this.$emit('change-page', { page: value, type: Object.values(this.type).join() })
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
